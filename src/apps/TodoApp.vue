<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';
import getBrightorDarkTextColor from '@/services/getBrightorDarkTextColor';

import TodoappSidebar from '@/components/todoapp/TodoappSidebar.vue';
import TaskGroupSelect from '@/components/todoapp/TaskGroupSelect.vue';
import TaskList from '@/components/todoapp/TaskList.vue';
import TaskDetail from '@/components/todoapp/TaskDetail.vue';
import ModalDeleteTaskGroup from '@/components/todoapp/ModalDeleteTaskGroup.vue';


import { useTodoappStore } from '@/stores/TodoappStore';

const store = useTodoappStore();

let previousBackgroundColor = null;
const backgroundColor = computed(() => {
  if (!store.selectedTaskGroup) return previousBackgroundColor;

  previousBackgroundColor = store.selectedTaskGroup.color;
  return previousBackgroundColor;
});

onMounted(() => {
  store.restoreStates();
  previousBackgroundColor = store.selectedTaskGroup ? store.selectedTaskGroup.color : 'grey';
});
</script>

<template>
  <v-sheet :class="`h-100`"
           :color="backgroundColor"
           :style="{ color: getBrightorDarkTextColor(backgroundColor) }">
    <TodoappSidebar />

    <v-row class="pa-10"
           v-if="store.isViewingTaskGroup">
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

    <TaskGroupSelect v-else />
  </v-sheet>

  <ModalDeleteTaskGroup v-model="store.showDeleteDialog" />
</template>
