<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';
import ProgressCircular from '@/components/ProgressCircular.vue';
import ModalConfirmRandomize from '@/components/galleryapp/ModalConfirmRandomize.vue';
import BackToTopButton from '@/components/BackToTopButton.vue';

const numberOfImagesToDisplay = ref(5);
const columnNumber = ref(3);
const randomizerFactor = ref(1);
const colorize = ref(true);
const randomizeDialog = ref(false);

function changeRandomizer() {
  randomizeDialog.value = false;
  randomizerFactor.value = Math.floor(Math.random() * 10);
}

const states = computed(() => {
  return {
    numberOfImagesToDisplay: numberOfImagesToDisplay.value,
    columnNumber: columnNumber.value,
    colorize: colorize.value,
    randomizerFactor: randomizerFactor.value
  };
});

watch(() => states.value, (newState) => {
  localStorage.setItem("galleryApp", JSON.stringify(newState));
}, { deep: true });

onMounted(() => {
  restoreStates();
});

function restoreStates() {
  2;
  const storedState = JSON.parse(localStorage.getItem("galleryApp"));
  if (storedState == null) return console.log("no storedState for galleryApp");
  numberOfImagesToDisplay.value = storedState.numberOfImagesToDisplay ?? numberOfImagesToDisplay.value;
  columnNumber.value = storedState.columnNumber ?? columnNumber.value;
  colorize.value = storedState.colorize ?? colorize.value;
  randomizerFactor.value = storedState.randomizerFactor ?? randomizerFactor.value;
}

const showBackToTopButton = computed(() => window.scrollY > 30);
</script>

<template>
  <v-container>

    <v-app-bar color="orange"
               title="Gallery app"
               flat>
      <template v-slot:append>
        <!-- toggle grayscale -->
        <div>
          <v-switch v-model="colorize"
                    prepend-icon="mdi-palette"
                    hide-details="true"
                    color="blue"
                    class="mx-4"
                    density="comfortable" />
        </div>



        <!-- increase / decrease n of image -->
        <v-btn-toggle>
          <v-btn icon="mdi-minus"
                 @click="numberOfImagesToDisplay--"
                 :disabled="numberOfImagesToDisplay < 2"></v-btn>
          <v-btn disabled>{{ numberOfImagesToDisplay }}</v-btn>
          <v-btn icon="mdi-plus"
                 @click="numberOfImagesToDisplay++"
                 :disabled="numberOfImagesToDisplay > 201"></v-btn>
        </v-btn-toggle>

        <!-- randomize btn -->
        <v-btn class="ms-1"
               icon="mdi-dice-3-outline"
               @click="randomizeDialog = true">
          <v-icon icon="mdi-dice-3-outline"></v-icon>
          <ModalConfirmRandomize v-model="randomizeDialog"
                                 @cancelRandomize="randomizeDialog = false"
                                 @confirmRandomize="changeRandomizer" />
        </v-btn>

        <!-- zoom out btn -->
        <v-btn icon="mdi-magnify-minus-outline"
               color=""
               @click="columnNumber--"
               :disabled="columnNumber < 2"></v-btn>

        <!-- zoom in btn -->
        <v-btn icon="mdi-magnify-plus-outline"
               color=""
               @click="columnNumber++"
               :disabled="columnNumber > 11"></v-btn>
      </template>


    </v-app-bar>

    <v-lazy transition="scroll-x-transition">
      <v-card flat
              class="pa-3">
        <v-row class="d-flex">
          <v-col v-for="n in numberOfImagesToDisplay"
                 :cols="columnNumber">
            <v-card elevation="3">
              <v-img :src="`https://picsum.photos/id/${randomizerFactor * 19 + n}/200${!colorize ? '?grayscale' : ''}`"
                     aspect-ratio="1"
                     :cover="true">
                <template v-slot:placeholder>
                  <div class="fill-height d-flex align-center justify-center">
                    <ProgressCircular />
                  </div>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-lazy>


    <BackToTopButton btnColor="orange" />

  </v-container>
</template>
