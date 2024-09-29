export interface Movie {
  id: number;

  title: string;

  director: string;

  overview: string;

  poster_path: string | null;

  release_date: string;

  vote_average: number;

  vote_count: number;

  cast: string[];

  genres: string[];

  comments: Comment[];
}
// export type Message = string | { message: string; isHtml: true };
export interface Comment {
  user: string;

  /** html string, example : '<p>my comment is cool</p>' */
  content: string;

  rating: number;

  /** ISO string */
  created_at?: string;
}
