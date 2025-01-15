import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../../../../AppProvider";

const MenteeStudyRoomPage = () => {
  const { token } = useContext(Context);
  const userId = token;
  const roomId = 1111;
  const localVideoRef = useRef(null);
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
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

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

  return (
    <div>
      <h2>Local Video (Your Preview)</h2>
      <video ref={localVideoRef} autoPlay muted playsInline></video>
    </div>
  );
};

export default MenteeStudyRoomPage;
