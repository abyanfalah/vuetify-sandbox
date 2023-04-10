<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { ref, watch } from 'vue';

const emits = defineEmits(['closeColorPicker']);

const store = useTodoappStore();


</script>

<template>
  <v-card elevation="5"
          class="mt-3 rounded">
    <v-color-picker hide-canvas
                    hide-inputs
                    hide-sliders
                    elevation="0"
                    width="100%"
                    class="border-black"
                    v-model="store.selectedTaskGroup.color"
                    show-swatches>asdfa</v-color-picker>

    <v-toolbar class="d-flex justify-space-between">
      <v-btn icon="mdi-chevron-up"
             @click="emits('closeColorPicker')"></v-btn>
    </v-toolbar>
  </v-card>
</template>
