<script setup>
const emit = defineEmits(['confirmRandomize', 'cancelRandomize']);
</script>

<template>
  <v-dialog persistent
            width="auto">
    <v-card class="pa-4">
      <v-card-text>
        <p>
          Randomize the images?
        </p>
        <span class="text-grey text-caption">You probably won't see these images anymore.</span>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-around">
        <v-btn variant="outlined"
               color="red"
               @click="emit('confirmRandomize')">Yes</v-btn>
        <v-btn @click="emit('cancelRandomize')">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
