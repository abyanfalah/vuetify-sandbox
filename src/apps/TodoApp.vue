<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';

import TaskList from '@/components/todoapp/TaskList.vue';
import TaskDetail from '@/components/todoapp/TaskDetail.vue';
import ModalDeleteTaskGroup from '@/components/todoapp/ModalDeleteTaskGroup.vue';
import { useTodoappStore } from '@/stores/TodoappStore';

const store = useTodoappStore();
const _ = ref({});

function test() {
  alert('hey');
}

onMounted(() => {
  store.restoreStates();
});
</script>

<template>
  <div :class="`h-100 bg-teal-lighten-4 pa-10`">
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
                     class="rounded">

          <template v-slot:title>
            <span
                  class="text-capitalize text-truncate">{{ taskGroup.name.length > 0 ? taskGroup.name : `Unnamed group ${++index}` }}</span>
          </template>
        </v-list-item>

      </v-list>
      <v-btn prepend-icon="mdi-plus"
             color="white"
             class="ms-5"
             @click="store.newTaskGroup">new task group

      </v-btn>
    </v-navigation-drawer>

    <v-row>
      <!-- selected taskgroup view -->
      <v-col cols="6">
        <v-scroll-x-transition>
          <TaskList v-if="store.selectedTaskGroup" />
        </v-scroll-x-transition>
      </v-col>

      <!-- selected task detail -->
      <v-col>
        <v-slide-x-transition>
          <TaskDetail v-if="store.selectedTask" />
        </v-slide-x-transition>
      </v-col>
    </v-row>
  </div>

  <ModalDeleteTaskGroup v-model="store.showDeleteDialog" />
</template>
