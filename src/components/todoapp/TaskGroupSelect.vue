<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { ref } from 'vue';
import getBrightorDarkTextColor from '@/services/getBrightorDarkTextColor';

const store = useTodoappStore();

const colors = ref(['red-lighten-3', 'primary', 'orange', 'success', 'grey']);
</script>

<template>
  <v-sheet class="h-screen d-flex flex-column justify-center align-center">
    <v-sheet color=""
             class="d-flex flex-column justify-center align-center "
             height="10%">
      <p class="text-h3">Hi!</p>
      <p>Let's do some stuff</p>
    </v-sheet>
    <v-sheet class="text-center"
             height="50%">

      <div class="d-flex flex-row justify-center align-center mt-5">
        <!-- <v-card v-for="(n, index) in 5"
                class="mx-3 d-flex justify-center align-center"
                width="150px"
                elevation="5"
                :class="`bg-${colors[index]}`"
                height="150px">
          TaskGroup {{ n }}
        </v-card> -->

        <v-card v-for="(taskGroup, index) in store.taskGroupList"
                role="button"
                class="mx-3 d-flex justify-center align-center"
                width="150px"
                elevation="5"
                @click="store.toggleSelectedTaskGroup(taskGroup)"
                :class="`text-${getBrightorDarkTextColor(taskGroup.color)}`"
                :color="taskGroup.color"
                height="150px">
          {{ taskGroup.name }}
        </v-card>
      </div>
    </v-sheet>
  </v-sheet>
</template>
