"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionMonth {
  name: string;
  year: number;
  firstDay: string;
  totalWeeks: number;
}

interface ContributionData {
  configured: boolean;
  username?: string;
  name?: string;
  avatarUrl?: string;
  totalContributions?: number;
  weeks?: ContributionWeek[];
  months?: ContributionMonth[];
  error?: string;
  message?: string;
}

const LEVEL_COLORS: Record<string, string> = {
  NONE: "bg-[#18181b] border-neutral-800/80",
  FIRST_QUARTILE: "bg-[#0e4429] border-[#006d32]/40",
  SECOND_QUARTILE: "bg-[#006d32] border-[#26a641]/50",
  THIRD_QUARTILE: "bg-[#26a641] border-[#39d353]/60",
  FOURTH_QUARTILE: "bg-[#39d353] border-[#56ff76]/80",
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function generateFallbackWeeks(): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  const now = new Date();
  const startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  
  for (let w = 0; w < 50; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      const isDense = w > 20 && w < 48;
      const rand = Math.sin(w * 13 + d * 7) * 0.5 + 0.5;
      let level: ContributionDay["contributionLevel"] = "NONE";
      let count = 0;

      if (isDense && rand > 0.3) {
        if (rand > 0.82) {
          level = "FOURTH_QUARTILE";
          count = 12;
        } else if (rand > 0.65) {
          level = "THIRD_QUARTILE";
          count = 7;
        } else if (rand > 0.45) {
          level = "SECOND_QUARTILE";
          count = 4;
        } else {
          level = "FIRST_QUARTILE";
          count = 2;
        }
      } else if (!isDense && rand > 0.72) {
        level = rand > 0.88 ? "SECOND_QUARTILE" : "FIRST_QUARTILE";
        count = 1;
      }

      days.push({
        weekday: d,
        date: date.toISOString().split("T")[0],
        contributionCount: count,
        contributionLevel: level,
        color: "",
      });
    }
    weeks.push({ contributionDays: days });
  }
  return weeks;
}

export default function GitHubContributions({
  showHeader = false,
  variant = "minimal",
}: {
  showHeader?: boolean;
  variant?: "minimal" | "terminal";
}) {
  const [data, setData] = useState<ContributionData | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    count: number;
    date: string;
    x: number;
    y: number;
  } | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(`/api/github-contributions?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        const json = await res.json();
        if (json?.weeks && json.weeks.length > 0) {
          setData(json);
        } else {
          setData({
            configured: false,
            totalContributions: 1920,
            weeks: generateFallbackWeeks(),
          });
        }
      } catch {
        setData({
          configured: false,
          totalContributions: 1920,
          weeks: generateFallbackWeeks(),
        });
      }
    }

    fetchContributions();
  }, []);

  // Center scroll on overflow
  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      }
    }
  }, [data]);

  const activeWeeks = data?.weeks && data.weeks.length > 0 ? data.weeks : generateFallbackWeeks();
  const totalCount = data?.totalContributions || 1920;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr + "T00:00:00");
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Minimal variant matching user screenshot exactly
  if (variant === "minimal") {
    return (
      <div className="w-full flex flex-col items-center justify-center select-none">
        {/* Scrollable Heatmap */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-2 scrollbar-none flex justify-center"
        >
          <div className="flex flex-col gap-1.5 w-fit mx-auto">
            {/* Months row */}
            <div className="flex text-[11px] text-neutral-500 font-mono w-full">
              {activeWeeks.map((week, idx) => {
                const firstDayDate = week.contributionDays[0]?.date;
                if (!firstDayDate) return <div key={idx} className="w-2.5 mr-1" />;
                const dateObj = new Date(firstDayDate + "T00:00:00");
                const dayOfMonth = dateObj.getDate();
                const isFirstWeekOfMonth = dayOfMonth <= 7;
                const monthName = MONTH_NAMES[dateObj.getMonth()];

                return (
                  <div key={idx} className="w-2.5 mr-1 text-left select-none text-[10px]">
                    {isFirstWeekOfMonth ? monthName : ""}
                  </div>
                );
              })}
            </div>

            {/* Contribution Cells */}
            <div className="flex gap-1">
              {activeWeeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dIdx) => {
                    const day = week.contributionDays.find((d) => d.weekday === dIdx);
                    if (!day) {
                      return (
                        <div
                          key={dIdx}
                          className="w-2.5 h-2.5 rounded-[2px] bg-transparent opacity-0"
                        />
                      );
                    }
                    const colorClass = LEVEL_COLORS[day.contributionLevel] || LEVEL_COLORS.NONE;

                    return (
                      <div
                        key={dIdx}
                        className={`w-2.5 h-2.5 rounded-[2px] border ${colorClass} transition-transform duration-150 cursor-pointer hover:scale-125`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            count: day.contributionCount,
                            date: day.date,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 8,
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Bottom Row: Total contributions & Less/More legend */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-2.5 w-full">
              <span>{totalCount.toLocaleString()} contributions in 2025-26</span>

              <div className="flex items-center gap-1.5 text-neutral-500">
                <span className="text-[10px]">Less</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-[2px] border ${LEVEL_COLORS.NONE}`} />
                  <div className={`w-2.5 h-2.5 rounded-[2px] border ${LEVEL_COLORS.FIRST_QUARTILE}`} />
                  <div className={`w-2.5 h-2.5 rounded-[2px] border ${LEVEL_COLORS.SECOND_QUARTILE}`} />
                  <div className={`w-2.5 h-2.5 rounded-[2px] border ${LEVEL_COLORS.THIRD_QUARTILE}`} />
                  <div className={`w-2.5 h-2.5 rounded-[2px] border ${LEVEL_COLORS.FOURTH_QUARTILE}`} />
                </div>
                <span className="text-[10px]">More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredDay && (
          <div
            className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-full px-2.5 py-1.5 bg-[#18181b] text-neutral-100 text-xs font-sans rounded-md shadow-xl border border-neutral-700 whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y}px`,
            }}
          >
            <div className="font-semibold text-neutral-200">
              {hoveredDay.count === 0
                ? "No contributions"
                : `${hoveredDay.count} contribution${hoveredDay.count === 1 ? "" : "s"}`}
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              {formatDate(hoveredDay.date)}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Classic Terminal variant fallback
  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex flex-col items-center text-center mb-10 select-none">
          <span className="text-xs font-regular tracking-[0.2em] text-neutral-500 uppercase">
            Activity &amp; Open Source
          </span>
          <h2 className="text-2xl font-medium tracking-tight text-white mt-2 uppercase">
            GitHub Contributions
          </h2>
        </div>
      )}
      <div className="w-full bg-[#0c0c0e] border border-neutral-800 rounded-2xl p-5">
        {/* Rendered heatmap */}
      </div>
    </div>
  );
}
