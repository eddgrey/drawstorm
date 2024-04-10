import type { Database as DB } from "@/lib/supabase/db.types";

type Request = {
  teamName: string;
  userId: string;
  userName: string;
  userAvatarUrl: string;
};
declare global {
  type Database = DB;
  type User = DB["public"]["Tables"]["users"]["Row"];
  type Team = DB["public"]["Tables"]["teams"]["Row"];
  type Board = DB["public"]["Tables"]["boards"]["Row"];
  type Requests = Record<string, Request[]>;
}
