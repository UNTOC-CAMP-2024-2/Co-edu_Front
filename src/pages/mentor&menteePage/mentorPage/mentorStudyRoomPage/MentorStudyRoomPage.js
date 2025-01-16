import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../../AppProvider";

const MentorStudyRoomPage = () => {
  const { classCode } = useContext(Context);
  const roomId = classCode;
  const signalingServerRef = useRef(null);
  const peerConnectionsRef = useRef({});
  const [studentStreams, setStudentStreams] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // 선택된 비디오의 userId

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
      const { userId, offer, candidate, screenSharingEnded } = data;

      if (screenSharingEnded) {
        console.log(`[INFO] Screen sharing ended for user ${userId}`);
        setStudentStreams((prevStreams) =>
          prevStreams.filter((stream) => stream.userId !== userId)
        );
        if (selectedUserId === userId) {
          setSelectedUserId(null);
        }
        // PeerConnection 정리
        if (peerConnectionsRef.current[userId]) {
          peerConnectionsRef.current[userId].close();
          delete peerConnectionsRef.current[userId];
        }
        return;
      }

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

      // track ended 이벤트 리스너 추가
      event.track.onended = () => {
        console.log(`[INFO] Track from user ${userId} ended.`);
        setStudentStreams((prevStreams) =>
          prevStreams.filter((stream) => stream.userId !== userId)
        );
        if (selectedUserId === userId) {
          setSelectedUserId(null);
        }
      };

      setStudentStreams((prevStreams) => {
        const updatedStreams = prevStreams.filter(
          (stream) => stream.userId !== userId
        );
        return [...updatedStreams, { userId, stream: remoteStream }];
      });
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      console.log(`[INFO] Connection state with user ${userId}: ${state}`);

      if (
        state === "disconnected" ||
        state === "failed" ||
        state === "closed"
      ) {
        console.log(
          `[INFO] Removing stream for user ${userId} due to ${state} connection`
        );
        setStudentStreams((prevStreams) =>
          prevStreams.filter((s) => s.userId !== userId)
        );
        if (selectedUserId === userId) {
          setSelectedUserId(null);
        }

        // PeerConnection 정리
        if (peerConnectionsRef.current[userId]) {
          peerConnectionsRef.current[userId].close();
          delete peerConnectionsRef.current[userId];
        }
      }
    };

    return pc;
  };

  // 선택된 스트림 찾기
  const selectedStream = studentStreams.find(
    (stream) => stream.userId === selectedUserId
  );

  const handleVideoClick = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  return (
    <div className="bg-black min-h-screen py-10 px-10">
      {/* 선택된 비디오가 있을 경우 상단에 크게 표시 */}
      {selectedStream && (
        <div className="mb-8 relative">
          <div className="w-full h-[40rem] relative">
            <div className="absolute top-2 right-3 text-darkMint font-semibold px-6 py-1 rounded-lg border-2 border-darkMint bg-black bg-opacity-50 z-10">
              {selectedStream.userId}
            </div>
            <video
              className="h-full w-full object-contain bg-gray-900"
              autoPlay
              playsInline
              ref={(video) => {
                if (video && video.srcObject !== selectedStream.stream) {
                  video.srcObject = selectedStream.stream;
                }
              }}
            ></video>
          </div>
        </div>
      )}

      {/* 하단의 비디오 그리드 */}
      <div className="flex flex-wrap gap-y-2 gap-x-3">
        {studentStreams.map(({ userId, stream }) => (
          <div
            key={userId}
            className={`w-[32%] h-[20rem] relative cursor-pointer transition-transform hover:scale-105 ${
              selectedUserId === userId ? "ring-4 ring-darkMint" : ""
            }`}
            onClick={() => handleVideoClick(userId)}
          >
            <div className="absolute top-2 right-3 text-darkMint font-semibold px-6 py-1 rounded-lg border-2 border-darkMint bg-black bg-opacity-50 z-10">
              {userId}
            </div>
            <video
              className="h-full w-full object-cover bg-gray-900"
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
