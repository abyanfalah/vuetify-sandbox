<script setup>
import { ref } from 'vue';

const colors = ref(['red-lighten-3', 'primary', 'orange', 'success', 'grey']);
</script>

<template>
  <v-sheet class="h-screen d-flex flex-column justify-center align-center">
    <v-sheet color=""
             class="d-flex justify-center align-center text-h3"
             height="10%">
      Hi
    </v-sheet>
    <v-sheet class="text-center"
             height="50%">
      <p>
        Here is where you will choose a taskGroup. I'll be showing them in squares card thing with individually
        different icon each taskgroup has.
      </p>
      <p>
        And that taskGroup chooser on your left would be folded when you are in this mode.
      </p>
      <div class="d-flex flex-row justify-center align-center mt-5">
        <v-card v-for="(n, index) in 5"
                class="mx-3 d-flex justify-center align-center"
                width="150px"
                elevation="5"
                :class="`bg-${colors[index]}`"
                height="150px">
          TaskGroup {{ n }}
        </v-card>
      </div>
    </v-sheet>
  </v-sheet>
</template>
