<script setup>
import { ref } from 'vue';

const emits = defineEmits(['selectPage']);


function toPage(page) {
  emits('selectPage', page);
}

</script>

<template>
  <v-navigation-drawer rail
                       rail-width="65"
                       expand-on-hover
                       elevation="1"
                       width="275">
    <v-list>
      <v-list-item class="ms-1"
                   prepend-icon="mdi-vuetify"
                   size="x-large"
                   title="Vuetify Playground"
                   subtitle="Mess around, and find out..."
                   color="green" />
    </v-list>

    <v-divider></v-divider>

    <v-list class="px-3"
            density="compact"
            nav>

      <v-list-item prepend-icon="mdi-image"
                   title="Gallery"
                   value="gallery"
                   @click="toPage('gallery')" />

      <v-list-item prepend-icon="mdi-list-box"
                   title="Todo list"
                   value="todo"
                   @click="toPage('todo')" />

      <v-list-item prepend-icon="mdi-weather-partly-cloudy"
                   title="Weather"
                   value="weather"
                   @click="toPage('weather')" />

      <v-divider class="my-3" />

      <v-list-item prepend-icon="mdi-test-tube"
                   title="Test page"
                   value="testpage"
                   @click="toPage('testpage')" />

    </v-list>


  </v-navigation-drawer>
</template>
