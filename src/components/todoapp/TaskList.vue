<script setup>
import { onBeforeMount, ref } from 'vue';
import todoAppModules from '@/services/todoAppModules';

const emit = defineEmits(['seeTaskDetail', 'deleteTaskGroup']);
const props = defineProps(['taskGroup']);
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
    priority: 0,
    notes: null,
    addedAt: Date.now(),
    doneAt: null,
    toggleDoneState: function () {
      if (!this.isDone) {
        this.doneAt = Date.now();
        this.isDone = true;
        return;
      }
      this.doneAt = null;
      this.isDone = false;
    }
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
});
</script>

<template>
  <v-card :class="`bg-${taskGroup.color}`"
          elevation="3"
          class="rounded  pa-8">
    <v-card-title class="pa-0">
      <v-text-field v-model="taskGroup.name"
                    label="Group name"
                    density="comfortable"
                    variant="underlined"
                    color="teal"
                    :autofocus="taskGroup.name.toLowerCase().indexOf('task group ') > -1 ? true : false"
                    append-inner-icon="mdi-palette"
                    @click:append-inner="changeColor"
                    hide-details>
      </v-text-field>

    </v-card-title>

    <!-- task item -->
    <v-sheet class="mb-5 mt-10">
      <v-sheet v-for="(task, index) in taskGroup.taskList"
               :class="task.isDone ? 'text-disabled' : ''"
               :color="getColorByPriority(task.priority)"
               class="mb-3 py-1 px-2 border d-flex justify-space-between align-center rounded">

        <!-- checkbox -->
        <v-checkbox-btn v-model="task.isDone"
                        @click="task.toggleDoneState"></v-checkbox-btn>

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
                    autofocus
                    label="+ New task"
                    append-inner-icon="mdi-plus"
                    @click:append-inner="addTask"
                    @keydown.enter="addTask"
                    v-model="taskInput"
                    color="teal"
                    variant="outlined"></v-text-field>

    </v-sheet>

    <v-card-actions>
      <v-btn color="red"
             variant="tonal"
             @click="emit('deleteTaskGroup', taskGroup)"
             prepend-icon="mdi-delete">Delete task group</v-btn>
      => modal confirmation
    </v-card-actions>
  </v-card>
</template>

<style scoped>
input[type=text] {
  outline: none;
}
</style>
