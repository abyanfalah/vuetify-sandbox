<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['color']);
const emits = defineEmits(['ok']);

const page = ref(1);

function closeThisThing() {
  emits('ok');
  setTimeout(() => page.value = 1, 300);
}

watch(() => props.color, () => {
  console.log(props.color);
});
</script>

<template>
  <v-dialog persistent
            max-width="500px">
    <v-card class="pa-4">
      <v-card-title>
        <span v-if="page < 4"> Here's why...</span>
        <span v-else-if="page = 4"> Really? Thanks!</span>
      </v-card-title>
      <v-expand-transition>

        <!-- page 1 -->
        <v-card-text v-if="page == 1">
          <p>Normally, folks use those APIs from RapidApi. While it offers convenience such as accepting various types of
            input and gives you accurate result, it also comes
            with
            <span class="font-weight-bold">limitations</span> <sup>i need to pay for subcription <sup>but got no
                money <sup>*sob</sup></sup></sup>.
          </p>


          <v-card-actions class="mt-10 d-flex justify-center">
            <v-btn variant="outlined"
                   :color="props.color"
                   @click="page = 2">I see....</v-btn>
          </v-card-actions>
        </v-card-text>

        <!-- page 2 -->
        <v-card-text v-if="page == 2">
          <p>So instead, i use that free API from <a
               href="https://open-meteo.com/en/docs#api-documentation">open-meteo</a> which has 10K hit limit. Not bad
            innit?</p>

          <p class="mt-3">But the problem is, it only accepts coordinate numbers as the location params..</p>
          <v-card-actions class="mt-10 d-flex justify-center">
            <v-btn variant="outlined"
                   :color="props.color"
                   @click="page = 3">So what do you do?</v-btn>
          </v-card-actions>
        </v-card-text>

        <!-- page 3 -->
        <v-card-text v-if="page == 3">
          <p>I use <a href="https://open-meteo.com/en/docs/geocoding-api">geocding API from open-meteo itself</a> to get
            the coordinates of the location you want to know the weather of. Then hit the weather API with the coordinates
            number provided.</p>

          <p class="mt-3">Sounds laughable innit? You probably have more efficient solutions to this, but i was having
            good time coding it out. So it's fine.</p>
          <v-card-actions class="mt-10 d-flex justify-center">
            <v-btn variant="outlined"
                   :color="props.color"
                   @click="page = 4">Aight bruh. i symphatize with you...</v-btn>
          </v-card-actions>
        </v-card-text>

        <!-- page 4 -->
        <v-card-text v-if="page == 4">
          <p>I hope you life goes well bruh...</p>
          <v-card-actions class="mt-10 d-flex justify-center">
            <v-btn variant="outlined"
                   :color="props.color"
                   @click="closeThisThing">That's cool! you to bruh...</v-btn>
          </v-card-actions>
        </v-card-text>

      </v-expand-transition>



    </v-card>
  </v-dialog>
</template>
