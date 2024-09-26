<template>
  <div class="p-4 flex flex-col align-center">
    <MovieCard
      class="mc-wrapper"
      :movie="movie"
      :need-complete="true"
      @rate="isDialogCommentOpen = true"
    />
    <Comment />
    <DialogComment
      v-model:selected-movie="movie"
      v-model="isDialogCommentOpen"
    />
  </div>
</template>

<script setup lang="ts">
import { Movie } from "@/utils/film";
import { MOVIES } from "@/utils/mocks";
import { ref } from "vue";

const movie = ref<Movie>(JSON.parse(JSON.stringify(MOVIES[0])));

const isDialogCommentOpen = ref(false);
</script>
<style>
.mc-wrapper {
  height: 50vh;
}
</style>
