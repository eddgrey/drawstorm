import { getRandomBoardImage } from "../utils";
import { createClient } from "./client";

const supabase = createClient();

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const { data: user, error: err } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  return user;
}

export async function createTeam(teamTitle: string) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const { data: team, error: err } = await supabase
    .from("teams")
    .insert({ title: teamTitle, owner_id: data.user.id })
    .select()
    .single();

  if (team) {
    await supabase
      .from("team_members")
      .insert({ team_id: team.id, user_id: data.user.id });
  }

  return team;
}

export async function getUserTeams() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const { data: teamIds, error: err } = await supabase
    .from("team_members")
    .select("*")
    .eq("user_id", data.user.id);

  if (err || !teamIds) {
    return null;
  }

  const teams = [];

  for (const { team_id } of teamIds) {
    const { data: team } = await supabase
      .from("teams")
      .select("*")
      .eq("id", team_id)
      .single();

    if (team) {
      teams.push(team);
    }
  }
  return teams;
}

export async function getBoardsByTeamId(teamId: string) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const { data: boards } = await supabase
    .from("boards")
    .select("*")
    .eq("team_id", teamId);

  return boards;
}

export async function createBoard(teamId: string) {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { data: newBoard } = await supabase
    .from("boards")
    .insert({
      team_id: teamId,
      author_id: user.id,
      author_name: user.name,
      image_url: getRandomBoardImage(),
      title: "Untitled",
    })
    .select()
    .single();

  return newBoard;
}

export async function renameBoard(boardId: string, newTitle: string) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const { data: board } = await supabase
    .from("boards")
    .update({ title: newTitle })
    .eq("id", boardId)
    .select()
    .single();

  return board;
}

export async function deleteBoard(boardId: string) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return error;
  }

  const { error: e } = await supabase.from("boards").delete().eq("id", boardId);

  return e;
}

export async function getBoardsBySearch(teamId: string, query: string) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const { data: boards } = await supabase
    .from("boards")
    .select("*")
    .ilike("title", `%${query}%`)
    .eq("team_id", teamId);

  return boards;
}

export async function getUserFavoriteBoards(teamId: string) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const { data: boardIds, error: err } = await supabase
    .from("favorite_boards")
    .select("*")
    .eq("team_id", teamId)
    .eq("user_id", data.user.id);

  if (err || !boardIds) {
    return null;
  }

  const boards: Board[] = [];

  for (const boardId of boardIds) {
    const { data, error: e } = await supabase
      .from("boards")
      .select("*")
      .eq("id", boardId.board_id)
      .single();

    if (data) {
      boards.push(data);
    }
  }

  return boards;
}

export async function getBoardFavorite(boardId: string, teamId: string) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }
  const { data: board } = await supabase
    .from("favorite_boards")
    .select("*")
    .eq("team_id", teamId)
    .eq("board_id", boardId)
    .eq("user_id", data.user.id)
    .single();

  return board;
}

export async function toogleFavoriteBoard(boardId: string, teamId: string) {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const boardIsFavorite = await getBoardFavorite(boardId, teamId);

  if (boardIsFavorite) {
    await supabase
      .from("favorite_boards")
      .delete()
      .eq("team_id", boardIsFavorite.team_id)
      .eq("board_id", boardIsFavorite.board_id)
      .eq("user_id", boardIsFavorite.user_id);
  } else {
    await supabase
      .from("favorite_boards")
      .insert({ team_id: teamId, board_id: boardId, user_id: data.user.id })
      .select()
      .single();
  }
}
