<script setup>

const emits = defineEmits(['selectPage']);
const props = defineProps(['isAtHome']);

function toPage(page) {
  emits('selectPage', page);
}

</script>

<template>
  <v-navigation-drawer color="black"
                       rail
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

      <v-list-item prepend-icon="mdi-home"
                   active-color="white"
                   title="Home"
                   value="home"
                   :active="isAtHome"
                   @click="toPage('home')" />

      <v-list-item prepend-icon="mdi-image"
                   active-color="white"
                   title="Gallery"
                   value="gallery"
                   @click="toPage('gallery')" />


      <v-list-item prepend-icon="mdi-list-box"
                   active-color="white"
                   title="Todo list"
                   value="todo"
                   @click="toPage('todo')" />

      <v-list-item prepend-icon="mdi-weather-partly-cloudy"
                   active-color="white"
                   title="Weather"
                   value="weather"
                   @click="toPage('weather')" />

      <v-divider class="my-3" />

      <v-list-item prepend-icon="mdi-test-tube"
                   active-color="white"
                   title="Test page"
                   value="testpage"
                   @click="toPage('testpage')" />

    </v-list>


  </v-navigation-drawer>
</template>
