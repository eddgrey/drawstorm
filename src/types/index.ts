type Collection = "teams" | "boards";

type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

type Team = {
  id: string;
  name: string;
  imageUrl?: string;
};

type Board = {
  id: string;
  title: string;
  teamId: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  createdAt: string;
  isFavorite: boolean;
};
