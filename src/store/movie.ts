import { API_KEY } from "@/const/api";
import { Movie } from "@/utils/film";
import { Comment } from "@/utils/film";
import { defineStore } from "pinia";
import { watch } from "vue";

export interface MovieState {
  currentMovie: Movie;

  movies: Movie[];

  commentIncrement: number;

  page: number;

  query: string;
}

export const useMovieStore = defineStore("movie", {
  state: (): MovieState => ({
    currentMovie: {
      cast: [],
      comments: [],
      director: "",
      genres: [],
      id: null,
      overview: "",
      poster_path: "",
      release_date: null,
      title: "",
      vote_average: 0,
      vote_count: 0,
    },
    movies: [],
    commentIncrement: 0,
    page: 1,
    query: "",
  }),
  getters: {},
  actions: {
    async fetchMovies(previousQuery?: string) {
      let url: string;
      if (!this.page) this.page = 1;
      if (this.query) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.query}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${this.page}`;
      }
      const res = await fetch(url);
      try {
        const movies = await res.json();
        // this will remove previously searched movies as we dont want to concat we want to replace if we
        // searched globally
        if (previousQuery != null) this.movies = [];
        if (this.query) {
          this.movies = movies.results;
          return;
        }
        this.movies.push(...JSON.parse(JSON.stringify(movies.results)));
      } catch (error) {
        console.error("y a un probleme", error);
      }
    },

    async fetchMovieData(movieId: number) {
      const castAndDirectorUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=fr-FR`;
      const genresUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`;
      // API en anglais, aucun commentaires en Francais
      const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`;
      // @ts-expect-error untyped API call
      const handlingErrors = (res) => {
        if (!res.ok) {
          throw new Error(
            `Erreur lors de la récupération des genres: ${res.statusText}`
          );
        }
        return res.json();
      };
      try {
        const [castAndDirectorRes, genresRes, reviewsRes] = await Promise.all([
          fetch(castAndDirectorUrl).then(handlingErrors),
          fetch(genresUrl).then(handlingErrors),
          fetch(reviewsUrl).then(handlingErrors),
        ]);
        const genres: string[] = genresRes.genres.map((v: any) => v.name);
        const castAndDirector = this._buildCastFromRes(castAndDirectorRes);
        const comments = this._buildReviewsFromRes(reviewsRes);
        this.currentMovie = {
          ...this.currentMovie,
          ...castAndDirector,
          genres,
          comments,
        };
      } catch (error) {
        console.error(error);
      }
    },
    _buildCastFromRes(response: any): { cast: string[]; director: string } {
      const cast = response.cast
        // @ts-expect-error untyped API call
        .toSorted((a, b) => a.order - b.order)
        // @ts-expect-error untyped API call

        .map((v) => v.original_name);
      if (cast.length > 5) cast.length = 5;
      const director = response.crew?.find(
        // @ts-expect-error untyped API call
        (member) => member.job === "Director"
      ).name;

      return {
        cast,
        director,
      };
    },
    _buildReviewsFromRes(response: any): Comment[] {
      return response.results.map((result: any) => {
        return {
          user: result.author,
          content: result.content,
          rating: result.author_details.rating,
          created_at: result.created_at,
        };
      }) as Comment[];
    },
    setMovie(movie: Movie) {
      const {
        id,
        overview,
        poster_path,
        release_date,
        vote_average,
        vote_count,
        title,
      } = movie;
      this.currentMovie = {
        ...this.currentMovie,
        id,
        overview,
        poster_path,
        release_date,
        vote_average,
        vote_count,
        title,
      };
    },
    watchCommentIncrease(callback: () => void) {
      watch(
        () => this.commentIncrement,
        () => {
          callback();
        },
        { immediate: true }
      );
    },
  },
});
