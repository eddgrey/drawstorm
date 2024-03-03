type Team = {
  id: string;
  name: string;
  imageUrl?: string;
};

type Board = {
  id: string;
  title: string;
  projectId: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  createdAt: string;
  isFavorite: boolean;
};
