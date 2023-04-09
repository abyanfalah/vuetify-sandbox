<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import todoAppModules from '@/services/todoappService';
import TaskgroupColorPickerVue from './TaskgroupColorPicker.vue';
import { useTodoappStore } from '@/stores/TodoappStore';

const store = useTodoappStore();
const taskInput = ref("");
const hideCompletedTask = ref(false);

const taskGroup = ref({});


function addNewTask() {
  if (!taskInput.value) return;
  const newTask = {
    task: taskInput.value,
    isDone: false,
    due: null,
    priority: "Normal",
    notes: null,
    addedAt: Date.now(),
    doneAt: null,
  };

  store.addTask(newTask);
  taskInput.value = '';
}

onMounted(() => {
  taskGroup.value = store.selectedTaskGroup;
})

</script>

<template>
  <v-card elevation="3"
          class="rounded">
    <v-card-title class="pa-0">
      <v-toolbar class="py-3"
                 color="white">

        <!-- taskgroup menu -->
        <template v-slot:prepend>
          <v-btn icon="mdi-dots-vertical"
                 id="menu-activator"></v-btn>

          <v-menu activator="#menu-activator"
                  transition="scroll-x-transition">
            <v-list class="px-3">
              <v-list-item prepend-icon="mdi-palette"
                           title="Change color"
                           class="rounded"
                           @click="showColorPicker = !showColorPicker"></v-list-item>

              <v-list-item :prepend-icon="`mdi-eye${!hideCompletedTask ? '-off' : ''}`"
                           :title="`${hideCompletedTask ? 'Show' : 'Hide'} completed task`"
                           class="rounded"
                           @click="hideCompletedTask = !hideCompletedTask"></v-list-item>

              <v-divider></v-divider>

              <v-list-item prepend-icon="mdi-broom"
                           title="Clear completed tasks"
                           class="rounded"
                           @click=""></v-list-item>


              <v-list-item prepend-icon="mdi-delete"
                           title="Delete this task group"
                           class="bg-red rounded"
                           variant="outlined"
                           @click="store.showDeleteDialog = true"></v-list-item>
            </v-list>
          </v-menu>
        </template>

        <!-- taskgroup name -->
        <v-text-field class="mx-3"
                      label="Group name"
                      density="comfortable"
                      variant="underlined"
                      v-model="store.selectedTaskGroup.name"
                      color="teal"
                      hide-details>
        </v-text-field>

        <!-- btn close -->
        <template v-slot:append>
          <v-btn icon="mdi-close-circle"
                 @click="store.selectedTaskGroup = null"></v-btn>
        </template>
      </v-toolbar>
    </v-card-title>

    <!-- task items -->
    <v-card-item class="px-5">
      <v-expand-transition>
        <TaskgroupColorPickerVue class="mb-3"
                                 v-if="store.showColorPicker" />
      </v-expand-transition>

      <v-sheet class="my-5">
        <v-sheet v-for="(task, index) in taskGroup.taskList"
                 :class="{ 'text-disabled': task.isDone }"
                 class="mb-3 py-1 px-2 border d-flex justify-space-between align-center rounded">

          <!-- checkbox -->
          <v-checkbox-btn v-model="task.isDone"
                          @click="store.toggleTaskDone(task)"></v-checkbox-btn>

          <!-- task text -->
          <input type="text"
                 @keydown.enter="$event.target.blur()"
                 v-model="task.task"
                 class="w-100"
                 :class="task.isDone ? 'text-disabled text-decoration-line-through' : ''">

          <!-- see detail btn -->
          <v-btn :icon="`mdi-chevron-${selectedTask == task ? 'left' : 'right'}`"
                 flat
                 :class="selectedTask == task ? 'bg-black' : 'bg-transparent'"
                 @click="toggleSelectTask(task)"
                 density="comfortable"></v-btn>

        </v-sheet>

        <!-- task input -->
        <v-text-field hide-details
                      density="comfortable"
                      class="rounded mt-5"
                      placeholder="Add new task"
                      clearable
                      label="+ New task"
                      append-inner-icon="mdi-plus"
                      @click:append-inner="addNewTask"
                      @keydown.enter="addNewTask"
                      v-model="taskInput"
                      color="teal"
                      variant="outlined"></v-text-field>
      </v-sheet>
    </v-card-item>
  </v-card>
</template>

<style scoped>
input[type=text] {
  outline: none;
}
</style>
