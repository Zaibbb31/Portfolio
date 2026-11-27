export type ProjectCategory = "case-study" | "ui-screens";

export const PROJECT_CATEGORY_STORAGE_KEY = "zaib_project_category";
export const PROJECT_CATEGORY_CHANGE_EVENT = "zaib-project-category-change";

const CASE_STUDY_IDS = new Set([
  "lexora",
  "paytm-rewards",
  "doconline-mobile-app",
]);

const UI_SCREEN_IDS = new Set([
  "schooldash",
  "ux-teardowns",
  "digital-brand-system",
  "settlr",
  "zero-friction-lab",
]);

let handledInitialDocumentLoad = false;

export function getCategoryForProjectId(id: string): ProjectCategory | null {
  if (CASE_STUDY_IDS.has(id)) return "case-study";
  if (UI_SCREEN_IDS.has(id)) return "ui-screens";
  return null;
}

export function setStoredProjectCategory(category: ProjectCategory): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PROJECT_CATEGORY_STORAGE_KEY, category);
    window.dispatchEvent(new Event(PROJECT_CATEGORY_CHANGE_EVENT));
  } catch {
    // Ignore storage access failures in restricted browsing modes
  }
}

export function getStoredProjectCategory(): ProjectCategory {
  if (typeof window === "undefined") return "case-study";
  try {
    if (!handledInitialDocumentLoad) {
      handledInitialDocumentLoad = true;
      const navEntries = performance.getEntriesByType?.(
        "navigation"
      ) as PerformanceNavigationTiming[] | undefined;
      const navType = navEntries?.[0]?.type;
      if (navType === "reload" && window.location.pathname === "/") {
        sessionStorage.removeItem(PROJECT_CATEGORY_STORAGE_KEY);
        return "case-study";
      }
    }

    const stored = sessionStorage.getItem(PROJECT_CATEGORY_STORAGE_KEY);
    if (stored === "case-study" || stored === "ui-screens") {
      return stored;
    }
  } catch {
    // Ignore storage access failures
  }
  return "case-study";
}

export function getServerProjectCategory(): ProjectCategory {
  return "case-study";
}

export function subscribeProjectCategory(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(PROJECT_CATEGORY_CHANGE_EVENT, callback);
  window.addEventListener("pageshow", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener(PROJECT_CATEGORY_CHANGE_EVENT, callback);
    window.removeEventListener("pageshow", callback);
    window.removeEventListener("popstate", callback);
  };
}
