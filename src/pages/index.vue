<template>
  <v-infinite-scroll :items="movies" :onLoad="load">
    <div class="flex flex-col align-start">
      <MovieCard
        v-for="(movie, index) in movies"
        :movie="movie"
        :key="index"
        @callback="redirect()"
      />
    </div>
  </v-infinite-scroll>
</template>

<script lang="ts" setup>
import { Movie } from "@/utils/film";
import { MOVIES } from "@/utils/mocks";
import { ref } from "vue";
import { useRouter } from "vue-router";

const movies = ref<Movie[]>(
  Array.from({ length: 20 }, () => {
    const randomIndex = Math.floor(Math.random() * MOVIES.length);
    const item = JSON.parse(JSON.stringify(MOVIES[randomIndex]));
    return item;
  })
);

const router = useRouter();

console.log(movies.value);

async function load() {
  console.log("test");
}

function redirect() {
  router.push("/moviedetail");
}
</script>
