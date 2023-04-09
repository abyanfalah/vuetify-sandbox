<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { onMounted, ref } from 'vue';

const store = useTodoappStore();

</script>

<template>
  <v-card class=""
          elevation="3">
    <v-container class="pa-5 pb-0">
      <v-card-title class="pa-0">
        <v-text-field variant="underlined"
                      color="teal"
                      v-model="store.selectedTask.task"
                      label="Task name"></v-text-field>
      </v-card-title>

      <!-- task priority -->
      <v-combobox label="Priority"
                  variant="underlined"
                  v-model="store.selectedTask.priority"
                  density="comfortable"
                  :items="['Urgent', 'High', 'Normal', 'Low']"></v-combobox>

      <!-- task additional nots -->
      <v-textarea label="Additional notes"
                  color="teal"
                  v-model="store.selectedTask.notes"
                  variant="outlined"></v-textarea>


    </v-container>

    <v-divider></v-divider>


    <!-- buttons -->
    <v-card-actions class="py-3 ">
      <v-btn v-if="!store.selectedTask.isDone"
             prepend-icon="mdi-check"
             :disabled="false"
             color="success">
        mark as done
      </v-btn>

      <v-sheet v-if="store.selectedTask.isDone"
               class="text-disabled">
        <v-icon icon="mdi-check"></v-icon>
        Task is done
      </v-sheet>

      <v-btn prepend-icon="mdi-delete"
             class="ms-auto"
             color="red">
        <span v-if="false">
          Are you sure?
        </span>
        <span v-else>
          delete this task
        </span>
      </v-btn>

    </v-card-actions>

    <v-expand-transition>
      <v-card v-show="deleteTaskConfirmation">

        <v-card-actions class="d-flex  justify-end">
          <v-btn variant="outlined"
                 color="red">
            Yes
          </v-btn>

          <v-btn variant="tonal"
                 color="primary"
                 @click="">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>

  </v-card>
</template>
