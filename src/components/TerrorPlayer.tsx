"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LyricsRain from "./LyricsRain";
import DanceVideos from "./DanceVideos";
import ButtonField from "./ButtonField";
import ShareModal from "./ShareModal";
import DancingFigures from "./DancingFigures";
import {
  INITIAL_DANCE_VIDEOS,
  VIDEOS_PER_CLICK,
  MAX_DANCE_VIDEOS,
} from "@/lib/constants";

interface AudioEngine {
  increaseVolume: () => void;
  stop: () => void;
  volumePercent: number;
}

interface TerrorPlayerProps {
  sessionId: string;
  baseUrl: string;
  audioEngine: AudioEngine;
}

export default function TerrorPlayer({
  sessionId,
  baseUrl,
  audioEngine,
}: TerrorPlayerProps) {
  const router = useRouter();
  const { increaseVolume, stop, volumePercent } = audioEngine;
  const [intensity, setIntensity] = useState(0);
  const [videoCount, setVideoCount] = useState(INITIAL_DANCE_VIDEOS);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 뒤로가기 방지
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleFakeClick = useCallback(() => {
    increaseVolume();
    setIntensity((prev) => prev + 1);
    setVideoCount((prev) =>
      Math.min(prev + VIDEOS_PER_CLICK, MAX_DANCE_VIDEOS)
    );
    setClickCount((prev) => prev + 1);

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);

    // 서버에 통계 업데이트 (비동기, 실패해도 OK)
    fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        clickCount: clickCount + 1,
        volumePercent,
      }),
    }).catch(() => {});
  }, [increaseVolume, sessionId, clickCount, volumePercent]);

  const handleEscapeClick = useCallback(() => {
    setShowShareModal(true);
  }, []);

  const handleFreed = useCallback(() => {
    stop();
    router.push(
      `/survived?clicks=${clickCount}&volume=${volumePercent}`
    );
  }, [router, clickCount, volumePercent, stop]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden animate-neon-bg
                  ${isShaking ? "animate-shake" : ""}
                  ${isFlashing ? "animate-flash" : ""}`}
    >
      {/* 상단 볼륨 & 클릭 카운터 */}
      <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-center">
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-bold">
          🔊 {volumePercent}%
        </div>
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-bold">
          💀 {clickCount}회 시도
        </div>
      </div>

      {/* 메시지 */}
      <div className="absolute top-16 left-0 right-0 z-40 text-center">
        <p className="text-white font-black text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
          시험 테러다!! 🔥
        </p>
      </div>

      {/* 배경 댄서 실루엣 */}
      <DancingFigures />

      {/* 가사 폭탄 */}
      <LyricsRain intensity={intensity} active={true} />

      {/* 안무 영상/이모지 */}
      <DanceVideos count={videoCount} active={true} />

      {/* 가짜 닫기 버튼들 */}
      <ButtonField active={true} onFakeClick={handleFakeClick} />

      {/* 진짜 탈출 버튼 - 우하단 구석에 숨김 */}
      <div className="absolute bottom-3 right-3 z-40">
        <button
          onClick={handleEscapeClick}
          className="px-3 py-1.5 bg-black/30 text-white/40 rounded text-xs
                     hover:text-white/70 hover:bg-black/50 transition-colors"
        >
          공유하면 멈춰줄게
        </button>
      </div>

      {/* 공유 모달 */}
      {showShareModal && (
        <ShareModal
          sessionId={sessionId}
          baseUrl={baseUrl}
          onFreed={handleFreed}
        />
      )}
    </div>
  );
}
