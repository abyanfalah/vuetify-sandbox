<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';
import TaskList from '@/components/todoapp/TaskList.vue';

const taskGroupList = ref([]);
const isViewingTaskGroup = ref(false);
const selectedTaskGroup = ref();


function newTaskGroup() {
  const taskGroupListLength = taskGroupList.value.length;
  const newTaskGroup = {
    id: taskGroupListLength,
    color: 'white',
    name: `Task group ${taskGroupListLength + 1}`,
    taskList: [],
  };

  isViewingTaskGroup.value = false;
  taskGroupList.value.push(newTaskGroup);
  selectedTaskGroup.value = newTaskGroup;

  setTimeout(() => {
    isViewingTaskGroup.value = true;
  });
}

function toggleSelectedTaskgroup(taskGroup) {
  if (taskGroup == selectedTaskGroup.value) {
    selectedTaskGroup.value = null;
    isViewingTaskGroup.value = false;
    return;
  }

  isViewingTaskGroup.value = false;
  selectedTaskGroup.value = taskGroup;
  setTimeout(() => {
    isViewingTaskGroup.value = true;
  }, 100);
}

const states = computed(() => {
  return {
    taskGroupList: taskGroupList.value,
    isViewingTaskGroup: isViewingTaskGroup.value,
    selectedTaskGroup: selectedTaskGroup.value,
  };
});

watch(states, (newState) => {
  newState = JSON.stringify(newState);
  localStorage.setItem('todoapp', newState);
});

onMounted(() => {
  restoreStates();
});

function restoreStates() {
  const storedState = JSON.parse(localStorage.getItem("todoapp"));
  taskGroupList.value = storedState.taskGroupList ?? taskGroupList.value;
  isViewingTaskGroup.value = storedState.isViewingTaskGroup ?? taskGroupList.value;
  selectedTaskGroup.value = storedState.selectedTaskGroup ?? taskGroupList.value;
}
</script>

<template>
  <div :class="`h-100 bg-teal-lighten-4 pa-10`">
    <v-app-bar title="Todolist app"
               :class="`bg-teal`"
               v-if="false"
               flat></v-app-bar>

    <v-navigation-drawer persistent
                         color="teal">
      <v-list class="px-3 bg-teal"
              nav>
        <v-list-item v-for="(taskGroup, index) in taskGroupList"
                     @click="toggleSelectedTaskgroup(taskGroup)"
                     prepend-icon="mdi-plus">
          <template v-slot:title>
            <span class="text-capitalize text-truncate">{{ taskGroup.name }}</span>
          </template>
        </v-list-item>

        <v-list-item @click="newTaskGroup"
                     prepend-icon="mdi-plus"
                     class="bg-white px-3"
                     elevation="1"
                     title="Add new task group">

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-row>
      <!-- taskgroup view -->
      <v-col cols="5">
        <v-scroll-x-transition>
          <TaskList v-if="isViewingTaskGroup"
                    :taskGroup="selectedTaskGroup" />
        </v-scroll-x-transition>
      </v-col>

      <!-- selected task detail -->
      <v-col cols="4">
        {{ taskGroupList }}
      </v-col>
    </v-row>

  </div>
</template>
