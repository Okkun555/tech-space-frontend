import type { Profile } from "./profile";

export type Post = {
  id: number;
  content: string;
  created_at: string;
  profile: Pick<Profile, "id" | "name">;
};
