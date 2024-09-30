<template>
  <v-app class="main-background">
    <v-app-bar color="grey-darken-4" density="compact" dark>
      <template #prepend>
        <v-btn icon="mdi-home-outline" @click="router.push('/')"></v-btn>
      </template>
      <v-toolbar-title>Décrouvrez TMDB</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="query"
        class="filterbar-wrapper mt-4"
        rows="1"
        prepend-inner-icon="mdi-magnify"
        placeholder="Rechercher un film..."
        :readonly="router.currentRoute.value.fullPath !== '/'"
      ></v-text-field>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view #default="{ Component }">
          <v-fade-transition mode="out-in">
            <component :is="Component"></component>
          </v-fade-transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useMovieStore } from "./store/movie";
import { storeToRefs } from "pinia";

const router = useRouter();
const movieStore = useMovieStore();
const { query } = storeToRefs(movieStore);
</script>
<style lang="scss" scoped>
.main-background {
  background-image: url("./assets/pulp_fiction.jpg");
  background-repeat: repeat-y;
  background-size: 100% auto;
  background-position: top left;
  min-height: 100vh;
}
</style>
