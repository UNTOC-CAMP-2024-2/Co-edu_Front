import React, { useEffect, useRef } from "react";

const MentorStudyRoomPage = () => {
  const roomId = 1111;
  const remoteVideoRef = useRef(null);
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
      `ws://211.213.193.67:7777/live_classroom/${roomId}/host/ws`
    );
    signalingServerRef.current = signalingServer;
    const pc = new RTCPeerConnection(config);
    peerConnectionRef.current = pc;

    signalingServer.onopen = () => {
      console.log("[INFO] Host WebSocket connection opened.");
    };

    signalingServer.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.offer) {
        console.log("[INFO] Host received WebRTC offer.");
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        signalingServer.send(JSON.stringify({ answer }));
      } else if (data.candidate) {
        console.log("[INFO] Host received ICE candidate.");
        try {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (err) {
          console.error("[ERROR] Host failed to add ICE candidate:", err);
        }
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        signalingServer.send(JSON.stringify({ candidate: event.candidate }));
      }
    };

    pc.ontrack = (event) => {
      const remoteStream = event.streams[0];
      if (
        remoteVideoRef.current &&
        remoteVideoRef.current.srcObject !== remoteStream
      ) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    };

    return () => {
      pc.close();
      signalingServer.close();
    };
  }, [roomId]);

  return (
    <div>
      <h2>Remote Video (Student's Stream)</h2>
      <video ref={remoteVideoRef} autoPlay playsInline></video>
    </div>
  );
};

export default MentorStudyRoomPage;
