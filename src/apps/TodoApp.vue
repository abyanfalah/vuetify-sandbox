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
               v-if="true"
               flat></v-app-bar>

    <v-navigation-drawer persistent>
      <v-list></v-list>
    </v-navigation-drawer>

    <v-row>
      <!-- taskgroup list -->
      <v-col cols="3">
        <v-row>
          <v-col cols="12"
                 v-for="(taskGroup, index) in taskGroupList">
            <v-btn class="w-100 text-capitalize text-truncate"
                   :class="selectedTaskGroup.id == taskGroup.id ? `bg-${taskGroup.color}-lighten` : null"
                   prepend-icon="mdi-format-list-bulleted"
                   @click="toggleSelectedTaskgroup(taskGroup)">
              {{ taskGroup.name }}
            </v-btn>
          </v-col>

          <v-col>
            <v-btn prepend-icon="mdi-plus"
                   class="w-100 bg-teal"
                   size="large"
                   @click="newTaskGroup">
              new task group
            </v-btn>
          </v-col>

        </v-row>
      </v-col>

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
