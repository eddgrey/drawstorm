type Collection = "teams" | "boards";

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
