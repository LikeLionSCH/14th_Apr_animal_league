"use client";

interface DeptSelectProps {
  onSelect: (dept: string) => void;
}

const DEPARTMENTS = [
  "의예과",
  "간호학과",
  "화학과",
  "식품영양학과",
  "환경보건학과",
  "생명과학과",
  "유아교육과",
  "특수교육과",
  "청소년교육·상담학과",
  "법학과",
  "행정학과",
  "경찰행정학과",
  "사회복지학과",
  "경영학과",
  "국제통상학과",
  "관광경영학과",
  "경제금융학과",
  "IT금융경영학과",
  "글로벌문화산업학과",
  "회계학과",
  "컴퓨터공학과",
  "정보통신공학과",
  "전자공학과",
  "전기공학과",
  "전자정보공학과",
  "나노화학공학과",
  "에너지환경공학과",
  "디스플레이신소재공학과",
  "기계공학과",
  "컴퓨터소프트웨어공학과",
  "정보보호학과",
  "의료IT공학과",
  "AI·빅데이터학과",
  "사물인터넷학과",
  "메타버스&게임학과",
  "보건행정경영학과",
  "의료생명공학과",
  "임상병리학과",
  "작업치료학과",
  "의약공학과",
  "의공학과",
  "한국문화콘텐츠학과",
  "영미학과",
  "중국학과",
  "미디어커뮤니케이션학과",
  "건축학과(5년제)",
  "스마트자동차학과",
  "에너지공학과",
  "탄소중립학과",
  "의생명융합학부(헬스케어융합전공)",
  "의생명융합학부(바이오의약전공)",
];

const AVATAR_COLORS = [
  "#1a73e8", "#34a853", "#ea4335", "#fbbc04",
  "#9c27b0", "#00bcd4", "#ff5722", "#607d8b",
];

const FAKE_IDS = [
  "20241032", "20233847", "20220594", "20251128",
  "20242076", "20230341", "20221853", "20250967",
  "20243512", "20231274", "20220789", "20251445",
];

const DATES = [
  "2026. 4. 1.", "2026. 4. 2.", "2026. 4. 3.", "2026. 4. 4.",
  "2026. 4. 5.", "2026. 4. 6.", "2026. 4. 7.", "2026. 4. 8.",
  "2026. 4. 9.", "2026. 4. 10.", "2026. 4. 11.", "2026. 4. 12.",
  "2026. 4. 13.", "2026. 4. 14.",
];

const SIZES = [
  "1.2MB", "3.4MB", "2.8MB", "5.1MB", "1.9MB", "4.3MB",
  "2.1MB", "6.7MB", "3.0MB", "1.5MB", "8.2MB", "2.6MB",
  "4.9MB", "1.1MB",
];

function PdfRowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#EA4335"/>
      <path d="M14 2V8H20" fill="#c0392b" opacity="0.6"/>
      <text x="12" y="17" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
    </svg>
  );
}

function DriveLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-20.4 35.3c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
      <path d="m73.4 26.5-10.1-17.5c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 23.8h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
    </svg>
  );
}

export default function DeptSelect({ onSelect }: DeptSelectProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "#1f1f1f", fontFamily: "var(--font-noto-sans-kr, sans-serif)" }}
    >
      {/* 상단바 */}
      <div
        className="flex items-center gap-2 px-3 shrink-0"
        style={{
          backgroundColor: "#1f1f1f",
          height: "52px",
          borderBottom: "1px solid #2a2a2a",
        }}
      >
        {/* 드라이브 로고 + 이름 */}
        <div className="flex items-center gap-1.5 shrink-0">
          <DriveLogo />
          <span style={{ color: "#e8eaed", fontSize: "16px", fontWeight: 400 }}>드라이브</span>
        </div>

        {/* 검색창 */}
        <div
          className="flex items-center gap-2 flex-1 mx-2 px-3"
          style={{
            backgroundColor: "#2d2e30",
            borderRadius: "24px",
            height: "36px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" stroke="#9aa0a6" strokeWidth="2"/>
            <path d="M16.5 16.5L21 21" stroke="#9aa0a6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ color: "#9aa0a6", fontSize: "13px" }}>드라이브에서 검색</span>
        </div>

        {/* 우측 아이콘들 */}
        <div className="flex items-center gap-3 shrink-0">
          {/* 로그인 버튼 */}
          <button
            className="px-4 py-1.5 rounded font-medium text-white"
            style={{ backgroundColor: "#1a73e8", fontSize: "13px" }}
          >
            로그인
          </button>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측 사이드바 (좁게) */}
        <div
          className="shrink-0 overflow-y-auto py-2"
          style={{ width: "52px", borderRight: "1px solid #2a2a2a" }}
        >
          {[
            { label: "홈", icon: <path d="M3 12L12 4l9 8v8a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1v-8z" stroke="#9aa0a6" strokeWidth="1.6" fill="none"/> },
            { label: "내 드라이브", icon: <><path d="M3 6h18v13H3z" stroke="#9aa0a6" strokeWidth="1.6" fill="none" rx="1"/><path d="M7 6V4h10v2" stroke="#9aa0a6" strokeWidth="1.6"/></> },
            { label: "공유 문서함", icon: <><circle cx="9" cy="8" r="3" stroke="#1a73e8" strokeWidth="1.6" fill="none"/><circle cx="17" cy="8" r="2.5" stroke="#1a73e8" strokeWidth="1.6" fill="none"/><path d="M3 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6" stroke="#1a73e8" strokeWidth="1.6" fill="none"/></> },
            { label: "최근 문서함", icon: <><circle cx="12" cy="12" r="8" stroke="#9aa0a6" strokeWidth="1.6" fill="none"/><path d="M12 7v5l3 3" stroke="#9aa0a6" strokeWidth="1.6" strokeLinecap="round"/></> },
          ].map(({ label, icon }) => (
            <div key={label} className="flex flex-col items-center py-2 gap-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24">{icon}</svg>
              <span style={{ color: "#9aa0a6", fontSize: "8px" }}>{label.split(" ")[0]}</span>
            </div>
          ))}
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 overflow-y-auto">
          {/* 경로 + 폴더명 */}
          <div className="px-4 pt-4 pb-2">
            {/* 브레드크럼 */}
            <div className="flex items-center gap-1 mb-1">
              <span style={{ color: "#9aa0a6", fontSize: "11px" }}>공유 문서함</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#9aa0a6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ color: "#e8eaed", fontSize: "11px", fontWeight: 500 }}>2026 중간고사 족보 모음</span>
            </div>

            {/* 폴더 제목 + 아이콘 */}
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" fill="#8ab4f8"/>
              </svg>
              <span style={{ color: "#e8eaed", fontSize: "16px", fontWeight: 500 }}>2026 중간고사 족보 모음</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#fbbc04"/>
              </svg>
            </div>
          </div>

          {/* 툴바 */}
          <div
            className="flex items-center gap-3 px-4 py-2"
            style={{ borderBottom: "1px solid #2a2a2a" }}
          >
            {["유형 ▾", "사람 ▾", "수정 날짜 ▾"].map((label) => (
              <div
                key={label}
                className="flex items-center gap-1 px-3 py-1 rounded-full"
                style={{ border: "1px solid #3c3c3c", fontSize: "12px", color: "#9aa0a6" }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* 컬럼 헤더 */}
          <div
            className="flex items-center px-4 py-2"
            style={{ borderBottom: "1px solid #2a2a2a" }}
          >
            <div style={{ flex: 1, fontSize: "11px", color: "#9aa0a6" }}>이름</div>
            <div style={{ width: "90px", fontSize: "11px", color: "#9aa0a6", textAlign: "right" }}>수정 날짜</div>
            <div style={{ width: "52px", fontSize: "11px", color: "#9aa0a6", textAlign: "right" }}>크기</div>
          </div>

          {/* 파일 목록 */}
          <div>
            {DEPARTMENTS.map((dept, i) => {
              const fileName = `${dept}_중간고사_족보.pdf`;
              const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
              const uploaderInitial = FAKE_IDS[i % FAKE_IDS.length];
              const date = DATES[i % DATES.length];
              const size = SIZES[i % SIZES.length];

              return (
                <button
                  key={dept}
                  onClick={() => onSelect(dept)}
                  className="w-full flex items-center px-4 py-2.5 text-left transition-colors"
                  style={{
                    borderBottom: "1px solid #2a2a2a",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2d2e30")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {/* PDF 아이콘 */}
                  <div className="mr-3 shrink-0">
                    <PdfRowIcon />
                  </div>

                  {/* 파일명 + 업로더 */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="truncate"
                      style={{ color: "#e8eaed", fontSize: "13px", lineHeight: "1.4" }}
                    >
                      {fileName}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div
                        className="flex items-center justify-center rounded-full"
                        style={{
                          width: 14, height: 14,
                          backgroundColor: avatarColor,
                          fontSize: "7px", color: "white", fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {dept[0]}
                      </div>
                      <span style={{ color: "#9aa0a6", fontSize: "10px" }}>{uploaderInitial}</span>
                    </div>
                  </div>

                  {/* 날짜 */}
                  <div style={{ width: "90px", textAlign: "right", flexShrink: 0 }}>
                    <span style={{ color: "#9aa0a6", fontSize: "11px" }}>{date}</span>
                  </div>

                  {/* 크기 */}
                  <div style={{ width: "52px", textAlign: "right", flexShrink: 0 }}>
                    <span style={{ color: "#9aa0a6", fontSize: "11px" }}>{size}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
