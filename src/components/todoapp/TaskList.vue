<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import todoAppModules from '@/services/todoappService';
import TaskgroupColorPickerVue from './TaskgroupColorPicker.vue';
import { useTodoappStore } from '@/stores/TodoappStore';

const store = useTodoappStore();
const taskInput = ref("");
const hideCompletedTask = ref(false);
const showColorPicker = ref(false);

const clearCompletedTaskConfirmation = ref(false);

const taskGroupColor = computed(() => {
  return store.selectedTaskGroup.color;
});


function addNewTask() {
  if (!taskInput.value) return;
  const newTask = {
    id: crypto.randomUUID(),
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


const taskGroup = ref({});
onMounted(() => {
  taskGroup.value = store.selectedTaskGroup;
})

</script>

<template>
  <v-card elevation="10"
          class="rounded">
    <v-card-title class="pa-0">
      <v-toolbar class="py-3">
        <!-- taskgroup menu -->
        <template v-slot:prepend>
          <v-btn icon="mdi-dots-vertical"
                 id="menu-activator"
                 :disabled="showColorPicker || clearCompletedTaskConfirmation"></v-btn>

          <v-menu activator="#menu-activator"
                  transition="scroll-x-transition"
                  :disabled="false">
            <v-list class="px-3">
              <v-list-item prepend-icon="mdi-palette"
                           title="Change color"
                           class="rounded"
                           @click="showColorPicker = !showColorPicker"></v-list-item>

              <v-list-item :prepend-icon="`mdi-eye${!hideCompletedTask ? '-off' : ''}`"
                           :title="`${hideCompletedTask ? 'Show' : '(coming soon) Hide'} completed task`"
                           class="rounded"
                           @click="hideCompletedTask = !hideCompletedTask"></v-list-item>

              <v-divider></v-divider>

              <v-list-item prepend-icon="mdi-broom"
                           title="Clear completed tasks"
                           class="rounded"
                           @click="clearCompletedTaskConfirmation = true"></v-list-item>


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
                      :color="taskGroupColor"
                      @keydown.enter="$event.target.blur()"
                      :autofocus="store.selectedTaskGroup.name == 'New taskgroup'"
                      hide-details>

        </v-text-field>

        <!-- btn close -->
        <template v-slot:append>
          <v-btn icon="mdi-close-circle"
                 @click="store.toggleSelectedTaskGroup(store.selectedTaskGroup)"></v-btn>
        </template>
      </v-toolbar>
    </v-card-title>

    <v-card-item class="px-5">

      <!-- color picker & clear confirmation -->
      <v-expand-transition>
        <TaskgroupColorPickerVue class="mb-3"
                                 @close-color-picker="showColorPicker = false"
                                 v-if="showColorPicker" />

        <v-sheet v-if="clearCompletedTaskConfirmation"
                 class="d-flex justify-center align-center flex-column">
          <span>
            Are you sure?
          </span>

          <div class="d-flex justify-center mt-3">
            <v-btn color="red"
                   size="small"
                   @click="{ store.clearCompletedTask(); clearCompletedTaskConfirmation = false }"
                   variant="outlined">Yes</v-btn>
            <v-btn color="primary"
                   variant="tonal"
                   class="ms-2"
                   @click="clearCompletedTaskConfirmation = false"
                   size="small">No</v-btn>
          </div>
        </v-sheet>

      </v-expand-transition>

      <!-- task items -->
      <v-sheet class="my-5">
        <v-sheet v-for="(task, index) in store.selectedTaskGroup.taskList"
                 :class="{ 'text-disabled': task.isDone }"
                 class="mb-3 py-1 px-2 border d-flex justify-space-between align-center rounded">

          <!-- checkbox -->
          <v-checkbox-btn v-model="task.isDone"
                          :color="taskGroupColor"
                          @click="store.toggleTaskDone(task)"></v-checkbox-btn>

          <!-- task text -->
          <input type="text"
                 @keydown.enter="$event.target.blur()"
                 v-model="task.task"
                 class="w-100"
                 :class="task.isDone ? 'text-disabled text-decoration-line-through' : ''">

          <!-- see detail btn -->
          <v-btn :icon="`mdi-chevron-${store.selectedTask == task ? 'left' : 'right'}`"
                 flat
                 :class="store.selectedTask == task ? 'bg-grey' : 'bg-transparent'"
                 @click="store.toggleSelectedTask(task)"
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
                      :color="taskGroupColor"
                      :focused="store.selectedTaskGroup.name != 'New taskgroup'"
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
