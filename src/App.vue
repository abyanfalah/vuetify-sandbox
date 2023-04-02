<script setup>
import { onBeforeMount, ref, watch } from 'vue';

import SideBar from './components/SideBar.vue';

import GalleryApp from './apps/GalleryApp.vue';
import TestPage from './components/TestPage.vue';
import TodoApp from './apps/TodoApp.vue';
import CounterApp from './apps/CounterApp.vue';
import WeatherApp from './apps/WeatherApp.vue';

const selectedApp = ref(null);

const apps = {
  'gallery': GalleryApp,
  'testpage': TestPage,
  'todo': TodoApp,
  'counter': CounterApp,
  'weather': WeatherApp,
};

function changePage(to) {
  selectedApp.value = to;
}

watch(selectedApp, () => {
  localStorage.setItem('vuetify-sandbox-current-app', selectedApp.value);
});

onBeforeMount(() => {
  selectedApp.value = localStorage.getItem('vuetify-sandbox-current-app') ?? null;
})

</script>

<template>
  <v-app>
    <!-- sidebar -->
    <SideBar @select-page="changePage" />

    <!-- main content -->
    <v-main>
      <component v-if="selectedApp"
                 class="mx-3 my-2 px-3 py-2"
                 :is="apps[selectedApp]" />

      <div class="mx-3 my-2 px-3 py-2"
           v-else>
        <v-sheet align="center">Hello World!</v-sheet>
      </div>
    </v-main>
  </v-app>
</template>
