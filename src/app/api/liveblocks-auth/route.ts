import { createClient } from "@/lib/supabase/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user.id) {
    return new Response("Unauthorized", { status: 403 });
  }
  const { room } = await request.json();

  const { data: board } = await supabase
    .from("boards")
    .select()
    .eq("id", room)
    .single();

  if (!board) {
    return new Response("Not found", { status: 404 });
  }

  const { data: isTeamMember } = await supabase
    .from("team_members")
    .select()
    .eq("user_id", data.user.id)
    .eq("team_id", board.team_id)
    .single();

  if (!isTeamMember) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { data: userProfile } = await supabase
    .from("users")
    .select()
    .eq("id", data.user.id)
    .single();

  const userInfo = {
    name: userProfile?.name || "Anonymous",
    picture: userProfile?.avatar_url || "/avatars/guest.png",
  };

  const session = liveblocks.prepareSession(data.user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
