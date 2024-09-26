<template>
  <div class="flex gap-1 align">
    <div
      v-for="(comment, index) in movie.comments"
      :key="index"
      class="border border-gray-300 p-4 bg-white rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4 py-6">
          <v-icon icon="mdi-account"></v-icon>
          <div class="text-sm font-semibold">
            {{ comment.user }} -
            <span class="font-normal">
              il y a {{ timeElapsed(comment.createdAt) }}</span
            >
          </div>
        </div>
      </div>

      <p class="text-md text-gray-600">{{ comment.message }}</p>
      <div class="flex mt-5">
        <v-icon
          v-for="(_, indexRating) in new Array(Math.round(comment.rating))"
          :key="indexRating"
          icon="mdi-star"
          class="text-yellow-500"
        ></v-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Movie } from "@/utils/film";
import { MOVIES } from "@/utils/mocks";
import { ref } from "vue";
import { timeElapsed } from "@/utils/date";

const movie = ref<Movie>(JSON.parse(JSON.stringify(MOVIES[0])));
</script>
