<template>
  <v-infinite-scroll :items="movies" :onLoad="load">
    <div class="grid grid-cols-2 gap-1">
      <MovieCard
        v-for="movie in movies"
        :movie="movie"
        :key="movie.id"
        @callback="redirect(movie)"
      />
    </div>
  </v-infinite-scroll>
</template>

<script lang="ts" setup>
import { useMovieStore } from "@/store/movie";
import { Movie } from "@/utils/film";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { watch } from "vue";

const movieStore = useMovieStore();

const { movies, page, query } = storeToRefs(movieStore);
page.value = 0;
const router = useRouter();

watch(
  () => query.value,
  async (_, previousQuery) => {
    await movieStore.fetchMovies(previousQuery);
  }
);

// @ts-expect-error untyped props
async function load({ done }) {
  if (query.value) {
    done("ok");
    return;
  }
  page.value++;
  await movieStore.fetchMovies();
  done("ok");
}

async function redirect(movie: Movie) {
  movieStore.setMovie(movie);
  await movieStore.fetchMovieData(movie.id);
  router.push("/moviedetail");
}
</script>
