<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';
const numberOfImagesToDisplay = ref(5);
const columnNumber = ref(3)
const randomizerFactor = ref(1)
const colorize = ref(true)


const states = computed(() => {
  return {
    numberOfImagesToDisplay: numberOfImagesToDisplay.value,
    columnNumber: columnNumber.value
}
})

watch(states, () => {
  console.log(JSON.stringify(states.value))
  localStorage.setItem("galleryApp", JSON.stringify(states.value))
})

onMounted(() => {
  const storedState = JSON.parse(localStorage.getItem("galleryApp"))
  console.log(storedState)
  numberOfImagesToDisplay.value = storedState.numberOfImagesToDisplay ?? numberOfImagesToDisplay.value
  columnNumber.value = storedState.columnNumber ?? columnNumber.value
})
</script>

<template>
  <div>
    <v-app-bar
      color="warning"
      title="Gallery app"
      elevation="flat"
    >
      <template v-slot:append>
        <!-- toggle grayscale -->
        <!-- :color="colorize ? 'blue-lighten' : 'grey-lighten'" -->
        <v-btn
          class="me-3"
          :class="colorize? 'bg-primary' : 'bg-grey'"
          variant="tonal"
          @click="colorize = !colorize"
        >
        color
        </v-btn>

        <!-- increase / decrease n of image -->
         <v-btn-toggle
          >
            <v-btn
              icon="mdi-minus"
              @click="numberOfImagesToDisplay--"
              :disabled="numberOfImagesToDisplay<2"
            ></v-btn>
            <v-btn disabled>{{ numberOfImagesToDisplay }}</v-btn>
            <v-btn
              icon="mdi-plus"
              @click="numberOfImagesToDisplay++"
              :disabled="numberOfImagesToDisplay>49"
              ></v-btn>
          </v-btn-toggle>

        <!-- randomize btn -->
        <v-btn
          icon="mdi-dice-3-outline"
          color=""
        ></v-btn>

        <!-- zoom out btn -->
        <v-btn
          icon="mdi-magnify-minus-outline"
          color=""
          @click="columnNumber--"
          :disabled="columnNumber<2"
        ></v-btn>

        <!-- zoom in btn -->
        <v-btn
          icon="mdi-magnify-plus-outline"
          color=""
          @click="columnNumber++"
          :disabled="columnNumber>11"

        ></v-btn>
      </template>


    </v-app-bar>


    <v-card
      flat
      class="pa-3"
    >
      <v-row class="d-flex">
        <v-col
          v-for="n in numberOfImagesToDisplay"
          :cols="columnNumber"
          >
          <v-card elevation="3">
            <v-img
              :src="`https://picsum.photos/id/${randomizerFactor * 19 + n}/200${!colorize ? '?grayscale' : ''}`"
              aspect-ratio="1"
              :cover="true"
              >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
