<script setup>
import { ref } from 'vue';

import SideBar from './components/SideBar.vue';
import GalleryApp from  './components/GalleryApp.vue'
import TestPage from  './components/TestPage.vue'
import TodoApp from  './components/TodoApp.vue'
import CounterApp from './components/CounterApp.vue';

const selectedApp = ref(null)

const apps = {
  'gallery': GalleryApp,
  'testpage' : TestPage,
  'todo': TodoApp,
  'counter' : CounterApp
}

function changePage(to) {
  console.log('to page', to)
  selectedApp.value = to
}

</script>

<template>
<v-app>
  <!-- sidebar -->
  <SideBar @select-page="changePage" />

  <!-- main content -->
  <v-main>
    <component
      v-if="selectedApp"
      class="mx-3 my-2 px-3 py-2"
      :is="apps[selectedApp]"
    />

    <div class="mx-3 my-2 px-3 py-2" v-else>
      <v-sheet align="center">Hello World!</v-sheet>
    </div>
  </v-main>
</v-app>
</template>
