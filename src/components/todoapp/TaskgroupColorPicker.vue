<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { ref, watch } from 'vue';

const emits = defineEmits(['closeColorPicker']);

const store = useTodoappStore();


</script>

<template>
  <v-card elevation="5"
          max-width="400px"
          class="mt-3 rounded mx-auto">
    <v-toolbar class="d-flex justify-space-between"
               height="30">

      <v-btn icon="mdi-close"
             size="small"
             class="ms-auto"
             @click="emits('closeColorPicker')"></v-btn>
    </v-toolbar>
    <v-color-picker hide-canvas
                    hide-inputs
                    hide-sliders
                    elevation="0"
                    width="100%"
                    class="border-black"
                    v-model="store.selectedTaskGroup.color"
                    show-swatches>asdfa</v-color-picker>


  </v-card>
</template>
