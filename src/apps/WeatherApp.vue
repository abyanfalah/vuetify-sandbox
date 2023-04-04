<script setup>
import { onMounted, ref, watch } from 'vue';
import weatherService from '../services/weatherApi';
import ProgressCircular from '@/components/ProgressCircular.vue';
import { computed } from '@vue/reactivity';

const locationQuery = ref();
const weatherData = ref();
const isSearching = ref(false);
const location = ref({});
const isCelsius = ref(true);
const isShowingDetails = ref(false);
const isError = ref(null);

const tempColor = computed(() => {
  if (!weatherData.value || !Object.keys(weatherData.value).length) return 'white';

  const temperature = weatherData.value.current.temp_c;

  const coldWeather = temperature < 20;
  const normalWeather = temperature < 30;

  if (coldWeather) return 'blue';

  if (normalWeather) return 'green';

  return 'red';
});

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
    isShowingDetails.value = false;
  } catch (err) {
    console.error("error nih", err);
    weatherData.value = null;
    isError.value = err.response.data.message;
    isSearching.value = false;
  }
}

const states = (() => {
  return {
    locationQuery: locationQuery.value,
    weatherData: weatherData.value,
    location: location.value,
    isCelsius: isCelsius.value,
    isShowingDetails: isShowingDetails.value

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
  <div class="h-100"
       :class="`bg-${tempColor}-lighten-2`">
    <v-app-bar title="Weather app"
               :class="`bg-${tempColor}-lighten-2`"
               flat>
      <template v-slot:append>
        <v-switch density="comfortable"
                  hide-details
                  v-model="isCelsius"
                  append-icon="mdi-temperature-celsius"
                  prepend-icon="mdi-temperature-fahrenheit"></v-switch>

      </template>
    </v-app-bar>


    <v-container>

      <!-- locationQuery input -->
      <v-row>
        <v-col cols="5"
               class="mx-auto">
          <v-text-field :color="`${tempColor}`"
                        bg-color="white"
                        label="Search location"
                        placeholder="e.g. Tokyo"
                        v-model="locationQuery"
                        append-inner-icon="mdi-magnify"
                        @click:append-inner="getWeatherData"
                        @keydown.enter="getWeatherData"
                        clear-icon="mdi-close-circle"
                        clearable
                        autofocus
                        density="comfortable"
                        hint="city, zip code, coordinate, or 'auto:ip'"></v-text-field>
        </v-col>
      </v-row>

      <!-- weather and temperature -->
      <v-row>
        <v-col align="center">
          <!-- when searching in progress -->
          <ProgressCircular v-if="isSearching"
                            size="128"
                            width="12"
                            class="ma-16" />

          <!-- if got the data -->
          <v-card v-else-if="weatherData"
                  max-width="800px"
                  :elevation="isError || isSearching ? 0 : '16'"
                  class="pa-10">

            <div class="d-flex flex-column align-center">
              <v-row class="d-flex align-center">

                <!-- hero weather data -->
                <v-col class="d-flex flex-column align-center">
                  <span class="text-h3">
                    {{ location.name }} <img :src="weatherData.current.condition.icon"
                         alt="">
                  </span>
                  <span class="text-grey">
                    {{ `${location.region}, ${location.country}` }}
                  </span>

                  <div class="text-h1 my-10">
                    <span v-if="isCelsius">
                      {{ weatherData.current.temp_c }}
                      <sup>
                        <small>°C</small>
                      </sup>
                    </span>

                    <span v-else>
                      {{ weatherData.current.temp_f }}
                      <sup>
                        <small>°F</small>
                      </sup>
                    </span>
                  </div>

                  <span class="text-h5">
                    {{ weatherData.current.condition.text }}
                  </span>

                  <v-btn class="mt-5"
                         :color="tempColor"
                         :variant="isShowingDetails ? 'outlined' : 'tonal'"
                         @click="isShowingDetails = !isShowingDetails">details</v-btn>
                </v-col>

                <!-- weather details -->
                <v-scroll-x-transition>
                  <v-col v-show="isShowingDetails"
                         transition="fade-transition"
                         cols="6">
                    {{ weatherData }}
                  </v-col>
                </v-scroll-x-transition>
              </v-row>
            </div>


          </v-card>

          <!-- else, if error -->
          <v-alert v-else-if="isError"
                   closable
                   width="400px"
                   v-model="isError"
                   title="Cannot get weather data"
                   type="error">

            {{ isError }}
          </v-alert>
        </v-col>

      </v-row>
    </v-container>


  </div>
</template>
