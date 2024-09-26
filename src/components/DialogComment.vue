<template>
  <v-dialog v-model="isDialogOpen">
    <v-card class="relative w-1/2 m-auto">
      <v-carousel
        height="400"
        progress="primary"
        v-model="currentCarouselIndex"
        hide-delimiters
      >
        <v-carousel-item v-for="(_, i) in new Array(3)" :key="i">
          <v-btn
            style="position: absolute"
            class="absolute top-1 right-1"
            density="compact"
            icon="mdi-close"
            flat
            @click="closeDialog()"
          ></v-btn>
          <div class="flex items-center justify-center flex-column h-full">
            <div
              v-if="i == 0"
              class="flex flex-col items-center w-full text-center"
            >
              <h1 class="font-semibold">Choisissez un pseudonyme!</h1>

              <v-text-field
                ref="input"
                label="Nom ou pseudo"
                class="mt-4 w-2/3"
                :rules="rules"
              ></v-text-field>
            </div>
            <div v-if="i == 1" class="quill-wrapper flex flex-column h-full">
              <QuillEditor
                v-if="i == 1"
                v-model:content="newComment"
                :options="options"
                @input="deltaToHTML()"
              >
              </QuillEditor>
            </div>
            <div
              v-if="i == 2"
              class="flex flex-column items-center justify-center h-full"
            >
              <h1 class="font-semibold pb-6">Laissez une note!</h1>
              <div>
                <span v-for="(pos, index) in new Array(10)" :key="index">
                  <v-icon
                    :icon="`mdi-${
                      currentRating >= index && currentRating !== null
                        ? 'star'
                        : 'star-outline'
                    }`"
                    class="text-yellow-500 pl-[-10px]"
                    @click="
                      currentRating = currentRating == index ? null : index
                    "
                  ></v-icon
                ></span>
              </div>
            </div>
          </div>
        </v-carousel-item>

        <template #prev="{ props }">
          <v-icon icon="mdi-chevron-left" @click="props.onClick" />
        </template>
        <template #next="{ props }">
          <v-icon
            icon="mdi-chevron-right"
            @click="validateNextStep(props.onClick)"
          />
        </template>
      </v-carousel>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Movie } from "@/utils/film";
import { computed, nextTick, ref, watch, WritableComputedRef } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import { Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { Delta } from "quill/core";
import {
  isAlpha,
  isGreaterThanString,
  isLowerThanString,
  isRequired,
} from "@/utils/validation";

const props = defineProps<{
  modelValue: boolean;
  selectedMovie: Movie;
}>();

const emit = defineEmits(["update:selectedMovie", "update:modelValue"]);

const movie = computed({
  get: () => props.selectedMovie,
  set: (value) => emit("update:selectedMovie", value),
});

const isDialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const newComment = ref(null);

const options = {
  modules: {
    toolbar: [
      "bold",
      "italic",
      "underline",
      { list: "ordered" },
      { list: "bullet" },
      { list: "check" },
    ],
  },
  placeholder: `Laissez un commentaire pour ${movie.value.title}!`,
};

function closeDialog() {
  isDialogOpen.value = false;
}
function deltaToHTML() {
  // l'editeur utilise un espèce de JSON complexe à manipuler (Delta)
  // on transforme le format Delta directement en balise HTML qu'on pourra stocker sous forme de string
  var tempQuill = new Quill(document.createElement("div"));
  if (newComment.value) {
    tempQuill.setContents(newComment.value as unknown as Delta);
    console.log(tempQuill.root.innerHTML);
  }
}

// logic carousel

const currentCarouselIndex = ref<number>();

watch(
  () => currentCarouselIndex.value,
  () => console.log(currentCarouselIndex.value, "Valeur du carousel")
);

// logic rating

const currentRating = ref<number>();

// logic form validation
async function validateNextStep(clickingCallback: () => void) {
  console.log("hassoul");
}
const rules = [
  isRequired,
  isGreaterThanString(3),
  isLowerThanString(50),
  isAlpha,
];
</script>
<style lang="scss">
.quill-wrapper {
  > .ql-container {
    min-height: 15rem;
  }
}

.v-field__outline {
  visibility: hidden;
}
</style>
