import type { Database as DB } from "@/lib/supabase/db.types";

declare global {
  type Database = DB;
  type User = DB["public"]["Tables"]["users"]["Row"];
  type Team = DB["public"]["Tables"]["teams"]["Row"];
  type Board = DB["public"]["Tables"]["boards"]["Row"];
}
