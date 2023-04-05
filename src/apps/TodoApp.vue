<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';
import TaskList from '@/components/todoapp/TaskList.vue';
import TaskDetail from '@/components/todoapp/TaskDetail.vue';

const taskGroupList = ref([]);
const isViewingTaskGroup = ref(false);
const selectedTaskGroup = ref();

const isViewingTaskDetail = ref(false);
const selectedTask = ref();


function newTaskGroup() {
  const taskGroupListLength = taskGroupList.value.length;
  const newTaskGroup = {
    id: taskGroupListLength,
    color: 'white',
    name: `Task group ${taskGroupListLength + 1}`,
    taskList: [],
    priority: 'Normal'
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

function deleteTaskgroup(taskGroupToDelete) {
  let tgList = taskGroupList.value;
  tgList = tgList.filter((tg) => tg.id !== taskGroupToDelete.id);

  taskGroupList.value = tgList;
  toggleSelectedTaskgroup(taskGroupToDelete);
  console.clear();

  console.log('to delete =>', taskGroupToDelete);
  console.log('list now =>', taskGroupList.value);
}

function showTaskDetail(task) {
  if (task == selectedTask.value) return;

  isViewingTaskDetail.value = false;
  selectedTask.value = task;
  setTimeout(() => isViewingTaskDetail.value = true, 100);
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

watch(isViewingTaskGroup, (newState) => {
  if (newState == false) {
    isViewingTaskDetail.value = false;
    selectedTask.value = null;
  }
});

onMounted(() => {
  restoreStates();
});

function restoreStates() {
  const storedState = JSON.parse(localStorage.getItem("todoapp"));
  if (storedState == null) return console.log('no storedState for todoapp');

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
                         elevation="3"
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
      <v-col cols="6">
        <v-scroll-x-transition>
          <TaskList @see-task-detail="showTaskDetail"
                    @delete-task-group="deleteTaskgroup"
                    v-if="isViewingTaskGroup"
                    :taskGroup="selectedTaskGroup" />
        </v-scroll-x-transition>
      </v-col>

      <!-- selected task detail -->
      <v-col>
        <v-slide-x-transition>
          <TaskDetail v-if="isViewingTaskDetail"
                      :selected-task="selectedTask" />
        </v-slide-x-transition>
      </v-col>
    </v-row>

  </div>

  {{ selectedTask }}
</template>
