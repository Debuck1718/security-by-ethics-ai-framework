import type { SavedAssessment } from "../types/assessment";

const STORAGE_KEY = "security-by-ethics-assessments";

export const getSavedAssessments = (): SavedAssessment[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load saved assessments:", error);
    return [];
  }
};

export const saveAssessment = (assessment: SavedAssessment) => {
  try {
    const existing = getSavedAssessments();

    const updated = [
      assessment,
      ...existing.filter((item) => item.id !== assessment.id),
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save assessment:", error);
  }
};

export const deleteAssessment = (id: string) => {
  try {
    const existing = getSavedAssessments();
    const updated = existing.filter((item) => item.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to delete assessment:", error);
  }
};

export const clearAssessments = () => {
  localStorage.removeItem(STORAGE_KEY);
};