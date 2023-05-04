<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { ref } from 'vue';
import getBrightorDarkTextColor from '@/services/getBrightorDarkTextColor';

const store = useTodoappStore();

</script>

<template>
  <v-sheet style="min-height: 100%;"
           class="d-flex flex-column justify-center align-center">
    <v-sheet color=""
             class="d-flex flex-column justify-center align-center ">
      <p class="text-h4">
        Hi
      </p>
      <input type="text"
             class="text-h3"
             style="outline: none; text-align: center;"
             v-model="store.username"
             placeholder="Wholesome dude">
      <p class="my-3">Let's organize your task!</p>
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
        <v-card role="button"
                class="mx-3 d-flex justify-center flex-column align-center elevation-0 border"
                width="150px"
                @click="store.newTaskGroup"
                height="150px">
          <v-icon icon="mdi-plus"
                  class="text-h4"></v-icon>
          <p>New Taskgroup</p>
        </v-card>
      </div>
    </v-sheet>
  </v-sheet>
</template>
