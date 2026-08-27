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
  NONE: "bg-zinc-800/70 border-zinc-700/30",
  FIRST_QUARTILE: "bg-[#0e4429] border-[#006d32]/40",
  SECOND_QUARTILE: "bg-[#006d32] border-[#26a641]/50",
  THIRD_QUARTILE: "bg-[#26a641] border-[#39d353]/60",
  FOURTH_QUARTILE: "bg-[#39d353] border-[#56ff76]/80",
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function GitHubContributions({
  showHeader = false,
}: {
  showHeader?: boolean;
}) {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
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
        setData(json);
      } catch (err: any) {
        setData({
          configured: true,
          error: "Failed to connect to GitHub API endpoint.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  // Scroll to the right (most recent contributions) on mobile on load
  useEffect(() => {
    if (data?.weeks && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [data]);

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

  const content = (
    <>
      {showHeader && (
        <div className="flex flex-col items-center text-center mb-14 select-none">
          <span className="text-xs font-regular tracking-[0.2em] text-zinc-500 uppercase">
            Activity &amp; Open Source
          </span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-zinc-950 mt-3 uppercase">
            GitHub Contributions
          </h2>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full bg-[#0c0c0e] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-zinc-700/80 select-none">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between bg-[#16161a] px-5 py-3 border-b border-zinc-900 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600/40" />
            <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600/40" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600/40" />
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 fill-current text-zinc-400" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="text-xs text-zinc-400 font-mono font-medium">
              github.com/{data?.username || "activity"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase tracking-wider hidden sm:inline">
              LIVE
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 font-sans">
          
          {loading ? (
            /* Loading Shimmer State */
            <div className="flex flex-col gap-6 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-6 w-48 bg-zinc-800/60 rounded-md" />
                <div className="h-6 w-32 bg-zinc-800/60 rounded-md" />
              </div>
              <div className="h-32 w-full bg-zinc-900/60 rounded-xl" />
            </div>
          ) : !data?.configured ? (
            /* Unconfigured / Setup Guide State */
            <div className="flex flex-col items-center justify-center text-center py-8 px-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-emerald-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-1">
                GitHub API Setup Required
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mb-4">
                Please add your <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded text-[11px]">GITHUB_USERNAME</code> and <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded text-[11px]">GITHUB_TOKEN</code> to your <code className="text-zinc-300">.env.local</code> file to display real-time contribution data.
              </p>
              <div className="bg-[#121215] border border-zinc-800/80 rounded-xl px-4 py-3 text-left font-mono text-xs text-zinc-300 max-w-md w-full">
                <p className="text-zinc-500 select-none"># .env.local</p>
                <p><span className="text-emerald-400">GITHUB_USERNAME</span>=your_github_username</p>
                <p><span className="text-emerald-400">GITHUB_TOKEN</span>=your_github_personal_access_token</p>
              </div>
            </div>
          ) : data?.error ? (
            /* Error State */
            <div className="flex flex-col items-center justify-center text-center py-8">
              <span className="text-rose-400 font-mono text-sm mb-2">Error loading GitHub contributions:</span>
              <span className="text-zinc-400 text-xs font-mono">{data.error}</span>
            </div>
          ) : (
            /* Loaded Contribution Calendar */
            <div className="flex flex-col gap-6">
              
              {/* Header Stats Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900/80 pb-4">
                <div className="flex items-center gap-3">
                  {data.avatarUrl && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
                      <Image
                        src={data.avatarUrl}
                        alt={data.name || "GitHub User"}
                        fill
                        sizes="32px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {data.name || data.username}
                    </h3>
                    <span className="text-xs text-emerald-400 font-mono">
                      @{data.username}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-full w-fit">
                  <span className="text-xs text-zinc-400">Total in the last year:</span>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    {data.totalContributions?.toLocaleString()} contributions
                  </span>
                </div>
              </div>

              {/* Scrollable Heatmap Grid */}
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent flex justify-center"
              >
                <div className="min-w-[760px] flex flex-col gap-1.5 mx-auto">
                  
                  {/* Month labels row */}
                  <div className="flex text-[10px] text-zinc-500 font-mono pl-7">
                    {data.weeks && data.weeks.map((week, idx) => {
                      const firstDayDate = week.contributionDays[0]?.date;
                      if (!firstDayDate) return <div key={idx} className="w-3 mr-1" />;
                      
                      const dateObj = new Date(firstDayDate + "T00:00:00");
                      const dayOfMonth = dateObj.getDate();
                      const isFirstWeekOfMonth = dayOfMonth <= 7;
                      const monthName = MONTH_NAMES[dateObj.getMonth()];

                      return (
                        <div key={idx} className="w-3 mr-1 text-center select-none">
                          {isFirstWeekOfMonth ? monthName : ""}
                        </div>
                      );
                    })}
                  </div>

                  {/* Day labels + Contribution blocks */}
                  <div className="flex gap-1.5">
                    
                    {/* Day of week labels (Mon, Wed, Fri) */}
                    <div className="flex flex-col justify-between text-[9px] text-zinc-500 font-mono py-0.5 pr-1 select-none h-[98px]">
                      <span></span>
                      <span>Mon</span>
                      <span></span>
                      <span>Wed</span>
                      <span></span>
                      <span>Fri</span>
                      <span></span>
                    </div>

                    {/* Weeks Columns */}
                    <div className="flex gap-1">
                      {data.weeks?.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-1">
                          {Array.from({ length: 7 }).map((_, dIdx) => {
                            const day = week.contributionDays.find(
                              (d) => d.weekday === dIdx
                            );

                            if (!day) {
                              return (
                                <div
                                  key={dIdx}
                                  className="w-3 h-3 rounded-[2.5px] bg-transparent opacity-0"
                                />
                              );
                            }

                            const colorClass = LEVEL_COLORS[day.contributionLevel] || LEVEL_COLORS.NONE;

                            return (
                              <div
                                key={dIdx}
                                className={`w-3 h-3 rounded-[2.5px] border ${colorClass} transition-all duration-150 cursor-pointer hover:scale-130 hover:z-20 hover:ring-2 hover:ring-white/40`}
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

                  </div>

                </div>
              </div>

              {/* Legend and Footer info */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 pt-2 border-t border-zinc-900/60 font-mono">
                <span className="text-[11px]">
                  Real-time data synced via GitHub GraphQL API
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">Less</span>
                  <div className="flex gap-1 items-center">
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
          )}

        </div>

      </div>

      {/* Floating Hover Tooltip Portal */}
      {hoveredDay && (
        <div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-full px-2.5 py-1.5 bg-[#1a1a1f] text-zinc-100 text-xs font-sans rounded-lg shadow-xl border border-zinc-700/80 whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y}px`,
          }}
        >
          <div className="font-semibold text-zinc-200">
            {hoveredDay.count === 0
              ? "No contributions"
              : `${hoveredDay.count} contribution${hoveredDay.count === 1 ? "" : "s"}`}
          </div>
          <div className="text-[10px] text-zinc-400 font-mono">
            {formatDate(hoveredDay.date)}
          </div>
        </div>
      )}
    </>
  );

  if (showHeader) {
    return (
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 -mt-6">
        {content}
      </section>
    );
  }

  return <div className="w-full">{content}</div>;
}
