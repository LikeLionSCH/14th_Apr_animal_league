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
  ANGER_SCORE_PER_CLICK,
  ANGER_TAUNT_THRESHOLD_MIN,
  ANGER_TAUNT_THRESHOLD_MAX,
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
  const [angerScore, setAngerScore] = useState(0);
  const [showTauntModal, setShowTauntModal] = useState(false);
  const [hasShownTaunt, setHasShownTaunt] = useState(false);
  const [angerTauntThreshold] = useState(() => {
    const min = ANGER_TAUNT_THRESHOLD_MIN;
    const max = ANGER_TAUNT_THRESHOLD_MAX;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });
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
    const nextClickCount = clickCount + 1;
    const nextAngerScore = angerScore + ANGER_SCORE_PER_CLICK;

    increaseVolume();
    setIntensity((prev) => prev + 1);
    setVideoCount((prev) =>
      Math.min(prev + VIDEOS_PER_CLICK, MAX_DANCE_VIDEOS)
    );
    setClickCount(nextClickCount);
    setAngerScore(nextAngerScore);

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
        clickCount: nextClickCount,
        volumePercent,
        angerScore: nextAngerScore,
      }),
    }).catch(() => {});

    if (!hasShownTaunt && nextAngerScore >= angerTauntThreshold) {
      setHasShownTaunt(true);
      setShowTauntModal(true);
    }
  }, [
    angerTauntThreshold,
    angerScore,
    clickCount,
    hasShownTaunt,
    increaseVolume,
    sessionId,
    volumePercent,
  ]);

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
        <div className="min-w-[150px] bg-black/60 backdrop-blur-sm rounded-full px-3 py-2 text-white text-xs font-bold">
          <div className="mb-1 flex items-center justify-between">
            <span>😡 분노 게이지</span>
            <span>{angerScore.toLocaleString()}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-green-400 transition-all duration-200"
              style={{
                width: `${Math.min(
                  100,
                  (angerScore / angerTauntThreshold) * 100
                )}%`,
              }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-bold">
            🔊 {volumePercent}%
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-bold">
            💀 {clickCount}회 시도
          </div>
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

      {showTauntModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
          <div className="w-full max-w-sm rounded-2xl border border-pink-400/40 bg-black/90 p-6 text-center shadow-[0_0_24px_rgba(255,0,110,0.35)]">
            <p className="mb-2 text-sm font-bold text-pink-300">축하합니다</p>
            <h2 className="mb-3 text-2xl font-black text-white">끝까지 눌렀네? ㅋㅋ</h2>
            <p className="mb-2 text-sm text-gray-200">
              클릭 횟수 <span className="font-black text-pink-300">{clickCount}회</span>
            </p>
            <p className="mb-6 text-sm text-gray-300">
              분노 게이지도 <span className="font-black text-pink-300">{angerScore.toLocaleString()}</span>까지 채웠다.
            </p>
            <p className="mb-6 text-xs text-gray-500">
              이번 판 목표치: {angerTauntThreshold.toLocaleString()}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowTauntModal(false);
                  setShowShareModal(true);
                }}
                className="w-full rounded-xl bg-pink-500 px-4 py-3 font-bold text-white hover:bg-pink-400 active:bg-pink-600 transition-colors"
              >
                나만 당할 수 없지? 친구도 놀려보자
              </button>
              <button
                onClick={() => setShowTauntModal(false)}
                className="w-full rounded-xl bg-gray-800 px-4 py-3 font-bold text-gray-100 hover:bg-gray-700 transition-colors"
              >
                계속 눌러보기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
