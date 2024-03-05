import teams from "@/data/teams.json";
import boards from "@/data/boards.json";

export async function simulatedAPICall(
  collection: "teams" | "boards",
  delay?: number
) {
  const data = { teams, boards };

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data[collection]), 100);
  });
}

export async function fetchTeams() {
  const data = (await simulatedAPICall("teams")) as Team[];

  return data;
}

export async function fetchBoards() {
  const data = (await simulatedAPICall("boards")) as Board[];

  return data;
}

export async function getBoardByID(id: string) {
  const boards = await fetchBoards();

  return boards.filter((board) => board.id === id)[0] || null;
}

export async function getTeamsByUserId(userId: string) {
  // TODO
}
