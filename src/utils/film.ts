export interface Movie {
  _id: string;

  poster: string;

  title: string;

  synopsis: string;

  director: string;

  mainCharacters: string[];

  rating: number;

  votes: number;

  comments: Comment[];
}

export interface Comment {
  user: string;

  message: string;

  rating: number;

  createdAt: string;
  /** ISO string */
}
