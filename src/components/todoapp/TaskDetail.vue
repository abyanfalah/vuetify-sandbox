<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue';


const emit = defineEmits(['markTaskDone', 'deleteTask']);
const props = defineProps(['selectedTask']);
const task = ref({});

const deleteTaskConfirmation = ref(false);

onMounted(() => {
  task.value = props.selectedTask;
});
</script>

<template>
  <v-card class=""
          elevation="3"
          v-if="task">
    <v-container class="pa-5 pb-0">
      <v-card-title class="pa-0">
        <v-text-field variant="underlined"
                      color="teal"
                      v-model="task.task"
                      label="Task name"></v-text-field>
      </v-card-title>

      <!-- task priority -->
      <v-combobox label="Priority"
                  variant="underlined"
                  v-model="task.priority"
                  density="comfortable"
                  :items="['Urgent', 'High', 'Normal', 'Low']"></v-combobox>

      <!-- task additional nots -->
      <v-textarea label="Additional notes"
                  color="teal"
                  v-model="task.notes"
                  variant="outlined"></v-textarea>


    </v-container>

    <v-divider></v-divider>


    <!-- buttons -->
    <v-card-actions class="py-3 ">
      <v-btn v-if="!task.isDone"
             prepend-icon="mdi-check"
             :disabled="deleteTaskConfirmation"
             @click="emit('markTaskDone', task)"
             color="success">
        mark as done
      </v-btn>

      <v-sheet v-if="task.isDone"
               class="text-disabled">
        <v-icon icon="mdi-check"></v-icon>
        Task is done
      </v-sheet>

      <v-btn prepend-icon="mdi-delete"
             class="ms-auto"
             @click="deleteTaskConfirmation = true"
             color="red">
        <span v-if="deleteTaskConfirmation">
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
                 color="red"
                 @click="emit('deleteTask', task)">
            Yes
          </v-btn>

          <v-btn variant="tonal"
                 color="primary"
                 @click="deleteTaskConfirmation = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>

  </v-card>
</template>
