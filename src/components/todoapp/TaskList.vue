<script setup>
import { onBeforeMount, ref, watch } from 'vue';

const emit = defineEmits(['changesMade']);
const props = defineProps(['taskGroup']);
const taskGroup = ref({});


function changeColor() {
  alert('change color');
}

const taskInput = ref('');
function addTask() {
  alert(taskInput.value);
}

onBeforeMount(() => {
  taskGroup.value = props.taskGroup;
});
</script>

<template>
  <v-card :class="`bg-${taskGroup.color}`"
          class="rounded elevation-3 pa-8">
    <v-card-title class="pa-0">
      <v-text-field v-model="taskGroup.name"
                    label="Group name"
                    density="comfortable"
                    append-inner-icon="mdi-palette"
                    @click:append-inner="changeColor"
                    hide-details>
      </v-text-field>

    </v-card-title>


    <v-sheet class="my-5">
      <v-sheet class="mb-3 py-0 px-3 elevation-1 d-flex justify-space-between align-center rounded"
               v-for="n in 5">
        <!-- checkbox and task name -->
        <div class="w-100">
          <v-checkbox hide-details
                      class="fill-width">
          <template v-slot:label>
            <input type="text"
                   class="w-100">
          </template>
        </v-checkbox>
        </div>

        <!-- see detail btn -->
        <div>
          <v-btn icon="mdi-chevron-right"
                 flat
                 density="comfortable"></v-btn>
        </div>
      </v-sheet>

      <v-text-field hide-details
                    density="compact"
                    class="rounded"
                    variant="solo"></v-text-field>

      <v-sheet class="pa-3 rounded">
        <!-- <input type="text"
                                                                         class="w-100 "
                                                                         placeholder="Add task"
                                                                         v-model="taskInput"
                                                                         append-icon="mdi-plus"
                                                                         @keydown.enter="addTask"> -->

      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style scoped>
input[type=text] {
  outline: none;
}
</style>
