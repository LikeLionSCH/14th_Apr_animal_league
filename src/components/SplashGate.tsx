"use client";

import { useState, useEffect } from "react";

interface SplashGateProps {
  onUnlock: () => void;
  dept: string;
}

// PDF 아이콘 SVG
function PdfIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#EA4335"/>
      <path d="M14 2V8H20" fill="#c0392b" opacity="0.6"/>
      <text x="12" y="17" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
    </svg>
  );
}

export default function SplashGate({ onUnlock, dept }: SplashGateProps) {
  const fileName = `${dept}_중간고사_족보.pdf`;
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    // 1.2초 후 카드 표시 (로딩 느낌)
    const timer = setTimeout(() => setShowCard(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "#111" }}>
      {/* 상단바 */}
      <div
        className="flex items-center px-3 py-2"
        style={{ backgroundColor: "#111", borderBottom: "1px solid #2a2a2a" }}
      >
        {/* 파일명 + PDF 아이콘 */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <PdfIcon size={22} />
          <span
            className="text-white font-normal truncate"
            style={{ fontSize: "15px", letterSpacing: "0.01em" }}
          >
            {fileName}
          </span>
        </div>

        {/* 우측 아이콘들 */}
        <div className="flex items-center gap-3 ml-2 shrink-0">
          {/* 다운로드 아이콘 */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L7 11H10V4H14V11H17L12 16Z" fill="#e0e0e0"/>
            <path d="M5 18H19V20H5V18Z" fill="#e0e0e0"/>
          </svg>

          {/* 더보기(점 3개) 아이콘 */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="5" r="1.5" fill="#e0e0e0"/>
            <circle cx="12" cy="12" r="1.5" fill="#e0e0e0"/>
            <circle cx="12" cy="19" r="1.5" fill="#e0e0e0"/>
          </svg>

          {/* 로그인 버튼 */}
          <button
            className="px-4 py-1.5 rounded font-medium text-white"
            style={{
              backgroundColor: "#1a73e8",
              fontSize: "13px",
              lineHeight: "1.4",
            }}
          >
            로그인
          </button>
        </div>
      </div>

      {/* 본문 - 미리보기 없음 카드 */}
      <div className="flex-1 flex items-center justify-center px-6">
        {!showCard ? (
          // 로딩 스피너
          <div className="flex items-center gap-2" style={{ color: "#888" }}>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <span style={{ fontSize: "14px" }}>로딩 중...</span>
          </div>
        ) : (
          // 미리보기 없음 카드
          <div
            className="rounded-2xl px-8 py-8 flex flex-col items-center gap-5"
            style={{
              backgroundColor: "#2a2a2a",
              width: "100%",
              maxWidth: "340px",
            }}
          >
            {/* PDF 아이콘 (크게) */}
            <div className="flex items-center justify-center" style={{ width: 56, height: 56 }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#EA4335"/>
                <path d="M14 2V8H20" fill="#c0392b" opacity="0.6"/>
                <text x="12" y="17" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
              </svg>
            </div>

            <div className="text-center">
              <p className="text-white" style={{ fontSize: "16px", fontWeight: 400 }}>
                미리보기가 없음
              </p>
              <p style={{ color: "#aaa", fontSize: "12px", marginTop: "6px", wordBreak: "keep-all", lineHeight: "1.5" }}>
                {fileName}
              </p>
            </div>

            {/* 다운로드 버튼 */}
            <button
              onClick={onUnlock}
              className="flex items-center justify-center gap-2 rounded px-6 py-3 font-medium text-white transition-opacity active:opacity-80"
              style={{
                backgroundColor: "#1a73e8",
                fontSize: "14px",
                width: "100%",
                maxWidth: "200px",
              }}
            >
              {/* 다운로드 아이콘 */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L7 11H10V4H14V11H17L12 16Z" fill="white"/>
                <path d="M5 18H19V20H5V18Z" fill="white"/>
              </svg>
              다운로드
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
