import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../../AppProvider";

const MentorStudyRoomPage = () => {
  const { classCode } = useContext(Context);
  const roomId = classCode;
  const signalingServerRef = useRef(null);
  const peerConnectionsRef = useRef({}); // Stores peer connections by user ID
  const [studentStreams, setStudentStreams] = useState([]); // Tracks student streams

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
      `wss://coedu.site:7777/live_classroom/${roomId}/host/ws`
    );
    signalingServerRef.current = signalingServer;

    signalingServer.onopen = () => {
      console.log("[INFO] Host WebSocket connection opened.");
    };

    signalingServer.onmessage = async (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      const { userId, offer, candidate } = data;
      console.log(userId);
      console.log(offer);
      console.log(candidate);

      if (offer) {
        console.log(`[INFO] Host received WebRTC offer from user ${userId}.`);
        const pc = createPeerConnection(userId);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        signalingServer.send(JSON.stringify({ userId, answer }));
      } else if (candidate) {
        console.log(`[INFO] Host received ICE candidate from user ${userId}.`);
        const pc = peerConnectionsRef.current[userId];
        if (pc) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (err) {
            console.error(
              `[ERROR] Host failed to add ICE candidate for user ${userId}:`,
              err
            );
          }
        }
      }
    };

    return () => {
      Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
      signalingServer.close();
    };
  }, [roomId]);

  const createPeerConnection = (userId) => {
    const pc = new RTCPeerConnection(config);
    peerConnectionsRef.current[userId] = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        signalingServerRef.current.send(
          JSON.stringify({ userId, candidate: event.candidate })
        );
      }
    };

    pc.ontrack = (event) => {
      console.log(`[INFO] Host received track from user ${userId}.`);
      const remoteStream = event.streams[0];
      setStudentStreams((prevStreams) => {
        const updatedStreams = prevStreams.filter(
          (stream) => stream.userId !== userId
        );
        return [...updatedStreams, { userId, stream: remoteStream }];
      });
    };

    pc.onconnectionstatechange = () => {
      console.log(
        `[INFO] Connection state with user ${userId}: ${pc.connectionState}`
      );
      if (
        pc.connectionState === "disconnected" ||
        pc.connectionState === "failed"
      ) {
        setStudentStreams((prevStreams) =>
          prevStreams.filter((s) => s.userId !== userId)
        );
      }
    };

    return pc;
  };

  return (
    <div className="bg-black min-h-screen py-10">
      <div className="flex flex-wrap justify-center gap-y-2 gap-x-3">
        {studentStreams.map(({ userId, stream }) => (
          <div
            key={userId}
            className="w-[48%] h-[20rem] border border-white relative"
          >
            <div className="absolute top-2 right-3 text-darkMint font-semibold px-6 py-1 rounded-lg border-2 border-darkMint">
              {userId}
            </div>
            <video
              autoPlay
              playsInline
              ref={(video) => {
                if (video && video.srcObject !== stream) {
                  video.srcObject = stream;
                }
              }}
            ></video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorStudyRoomPage;
