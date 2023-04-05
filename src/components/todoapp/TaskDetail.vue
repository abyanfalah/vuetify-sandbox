<script setup>
import { onBeforeMount, ref, watch } from 'vue';

const props = defineProps(['selectedTask']);
const task = ref({});

onBeforeMount(() => {
  task.value = props.selectedTask;
});
</script>

<template>
  <v-card class="pa-8"
          elevation="3"
          v-if="task">
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

    <!-- buttons -->
    <v-card-actions>
      <v-btn icon="mdi-check"
             variant="default"
             color="teal"></v-btn>

      <v-btn icon="mdi-delete"
             variant="default"
             color="red"></v-btn>

    </v-card-actions>
  </v-card>
</template>
