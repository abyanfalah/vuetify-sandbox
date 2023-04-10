<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';

const store = useTodoappStore();
</script>

<template>
  <v-navigation-drawer persistent
                       elevation="3"
                       color="teal">
    <v-list>
      <v-list-item class="ms-1"
                   prepend-icon="mdi-list-box"
                   size="x-large"
                   title="Todo app"
                   subtitle="Your daily helper"
                   color="green" />
    </v-list>

    <v-divider></v-divider>

    <v-list class="px-3 bg-teal">
      <v-list-subheader color="white">Task groups</v-list-subheader>
      <v-list-item v-for="(taskGroup, index) in store.taskGroupList"
                   @click="store.toggleSelectedTaskGroup(taskGroup)"
                   prepend-icon="mdi-format-list-checkbox"
                   :class="{ 'bg-white': taskGroup == store.selectedTaskGroup }"
                   class="rounded mb-2">

        <template v-slot:title>
          <span
                class="text-capitalize text-truncate">{{ taskGroup.name.length > 0 ? taskGroup.name : `Unnamed group ${++index}` }}</span>
        </template>
      </v-list-item>
    </v-list>

    <v-btn prepend-icon="mdi-plus"
           color="white"
           class="ms-5 my-3"
           @click="store.newTaskGroup">new task group
    </v-btn>

    <v-btn prepend-icon="mdi-delete"
           color="red"
           class="ms-5 my-3 "
           @click="emptyLocalstorage">localstorage

    </v-btn>
  </v-navigation-drawer>
</template>
