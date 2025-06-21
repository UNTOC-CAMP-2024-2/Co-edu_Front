import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../../AppProvider";
import Editor from "@monaco-editor/react";
import { runCodeAPI } from "../../../../api/mentee";

const codeTemplates = {
  python: 'print("hello world")',
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "hello world" << endl;
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}`,
};

const MenteeStudyRoomPage = () => {
  const { username, classCode, token } = useContext(Context);
  const userId = username;
  const roomId = classCode;

  const signalingServerRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(codeTemplates["python"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [testInput, setTestInput] = useState("");
  const [output, setOutput] = useState("");

  const config = {
    iceServers: [
      {
        urls: process.env.REACT_APP_TURN_URL, 
        username: process.env.REACT_APP_TURN_USERNAME, 
        credential: process.env.REACT_APP_TURN_CREDENTIAL, 
      },
    ],
  };

  useEffect(() => {
    const wsBase = process.env.REACT_APP_SIGNALING_WS_BASE; 
    const signalingServer = new WebSocket(
      `${wsBase}/live_classroom/${roomId}/student/ws?user_id=${userId}`
    );
    signalingServerRef.current = signalingServer;
    const pc = new RTCPeerConnection(config);
    peerConnectionRef.current = pc;

    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

        stream.getTracks().forEach((track) => {
          track.onended = () => {
            pc.getSenders().forEach((sender) => pc.removeTrack(sender));
            pc.close();

            const newPc = new RTCPeerConnection(config);
            peerConnectionRef.current = newPc;

            newPc.onicecandidate = (event) => {
              if (event.candidate) {
                signalingServerRef.current.send(
                  JSON.stringify({ candidate: event.candidate })
                );
              }
            };

            signalingServerRef.current.send(
              JSON.stringify({ screenSharingEnded: true })
            );
          };
        });

        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        signalingServer.send(JSON.stringify({ offer }));
      } catch (error) {
        console.error("[ERROR] Failed to get display media:", error);
      }
    };

    signalingServer.onopen = () => {
      startLocalStream();
    };

    signalingServer.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      const { answer, candidate } = data;

      if (answer) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      } else if (candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
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

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(codeTemplates[selectedLang]);
  };

  const runCode = async () => {
    setOutput("실행 중...");
    try {
      const data = await runCodeAPI({
        token,
        code,
        language,
        input: testInput,
      });
      if (data.status === "success") {
        const [result, execTime] = data.details;
        setOutput(`출력: ${result}\n실행 시간: ${execTime}s`);
      } else {
        setOutput(`❌ 오류: ${data.details}`);
      }
    } catch (err) {
      setOutput("❌ 실행 실패. 서버 응답 없음.");
    }
  };

  return (
    <div className="relative h-screen w-screen bg-white text-black overflow-hidden flex flex-col">
      {/* 상단 바 */}
      <div className="p-4 bg-gray-100 border-b border-gray-300 flex items-center justify-between z-10">
        <div>
          <label htmlFor="language-select" className="mr-2">
            언어 선택:
          </label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className="bg-white text-black p-2 rounded border border-gray-400 focus:ring-2 focus:ring-blue-400"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white shadow"
        >
          🧪 테스트하기
        </button>
      </div>

      {/* 코드 에디터 (어두운 테마 유지) */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark" // 코드 에디터는 어두운 테마 유지
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            fontFamily: "Monaco, Consolas, monospace",
          }}
        />
      </div>

      {/* 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative text-black">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-4 text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">테스트 케이스 입력</h2>
            <textarea
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              rows={6}
              className="w-full p-3 mb-4 bg-gray-100 text-black placeholder-gray-500 rounded resize-none border border-gray-400 focus:ring-2 focus:ring-blue-400"
              placeholder="입력값을 여기에 작성하세요"
            />
            <button
              onClick={runCode}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
            >
              ▶️ 실행
            </button>

            {output && (
              <div className="mt-4">
                <h3 className="font-semibold mb-1">출력 결과:</h3>
                <pre className="bg-gray-100 text-black p-3 rounded text-sm max-h-64 overflow-auto whitespace-pre-wrap border border-gray-300">
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenteeStudyRoomPage;
