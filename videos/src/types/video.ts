export type Resolution =
  | "P144"
  | "P240"
  | "P360"
  | "P480"
  | "P720"
  | "P1080"
  | "P1440"
  | "P2160";

export interface VideoDto {
  id: number;
  title: string;
  author: string;
  // default: false
  canBeDownloaded: boolean;
  // from 1 to 18 or null
  minAgeRestriction: number | null;
  createdAt: string; // Date ISO
  // createdAt + 1 day
  publicationDate: string; // Date ISO
  availableResolutions: Resolution[];
}
