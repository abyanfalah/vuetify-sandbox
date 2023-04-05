<script setup>
const emit = defineEmits(['confirmDelete', 'cancelDelete']);
const props = defineProps(['taskGroup']);

</script>

<template>
  <v-dialog persistent
            width="auto">
    <v-card class="pa-4">
      <v-card-text>
        <p>
          Delete this task group?
        </p>
        <span class="text-grey text-caption">You will never see this task group anymore.</span>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-around">
        <v-btn variant="outlined"
               color="red"
               @click="emit('confirmDelete', props.taskGroup)">Yes</v-btn>
        <v-btn @click="emit('cancelDelete')">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
