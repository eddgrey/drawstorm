import { fetchBoards, getBoardByID } from "@/lib/api";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_TxQNBQWZ8pXAv9kV2lIyxBuJbhsdjmIiQ-hCvwRzWSuF5iZvNFbuEtB6AkCAVxHq",
});

export async function POST(request: Request) {
  const authorization = { id: "91dccfc6-a003-430d-9db3-127afbec1702" };
  const user: User = {
    id: "b786ec72-71fe-415c-9a58-82c9269e304c",
    name: "Jhon",
    avatarUrl: "",
  };

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  const board = await getBoardByID(room);

  if (board?.teamId !== authorization.id) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.name,
    picture: user.avatarUrl,
  };

  //   console.log({ userInfo });

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  //   console.log({ status, body }, "ALLOWED");
  return new Response(body, { status });
}
