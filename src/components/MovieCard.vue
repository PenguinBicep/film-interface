<template>
  <div class="mb-4 h-30" :class="{ 'w-4/5': needComplete }">
    <div
      class="relative flex h-full bg-slate-200 shadow-lg m-auto rounded-xl p-1 overflow-hidden"
      :style="{ width: needComplete ? '100%' : 'auto' }"
    >
      <v-img
        v-if="!needComplete"
        class="rounded m-2 w-28 h-28"
        cover
        :src="`${imgUrl}`"
        :alt="`affiche de ${movie.title}`"
      ></v-img>

      <v-tooltip v-else location="start bottom" origin="overlap">
        <template #activator="{ props }">
          <div
            class="bg-cover bg-top h-full w-full relative"
            :style="{ 'background-image': `url(${imgUrl})` }"
            v-bind="props"
          ></div>
        </template>
        <v-img
          :src="imgUrl"
          width="200"
          height="200"
          class="bg-slate-200 w-full h-full"
        ></v-img>
      </v-tooltip>
      <div class="w-full flex flex-col justify-between p-4">
        <div class="flex justify-between item-center">
          <p v-if="movie.director" class="text-gray-500 font-medium">
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
              {{ movie.vote_average }}
              <span class="text-gray-500 font-normal">{{
                `(${movie.vote_count} votes)`
              }}</span>
            </p>
          </div>
        </div>
        <h3 class="font-black text-gray-800 text-xl">
          {{ movie.title }}
        </h3>
        <template v-if="needComplete">
          <p class="text-md text-gray-500 overflow-scroll">
            <span class="font-black text-gray-800">Genres:</span>
            {{ movie.genres.join(", ") }}
          </p>
          <p class="text-sm text-gray-500 h-32 overflow-scroll">
            <span class="font-black text-gray-800">Synopsis:</span>
            {{ movie.overview }}
          </p>
          <p class="text-l font-black text-gray-800">
            Casting Principal:
            <span class="font-normal text-gray-500">{{
              movie.cast.join(", ")
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
import { API_BASE_IMG } from "@/const/api";
import { Movie } from "@/utils/film";

const props = withDefaults(
  defineProps<{
    movie: Movie;
    needComplete?: boolean;
  }>(),
  {
    needComplete: false,
  }
);

const imgUrl = API_BASE_IMG + props.movie.poster_path;

const emit = defineEmits(["callback", "rate"]);
</script>
