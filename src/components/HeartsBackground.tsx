"use client";

// Predefined positions and sizes for hearts (deterministic to avoid hydration mismatch)
const HEARTS = [
  { size: 16, left: "5%", top: "8%" },
  { size: 24, left: "18%", top: "3%" },
  { size: 12, left: "28%", top: "12%" },
  { size: 32, left: "42%", top: "5%" },
  { size: 20, left: "55%", top: "15%" },
  { size: 14, left: "68%", top: "7%" },
  { size: 28, left: "82%", top: "10%" },
  { size: 18, left: "92%", top: "4%" },
  { size: 22, left: "3%", top: "22%" },
  { size: 12, left: "15%", top: "28%" },
  { size: 30, left: "35%", top: "25%" },
  { size: 16, left: "58%", top: "22%" },
  { size: 24, left: "75%", top: "18%" },
  { size: 14, left: "88%", top: "25%" },
  { size: 20, left: "8%", top: "42%" },
  { size: 26, left: "25%", top: "38%" },
  { size: 12, left: "48%", top: "35%" },
  { size: 18, left: "62%", top: "40%" },
  { size: 22, left: "85%", top: "38%" },
  { size: 16, left: "12%", top: "55%" },
  { size: 28, left: "38%", top: "52%" },
  { size: 14, left: "72%", top: "58%" },
  { size: 20, left: "95%", top: "50%" },
  { size: 24, left: "5%", top: "68%" },
  { size: 12, left: "22%", top: "72%" },
  { size: 18, left: "52%", top: "68%" },
  { size: 30, left: "78%", top: "65%" },
  { size: 16, left: "88%", top: "75%" },
  { size: 22, left: "8%", top: "88%" },
  { size: 14, left: "35%", top: "85%" },
  { size: 26, left: "58%", top: "90%" },
  { size: 20, left: "75%", top: "88%" },
  { size: 12, left: "92%", top: "82%" },
  { size: 18, left: "45%", top: "78%" },
  { size: 24, left: "65%", top: "28%" },
  { size: 10, left: "95%", top: "62%" },
  { size: 22, left: "2%", top: "32%" },
  { size: 14, left: "40%", top: "12%" },
  { size: 28, left: "12%", top: "60%" },
  { size: 16, left: "70%", top: "48%" },
  { size: 14, left: "50%", top: "8%" },
  { size: 20, left: "30%", top: "55%" },
  { size: 10, left: "60%", top: "82%" },
  { size: 26, left: "18%", top: "92%" },
  { size: 16, left: "90%", top: "35%" },
  { size: 22, left: "45%", top: "62%" },
  { size: 12, left: "8%", top: "48%" },
  { size: 18, left: "55%", top: "95%" },
  { size: 24, left: "5%", top: "18%" },
  { size: 24, left: "35%", top: "66%" },
  { size: 24, left: "71%", top: "40%" },
  { size: 24, left: "80%", top: "55%" },
  { size: 14, left: "78%", top: "92%" },
  { size: 20, left: "32%", top: "65%" },
  { size: 16, left: "65%", top: "12%" },
  { size: 10, left: "42%", top: "48%" },
  { size: 28, left: "92%", top: "55%" },
  { size: 12, left: "15%", top: "45%" },
  { size: 22, left: "58%", top: "45%" },
  { size: 18, left: "80%", top: "30%" },
  { size: 18, left: "28%", top: "54%" },
  { size: 14, left: "25%", top: "15%" },
];

const ROTATIONS = [-35, 22, -12, 28, -8, 15, -40, 5, -18, 32, -25, 10, -30, 18, -5, 35, -22, 8, -15, 25, -28, 12, -8, 20, -32, 5, -18, 28, -22, 15, -10, 35, -25, 8, -30, 22, -12, 18, -5, 28, -35, 10, -20, 25, -15, 32, -8, 18, -28, 22, -12, 35, -5, 25, -18, 10, -30, 15, -22, 8];

const HEARTS_OUTSIDE_CONTENT = HEARTS.map((heart, i) => ({ heart, origIndex: i })).filter(
  ({ heart }) => {
    const leftPct = parseInt(heart.left, 10);
    const topPct = parseInt(heart.top, 10);
    const inCenterX = leftPct >= 30 && leftPct <= 70;
    const inCenterY = topPct >= 35 && topPct <= 65;
    return !(inCenterX && inCenterY);
  }
);

interface HeartsBackgroundProps {
  /** When true, hearts render behind content (e.g. photos). Default: false */
  behindContent?: boolean;
}

export function HeartsBackground({ behindContent = false }: HeartsBackgroundProps) {
  return (
    <>
      <div className="fixed inset-0 bg-[#F5C6C6] -z-20" aria-hidden />
      <div
        className={`pointer-events-none fixed inset-0 ${behindContent ? "-z-10" : "z-0"}`}
        aria-hidden
      >
        {HEARTS_OUTSIDE_CONTENT.map(({ heart, origIndex }) => (
          <span
            key={origIndex}
            className="absolute opacity-90"
            style={{
              left: heart.left,
              top: heart.top,
              fontSize: `${heart.size}px`,
              transform: `translate(-50%, -50%) rotate(${ROTATIONS[origIndex % ROTATIONS.length]}deg)`,
            }}
          >
            💛
          </span>
        ))}
      </div>
    </>
  );
}
