<template>
  <v-dialog v-model="isDialogOpen">
    <v-card class="relative w-1/2 m-auto">
      <v-carousel
        height="400"
        progress="dots"
        v-model="currentCarouselIndex"
        hide-delimiters
      >
        <v-carousel-item
          class="bg-slate-200"
          v-for="(_, i) in new Array(3)"
          :key="i"
        >
          <v-btn
            style="position: absolute"
            class="absolute bg-slate-200 top-1 right-1 z-50"
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
                v-model="rules.user"
                label="Nom ou pseudo"
                class="dc-input-wrapper mt-4 w-2/3"
                :error-messages="v$.user.$errors.map((error: any) => error.$message as string)"
              ></v-text-field>
            </div>
            <div
              v-if="i == 1"
              class="quill-wrapper w-full flex flex-column h-full relative"
            >
              <div ref="editor" @input="updateQuill()"></div>
              <div
                v-if="v$.content.$error"
                class="text-xs error-v text-center bottom-5 absolute left-1/2 transform -translate-x-1/2"
                role="alert"
              >
                <ul>
                  <li v-for="error in v$.content.$errors" :key="error.$uuid">
                    {{ error.$message }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              v-if="i == 2"
              class="flex flex-column items-center justify-center h-full"
            >
              <h1 class="font-semibold pb-6">Laissez une note!</h1>
              <div class="flex flex-wrap">
                <div v-for="(_, index) in new Array(10)" :key="index">
                  <v-icon
                    :icon="`mdi-${
                      rules.rating > index && rules.rating !== null
                        ? 'star'
                        : 'star-outline'
                    }`"
                    class="text-yellow-500 pl-[-10px]"
                    @click="
                      rules.rating = rules.rating == index ? null : index + 1
                    "
                  ></v-icon>
                </div>
              </div>
              <div
                v-if="v$.rating.$error"
                class="text-xs error-v absolute bottom-10"
                role="alert"
              >
                <ul>
                  <li v-for="error in v$.rating.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </v-carousel-item>

        <template #prev="{ props }">
          <v-icon
            icon="mdi-chevron-left"
            @click="previousStep(props.onClick)"
          />
        </template>
        <template #next="{ props }">
          <v-btn
            v-if="currentCarouselIndex == 2"
            prepend-icon="mdi-thumb-up-outline"
            color="green"
            size="small"
            type="submit"
            @click="validateAllSteps()"
            >noter</v-btn
          >
          <v-icon
            v-else
            icon="mdi-chevron-right"
            @click="validateCurrentStep(props.onClick)"
          />
        </template>
      </v-carousel>
      <v-alert v-model="alert" type="warning" closable
        >Veuillez complétez tous les champs avec de valider</v-alert
      >
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Comment } from "@/utils/film";
import { computed, nextTick, ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  alpha,
  helpers,
} from "@vuelidate/validators";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useMovieStore } from "@/store/movie";
import { storeToRefs } from "pinia";

const isDialogOpen = defineModel<boolean>("modelValue", { required: true });

const movieStore = useMovieStore();
const { currentMovie: movie, commentIncrement } = storeToRefs(movieStore);
const editor = ref();
let quill: Quill;
let messageToHtml: string;

const currentCarouselIndex = ref<number>(0);

const options = {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ],
  },
  placeholder: `Laissez un commentaire pour ${movie.value.title}!`,
};

function closeDialog() {
  isDialogOpen.value = false;
}
watch(
  () => currentCarouselIndex.value,
  () => {
    if (currentCarouselIndex.value === 1) {
      nextTick(() => {
        const toolbar = document.querySelector(".ql-toolbar");
        if (toolbar) {
          toolbar.remove();
        }
        editor.value[0].innerHTML = "";
        quill = new Quill(editor.value[0], options);
        quill.setText(rules.value.content);
      });
    }
  }
);

watch(
  () => isDialogOpen.value,
  () => {
    if (isDialogOpen.value) {
      currentCarouselIndex.value = 0;
      rules.value = {
        user: "",
        content: "",
        rating: 0,
      };
    }
  }
);

// logic form & validation

const alert = ref(false);

const rules = ref<Comment>({
  user: "",
  content: "",
  rating: 0,
});

const alphaWithSpaces = helpers.regex(/^[A-Za-zÀ-ÿ0-9\s]+$/);

const validators = computed(() => ({
  user: {
    required: helpers.withMessage("Le champ est obligatoire", required),
    minLength: helpers.withMessage(
      "Le nom d'utilisateur doit contenir au moins 3 caractères",
      minLength(3)
    ),
    maxLength: helpers.withMessage(
      "Le nom d'utilisateur doit contenir maximum 50 caractères",
      maxLength(50)
    ),
    alpha: helpers.withMessage(
      "Seul les lettres caractères alpha sont autorisés",
      alpha
    ),
    $autoDirty: true,
  },
  content: {
    required: helpers.withMessage("Le champ est obligatoire", required),
    minLength: helpers.withMessage(
      "Le nom d'utilisateur doit contenir au moins 3 caractères",
      minLength(3)
    ),
    maxLength: helpers.withMessage(
      "Le nom d'utilisateur doit contenir maximum 500 caractères",
      maxLength(500)
    ),
    alpha: helpers.withMessage(
      "Seul les lettres caractères alphanumériques sont autorisés",
      alphaWithSpaces
    ),
    $autoDirty: true,
  },
  rating: {
    required: helpers.withMessage("Le champ est obligatoire", required),
    oneAndTen: helpers.withMessage(
      "La note doit être en 1 et 10",
      (v: number) => v !== null && v >= 1 && v <= 10
    ),
  },
}));

const v$ = useVuelidate(validators, rules);
const rulesProps = ["user", "content", "rating"];

function previousStep(clickingCallback: () => void) {
  if (!currentCarouselIndex.value) return;
  clickingCallback();
}
function updateQuill() {
  rules.value.content = quill.getText();
  messageToHtml = quill.root.innerHTML;
}
function validateCurrentStep(clickingCallback: () => void) {
  v$.value[rulesProps[currentCarouselIndex.value]].$touch();
  if (!v$.value[rulesProps[currentCarouselIndex.value]].$invalid) {
    clickingCallback();
  }
}

async function validateAllSteps() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    alert.value = true;
    return;
  }
  const itemFromLocalStorage = localStorage.getItem(`${movie.value.id}`);
  let comments: Comment[] = [];
  const commentToSave: Comment = {
    ...rules.value,
    content: messageToHtml,
    created_at: new Date().toISOString(),
  };
  if (itemFromLocalStorage) {
    comments = JSON.parse(itemFromLocalStorage);
  }
  comments.push(commentToSave);
  localStorage.setItem(`${movie.value.id}`, JSON.stringify(comments));
  commentIncrement.value++;
  isDialogOpen.value = false;
}
</script>
<style lang="scss">
.quill-wrapper {
  > .ql-container {
    min-height: 15rem;
  }
}

.error-v {
  color: rgb(var(--v-theme-error));
  font-weight: 400;
}
.dc-input-wrapper {
  .v-field__outline {
    visibility: hidden;
  }
}
</style>
