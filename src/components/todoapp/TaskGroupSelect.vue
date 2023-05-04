<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { ref } from 'vue';
import getBrightorDarkTextColor from '@/services/getBrightorDarkTextColor';

const store = useTodoappStore();

</script>

<template>
  <v-sheet style="min-height: 100%;"
           class="d-flex flex-column justify-center align-center">

    <!-- hello to user -->
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
      <p class="my-3">Let's get them tasks done!</p>
    </v-sheet>

    <!-- task group list button -->
    <v-sheet class="d-flex justify-center align-center flex-wrap align-content-space-between"
             max-width="80%">


      <!-- taskgroup button -->
      <v-card v-for="(taskGroup, index) in store.taskGroupList"
              role="button"
              class="mx-3 mb-6 d-flex justify-center align-center"
              width="150px"
              elevation="5"
              @click="store.toggleSelectedTaskGroup(taskGroup)"
              :class="`text-${getBrightorDarkTextColor(taskGroup.color)}`"
              :color="taskGroup.color"
              height="150px">
        {{ taskGroup.name }}
      </v-card>

      <!-- new taskgroup button -->
      <v-card role="button"
              class="mx-3 mb-6  d-flex justify-center flex-column align-center elevation-0 border"
              width="150px"
              @click="store.newTaskGroup"
              height="150px">
        <v-icon icon="mdi-plus"
                class="text-h4"></v-icon>
        <p>New Taskgroup</p>
      </v-card>

    </v-sheet>
  </v-sheet>
</template>


<style scoped></style>
