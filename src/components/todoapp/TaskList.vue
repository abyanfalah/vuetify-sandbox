<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import todoAppModules from '@/services/todoAppModules';

const emit = defineEmits(['seeTaskDetail', 'markTaskDone', 'deleteTaskGroup', 'closeTaskGroup', 'clearCompletedTasks']);
const props = defineProps(['taskGroup', 'selectedTask']);
const getColorByPriority = todoAppModules.getColorByPriority;

const taskGroup = ref({});
const selectedTask = ref(null);

function changeColor() {
  alert('coming soon');
}

const taskInput = ref('');
function addTask() {
  if (!taskInput.value) return;

  const newTask = {
    task: taskInput.value,
    isDone: false,
    due: null,
    priority: 'Normal',
    notes: null,
    addedAt: Date.now(),
    doneAt: null,
  };
  taskGroup.value.taskList.push(newTask);
  taskInput.value = '';
};

function selectTask(task) {
  emit('seeTaskDetail', task);
  selectedTask.value = task;
}

function toggleSelectTask(task) {
  if (selectedTask.value == task) {
    selectedTask.value = null;
    emit('seeTaskDetail', null);
  } else {
    selectTask(task);
  }

}



onBeforeMount(() => {
  taskGroup.value = props.taskGroup;
  selectedTask.value = props.selectedTask ?? null;
});
</script>

<template>
  <v-card :class="`bg-${taskGroup.color}`"
          elevation="3"
          class="rounded">
    <v-card-title class="pa-0">
      <v-toolbar class="py-3"
                 color="white">
        <template v-slot:prepend>
          <v-btn icon="mdi-dots-vertical"
                 id="menu-activator"></v-btn>

          <v-menu activator="#menu-activator"
                  transition="scroll-x-transition">
            <v-list class="px-3">
              <v-list-item prepend-icon="mdi-palette"
                           title="Change color"
                           class="rounded"
                           @click="changeColor"></v-list-item>

              <v-list-item prepend-icon="mdi-broom"
                           title="Clear completed tasks"
                           class="rounded"
                           @click="emit('clearCompletedTasks')"></v-list-item>

              <v-list-item prepend-icon="mdi-delete"
                           title="Delete this task group"
                           class="bg-red rounded"
                           variant="outlined"
                           @click="emit('deleteTaskGroup', taskGroup)"></v-list-item>
            </v-list>
          </v-menu>
        </template>


        <v-text-field class="mx-3"
                      v-model="taskGroup.name"
                      label="Group name"
                      density="comfortable"
                      variant="underlined"
                      color="teal"
                      :autofocus="taskGroup.name.toLowerCase().indexOf('task group ') > -1 ? true : false"
                      hide-details>
        </v-text-field>

        <template v-slot:append>
          <v-btn icon="mdi-close-circle"
                 @click="emit('closeTaskGroup', taskGroup)"></v-btn>
        </template>
      </v-toolbar>
    </v-card-title>

    <!-- task items -->
    <v-card-item class="px-5">
      <v-sheet class="my-5">
        <v-sheet v-for="(task, index) in taskGroup.taskList"
                 :class="task.isDone ? 'text-disabled' : ''"
                 class="mb-3 py-1 px-2 border d-flex justify-space-between align-center rounded">

          <!-- checkbox -->
          <v-checkbox-btn v-model="task.isDone"
                          @click="emit('markTaskDone', task)"></v-checkbox-btn>

          <!-- task text -->
          <input type="text"
                 @keydown.enter="$event.target.blur()"
                 v-model="taskGroup.taskList[index].task"
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
                      :autofocus="taskGroup.name.toLowerCase().indexOf('task group ') < 0 ? true : false"
                      label="+ New task"
                      append-inner-icon="mdi-plus"
                      @click:append-inner="addTask"
                      @keydown.enter="addTask"
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
