<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';
import ProgressCircular from '@/components/ProgressCircular.vue';
import ModalConfirmRandomize from '@/components/galleryapp/ModalConfirmRandomize.vue';

const numberOfImagesToDisplay = ref(5);
const columnNumber = ref(3);
const randomizerFactor = ref(1);
const colorize = ref(true);
const randomizeDialog = ref(false);

function changeRandomizer() {
  randomizeDialog.value = false;
  randomizerFactor.value = Math.floor(Math.random() * 10);

  // show a nice  overlay with progress
}

const states = computed(() => {
  return {
    numberOfImagesToDisplay: numberOfImagesToDisplay.value,
    columnNumber: columnNumber.value,
    colorize: colorize.value
  };
});

watch(states, () => {
  localStorage.setItem("galleryApp", JSON.stringify(states.value));
});

onMounted(() => {
  const storedState = JSON.parse(localStorage.getItem("galleryApp"));
  numberOfImagesToDisplay.value = storedState.numberOfImagesToDisplay ?? numberOfImagesToDisplay.value;

  columnNumber.value = storedState.columnNumber ?? columnNumber.value;
  colorize.value = storedState.colorize ?? colorize.value;
});
</script>

<template>
  <div>
    <v-app-bar color="warning"
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
               icon="mdi-dice-3-outline">
          <v-icon icon="mdi-dice-3-outline"></v-icon>
          <v-dialog activator="parent"
                    v-model="randomizeDialog"
                    persistent
                    width="auto">
            <v-card class="pa-4">
              <v-card-text>
                <p>
                  Randomize the images?
                </p>
                <span class="text-grey text-caption">You probably won't see these images anymore.</span>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn variant="outlined"
                       color="red"
                       @click="changeRandomizer">Yes</v-btn>
                <v-btn @click="randomizeDialog = false">No</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
                  <ProgressCircular />
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-lazy>
  </div>
</template>
