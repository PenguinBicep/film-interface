<template>
  <div class="flex flex-col mb-4 h-30 justify-start w-4/5">
    <div
      class="relative flex h-full rounded-lg space-y-3 shadow-lg p-3 mx-auto border border-white bg-white"
      :style="{ width: needComplete ? '80%' : '60%' }"
    >
      <v-img
        :style="{
          width: needComplete ? '50%' : '7rem',
          height: needComplete ? 'auto' : '7rem',
        }"
        :src="movie.poster"
      ></v-img>

      <div class="w-full bg-white flex flex-col justify-between p-3">
        <div class="flex justify-between item-center">
          <p class="text-gray-500 font-medium">
            <span class="text-l font-black text-gray-800">Par</span>
            {{ movie.director }}
          </p>

          <div class="flex items-center">
            <v-btn
              v-if="needComplete"
              prepend-icon="mdi-account-plus"
              color="blue"
              class="mr-2"
              density="comfortable"
              size="small"
              variant="tonal"
              @click="emit('rate')"
              >noter</v-btn
            >
            <v-icon icon="mdi-star" class="text-yellow-500"></v-icon>

            <p class="text-gray-600 font-bold text-sm ml-1">
              {{ movie.rating }}
              <span class="text-gray-500 font-normal">{{
                `(${movie.votes} votes)`
              }}</span>
            </p>
          </div>
        </div>
        <h3 class="font-black text-gray-800 text-xl">
          {{ movie.title }}
        </h3>
        <template v-if="needComplete">
          <p class="text-md text-gray-500 text-base overflow-scroll">
            <span class="font-black text-gray-800">Synopsis:</span>
            {{ movie.synopsis }}
          </p>
          <p class="text-l font-black text-gray-800">
            Casting Principal:
            <span class="font-normal text-gray-600 text-base">{{
              movie.mainCharacters.join(",")
            }}</span>
          </p>
        </template>
        <p v-else class="text-gray-500 font-medium flex align-end">
          Fiche complète
          <v-icon icon="mdi-arrow-right" @click="emit('callback')"></v-icon>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Movie } from "@/utils/film";

withDefaults(
  defineProps<{
    movie: Movie;
    needComplete?: boolean;
  }>(),
  {
    needComplete: false,
  }
);

const emit = defineEmits(["callback", "rate"]);
</script>
