<script setup>
import { onMounted, ref, watch } from 'vue';
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

const states = (() => {
  return {
    locationQuery: locationQuery.value,
    weatherData: weatherData.value,
    location: location.value

  };

});

watch(states, (newState) => {
  localStorage.setItem("weatherApp", JSON.stringify(newState));
});

onMounted(() => {
  const storedState = JSON.parse(localStorage.getItem("weatherApp"));
  location.value = storedState.location ?? location.value;
  locationQuery.value = storedState.locationQuery ?? locationQuery.value;
  weatherData.value = storedState.weatherData ?? weatherData.value;
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
          <v-sheet elevation="4"
                   class="rounded">
            <v-text-field label="Search location"
                          placeholder="e.g. Tokyo"
                          v-model="locationQuery"
                          append-inner-icon="mdi-magnify"
                          @click:append-inner="getWeatherData"
                          @keydown.enter="getWeatherData"
                          clear-icon="mdi-close-circle"
                          clearable
                          autofocus
                          density="compact"
                          hint="city, zip code, coordinate, or 'auto:ip'"></v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <!-- weather and temperature -->
      <v-row>
        <v-col class="mx-auto">
          <v-container align="center">
            <ProgressCircular v-if="isSearching" />
            <div v-else-if="weatherData"
                 class="d-flex flex-column align-center">

              <v-row>
                <v-col class="d-flex flex-column align-center">
                  <span class="text-h3">
                    {{ location.name }} <img :src="weatherData.current.condition.icon"
                         alt="">
                  </span>
                  <span class="text-grey">
                    {{ `${location.region}, ${location.country}` }}
                  </span>

                  <div class="text-h1 my-10">
                    {{ weatherData.current.temp_c }} C
                  </div>

                  <span class="text-h5">
                    {{ weatherData.current.condition.text }}
                  </span>
                </v-col>

                <!-- <v-col>
                                                                                                                    {{ weatherData.current }}
                                                                                                                  </v-col> -->
              </v-row>



            </div>
          </v-container>
        </v-col>
      </v-row>

      <!-- other details -->
      <div v-if="weatherData">
        <!-- {{ weatherData.current }} -->
      </div>
    </v-container>


  </div>
</template>
