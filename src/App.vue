<script setup>
import SideBar from './components/SideBar.vue';
import GalleryApp from  './components/GalleryApp.vue'
import TestPage from  './components/TestPage.vue'
import TodoApp from  './components/TodoApp.vue'
import { ref } from 'vue';
import { computed } from '@vue/reactivity';

const selectedApp = ref(null)

const apps = {
  'gallery': GalleryApp,
  'testpage' : TestPage,
  'todo' : TodoApp
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
    <component v-if="selectedApp" :is="apps[selectedApp]" />

    <div v-else>
      <v-text align="center">Hello World!</v-text>
    </div>
  </v-main>
</v-app>
</template>
