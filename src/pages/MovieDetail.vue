<template>
  <div class="p-4 flex flex-col align-center">
    <MovieCard
      class="mc-wrapper"
      :movie="currentMovie"
      :need-complete="true"
      @rate="isDialogCommentOpen = true"
    />
    <Comment :movie="currentMovie" />
    <DialogComment
      v-model:selected-movie="currentMovie"
      v-model="isDialogCommentOpen"
    />
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from "@/store/movie";

import { storeToRefs } from "pinia";
import { ref } from "vue";

const movieStore = useMovieStore();
const { currentMovie } = storeToRefs(movieStore);

const isDialogCommentOpen = ref(false);
</script>
<style>
.mc-wrapper {
  height: 50vh;
}
</style>
