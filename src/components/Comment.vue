<template>
  <div
    class="bg-slate-200 border border-gray-300 rounded-lg p-4 w-4/5 shadow-lg"
  >
    <h2
      class="pl-6 text-2xl font-black text-gray-800 border-b-2 border-gray-300 pb-2 mb-2"
    >
      Reviews
    </h2>

    <div class="grid grid-cols-3 gap-1 w-full">
      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="flex flex-col justify-between border h-64 border-gray-300 p-4 rounded-2xl p-4 shadow-lg transform hover:scale-105 hover:z-10 hover:shadow-2xl transition duration-500"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4 py-6">
            <v-icon icon="mdi-account"></v-icon>
            <div class="text-sm font-semibold">
              {{ comment.user }} -
              <span class="font-normal">
                il y a {{ timeElapsed(comment.created_at) }}</span
              >
            </div>
          </div>
        </div>
        <div class="h-20 overflow-scroll text-sm">
          <span class="text-sm font-semibold">Avis: </span>
          <span v-if="comment.content" v-html="comment.content"></span
          ><span v-else class="italic"
            >L'utilisateur n'a pas laissé d'avis...</span
          >
        </div>
        <p class="flex text-sm font-semibold">
          <template v-if="comment.rating">
            Note:
            <span class="font-normal self-center ml-2"
              >{{ comment.rating
              }}<v-icon
                icon="mdi-star"
                size="small"
                class="text-yellow-500 mb-1 ml-1"
              ></v-icon
            ></span>
          </template>
          <template>Pas de note..</template>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { timeElapsed } from "@/utils/date";
import { useMovieStore } from "@/store/movie";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { Comment } from "@/utils/film";

const movieStore = useMovieStore();
const { currentMovie } = storeToRefs(movieStore);
const comments = ref<Comment[]>([]);
movieStore.watchCommentIncrease(_buildComments);

function _buildComments() {
  comments.value = JSON.parse(JSON.stringify(currentMovie.value.comments));
  const commentsFromLS = localStorage.getItem(`${currentMovie.value.id}`);
  if (commentsFromLS) {
    comments.value = comments.value.concat(
      JSON.parse(commentsFromLS) as Comment[]
    );
  }
  comments.value.sort((a, b) => b.created_at.localeCompare(a.created_at));
}
</script>
