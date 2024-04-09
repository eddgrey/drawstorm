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

  console.log(teams);

  return teams;
}
