import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../../AppProvider";
import Highlight from "react-highlight";

const MenteeStudyRoomPage = () => {
  const { username, classCode } = useContext(Context);
  const userId = username;
  const roomId = classCode;
  // const localVideoRef = useRef(null);
  const signalingServerRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const config = {
    iceServers: [
      {
        urls: "turn:211.213.193.67:3478",
        username: "coedu",
        credential: "pwd394",
      },
    ],
  };

  useEffect(() => {
    const signalingServer = new WebSocket(
      `ws://211.213.193.67:7777/live_classroom/${roomId}/student/ws?user_id=${userId}`
    );
    signalingServerRef.current = signalingServer;
    const pc = new RTCPeerConnection(config);
    peerConnectionRef.current = pc;

    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        // if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        signalingServer.send(JSON.stringify({ offer }));
      } catch (error) {
        console.error("[ERROR] Student failed to get display media:", error);
      }
    };

    signalingServer.onopen = () => {
      console.log("[INFO] Student WebSocket connection opened.");
      startLocalStream();
    };

    signalingServer.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      const { answer, candidate } = data;

      if (answer) {
        console.log("[INFO] Student received WebRTC answer.");
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (err) {
          console.error("[ERROR] Failed to set remote description:", err);
        }
      } else if (candidate) {
        console.log("[INFO] Student received ICE candidate.");
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("[ERROR] Failed to add ICE candidate:", err);
        }
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        signalingServer.send(JSON.stringify({ candidate: event.candidate }));
      }
    };

    return () => {
      pc.close();
      signalingServer.close();
    };
  }, [roomId, userId]);

  const [code, setCode] = useState('print("hello world")');
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  const handleScroll = (e) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      // highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 h-full flex relative items-center justify-center overflow-y-auto">
        <textarea
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              event.preventDefault();
              setCode(code + "\t");
            }
          }}
          value={code}
          onScroll={handleScroll}
          ref={textareaRef}
          className="h-full w-full absolute inset-0 p-4 text-transparent font-mono resize-none bg-transparent z-10 focus:outline-none selection:bg-blue-500/50 leading-[1.5] text-[1rem]"
          style={{
            caretColor: "white",
            fontFamily: "Monaco, Consolas, monospace", // 동일한 폰트 패밀리 사용
          }}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />
        <div
          ref={highlightRef}
          className="bg-[#2B2B2B] absolute w-full h-full inset-0 overflow-auto pointer-events-none"
        >
          <Highlight
            className="h-full python text-[1rem] leading-[1.5] p-4"
            style={{
              fontFamily: "Monaco, Consolas, monospace",
              whiteSpace: "pre",
            }}
          >
            {code}
          </Highlight>
        </div>
      </div>
    </div>
  );
};

export default MenteeStudyRoomPage;
