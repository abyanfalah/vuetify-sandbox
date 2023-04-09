<script setup>
import { ref } from 'vue';

const props = defineProps(['btnColor']);

const model = ref(false);

function onScroll() {
  model.value = window.scrollY > 200;
}

function onClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<template>
  <v-layout-item v-scroll="onScroll"
                 class="text-end"
                 model-value
                 position="bottom"
                 size="88">
    <div class="ma-4">
      <v-slide-y-reverse-transition>
        <v-btn v-show="model"
               :color="btnColor"
               elevation="8"
               icon="mdi-chevron-up"
               @click="onClick" />
      </v-slide-y-reverse-transition>
    </div>
  </v-layout-item>
</template>
