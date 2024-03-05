import { getBoardByID, getTeamIdsByUserId } from "@/lib/api";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_TxQNBQWZ8pXAv9kV2lIyxBuJbhsdjmIiQ-hCvwRzWSuF5iZvNFbuEtB6AkCAVxHq",
});

export async function POST(request: Request) {
  //   console.log(request.url);
  const { room } = await request.json();
  // TODO: Get current user
  const user: User = {
    id: "b786ec72-71fe-415c-9a58-82c9269e304c",
    name: "Jhon",
    avatarUrl: "",
  };
  const board = await getBoardByID(room);

  if (!board) {
    return new Response("Not found", { status: 404 });
  }

  const teams = await getTeamIdsByUserId(user.id);
  const isAuthorized = teams.includes(board.teamId);

  if (!isAuthorized) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.name,
    picture: user.avatarUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
