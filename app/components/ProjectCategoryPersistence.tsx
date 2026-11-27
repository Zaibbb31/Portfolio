"use client";

import { useEffect } from "react";
import {
  getCategoryForProjectId,
  setStoredProjectCategory,
} from "@/lib/projectCategory";

export default function ProjectCategoryPersistence({
  projectId,
}: {
  projectId: string;
}) {
  useEffect(() => {
    const category = getCategoryForProjectId(projectId);
    if (!category) return;

    const persist = () => setStoredProjectCategory(category);
    persist();

    window.addEventListener("pageshow", persist);
    return () => window.removeEventListener("pageshow", persist);
  }, [projectId]);

  return null;
}
