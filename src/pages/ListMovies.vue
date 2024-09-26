<template>
  <v-infinite-scroll :items="movies" :onLoad="load">
    <template v-for="(movie, index) in movies" :key="index">
      <v-card
        variant="elevated"
        color="grey-lighten-4"
        class="mb-2"
        max-width="500"
        hover
        @click="redirect()"
      >
        <v-card-text class="flex mb-2">
          <v-img class="object-fill pl-1" :src="movie.poster"></v-img>
          <div
            style="width: calc(100% - 115px)"
            class="flex flex-column justify-center"
          >
            <h2 class="mb-2">{{ `       .${index + 1} ${movie.title}` }}</h2>
            <div class="flex p-0">
              <v-icon icon="mdi-star" class="text-yellow-500"></v-icon>
              <div>{{ movie.rating }}</div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-infinite-scroll>
</template>
<script setup lang="ts">
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
<style lang="scss"></style>
