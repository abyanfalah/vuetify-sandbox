<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { computed } from 'vue';
import isDarkColor from 'is-dark-color';

const store = useTodoappStore();

const isSelected = computed((taskgroup) => {
  return taskgroup == store.selectedTaskGroup;
});

// TODO: delete this function later
function emptyLocalstorage() {
  localStorage.removeItem('todoapp');
  window.location.reload();
}

function getTextColor(taskGroup) {
  const color = taskGroup.color;
  if (isDarkColor(color)) return 'white';
  return 'black';
}

function getSidebarNavStyle(taskGroup) {
  return { backgroundColor: taskGroup.color, color: getTextColor(taskGroup) };
}

</script>

<template>
  <v-navigation-drawer persistent
                       color=""
                       elevation="10">
    <v-list>
      <v-list-item class="ms-1"
                   prepend-icon="mdi-list-box"
                   size="x-large"
                   title="Todo app"
                   subtitle="Your daily helper" />
    </v-list>

    <v-divider></v-divider>

    <v-list class="px-3">
      <v-list-subheader>Task groups</v-list-subheader>
      <v-list-item v-for="(taskGroup, index) in store.taskGroupList"
                   @click="store.toggleSelectedTaskGroup(taskGroup)"
                   prepend-icon="mdi-format-list-checkbox"
                   :style="getSidebarNavStyle(taskGroup)"
                   class="rounded mb-2">

        <template v-slot:title>
          <span
                class="text-capitalize text-truncate">{{ taskGroup.name.length > 0 ? taskGroup.name : `Unnamed group ${++index}` }}</span>
        </template>
      </v-list-item>
    </v-list>

    <v-btn prepend-icon="mdi-plus"
           color="black"
           class="ms-5 my-3"
           variant="outlined"
           @click="store.newTaskGroup">new task group
    </v-btn>

    <v-btn prepend-icon="mdi-delete"
           color="red"
           class="ms-5 my-3 "
           @click="emptyLocalstorage">localstorage

    </v-btn>
  </v-navigation-drawer>
</template>
