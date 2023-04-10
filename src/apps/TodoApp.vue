<script setup>
import { computed } from '@vue/reactivity';
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

import TodoappSidebar from '@/components/todoapp/TodoappSidebar.vue';
import TaskList from '@/components/todoapp/TaskList.vue';
import TaskDetail from '@/components/todoapp/TaskDetail.vue';
import ModalDeleteTaskGroup from '@/components/todoapp/ModalDeleteTaskGroup.vue';

import { useTodoappStore } from '@/stores/TodoappStore';

const store = useTodoappStore();


// TODO: delete this function later
function emptyLocalstorage() {
  localStorage.removeItem('todoapp');
  window.location.reload();
}

onMounted(() => {
  store.restoreStates();
});
</script>

<template>
  <div :class="`h-100 bg-teal-lighten-4 pa-10`">
    <TodoappSidebar />

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
