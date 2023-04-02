<script setup>
import { ref } from 'vue';
import weatherService from '../services/weatherApi';
import ProgressCircular from '@/components/ProgressCircular.vue';

const locationQuery = ref();
const weatherData = ref();
const isSearching = ref(false);
const location = ref({});


async function getWeatherData() {
  if (!locationQuery.value) {
    return;
  }

  isSearching.value = true;
  try {
    const response = await weatherService(locationQuery.value);
    weatherData.value = response.data;
    location.value = weatherData.value.location;

    isSearching.value = false;
  } catch (err) {
    console.error(err);
    isSearching.value = false;
  }
}

const state = (() => {
  return {
    locationQuery: locationQuery.value,

  };
})

</script>

<template>
  <div>
    <h1>Weather App</h1>
    <v-container>

      <!-- locationQuery input -->
      <v-row>
        <v-col cols="4"
               class="mx-auto">
          <v-text-field label="Search location"
                        placeholder="e.g. Tokyo"
                        v-model="locationQuery"
                        append-inner-icon="mdi-magnify"
                        @click:append-inner="getWeatherData"
                        @keydown.enter="getWeatherData"
                        clear-icon="mdi-close-circle"
                        clearable></v-text-field>
        </v-col>
      </v-row>

      <!-- weather and temperature -->
      <v-row>
        <v-col class="mx-auto">
          <v-container align="center">
            <ProgressCircular v-if="isSearching" />
            <div v-else-if="weatherData"
                 class="d-flex flex-column align-center">

              <span class="text-h3">
                {{ location.name }}
              </span>

              <span>
                {{ `${location.region}, ${location.country}` }}
              </span>

              <img :src="weatherData.current.condition.icon"
                   width="300"
                   alt="">

              <span>
                {{ weatherData.current.condition.text }}
              </span>
            </div>
          </v-container>
        </v-col>
      </v-row>

      <!-- other details -->
      <div v-if="weatherData">
        {{ weatherData.current }}
      </div>
    </v-container>


  </div>
</template>
