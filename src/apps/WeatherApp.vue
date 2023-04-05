<script setup>
import { onMounted, ref, watch } from 'vue';
import weatherService from '../services/weatherApi';
import ProgressCircular from '@/components/ProgressCircular.vue';
import { computed } from '@vue/reactivity';
import upperize from 'capitalize';

const locationQuery = ref();

const weatherData = ref();
const currentWeather = ref({});
const location = ref({});

const isSearching = ref(false);
const isCelsius = ref(true);
const isShowingDetails = ref(false);
const isError = ref(null);
let lastHour;


const tempColor = computed(() => {
  if (!currentWeather.value || !Object.keys(currentWeather.value).length) return 'white';

  const temperature = currentWeather.value.temperature_2m;

  const coldWeather = temperature < 20;
  const fairWeather = temperature < 25;
  const normalWeather = temperature < 30;

  if (coldWeather) return 'blue';
  if (fairWeather) return 'green';
  if (normalWeather) return 'yellow';
  return 'red';
});

async function getWeatherData() {
  if (!locationQuery.value) {
    return;
  }

  locationQuery.value = locationQuery.value.trim();

  isSearching.value = true;
  try {
    const response = await weatherService.getWeather(locationQuery.value);
    console.log(response);

    weatherData.value = response.data;

    const weather = {
      hourly: weatherData.value.hourly,
      hourly_units: weatherData.value.hourly_units,
    };

    const currentHour = new Date().getHours();
    lastHour = currentHour;

    for (const aspect in weather.hourly) {
      currentWeather.value[aspect] = weather.hourly[aspect][currentHour];
      currentWeather.value[`${aspect}_unit`] = weather.hourly_units[aspect];
    }
    console.log("current weather =====", currentWeather.value);

    location.value = weatherData.value.address;
    if (!location.value.city && !location.value.town) {
      location.value.city = upperize.words(locationQuery.value);
    }

    console.log('location', location.value);

    isShowingDetails.value = false;
  } catch (err) {
    console.error("error nih", err);
    weatherData.value = null;
    currentWeather.value = null;
    isError.value = err;
  } finally {
    isSearching.value = false;
  }
}

function toFahrenheit(n) {
  return (n * 1.8) + 32;
}

const states = (() => {
  return {
    locationQuery: locationQuery.value,
    weatherData: weatherData.value,
    location: location.value,
    isCelsius: isCelsius.value,
    isShowingDetails: isShowingDetails.value,
    currentWeather: currentWeather.value,
    lastHour,

  };

});

watch(states, (newState) => {
  localStorage.setItem("weatherApp", JSON.stringify(newState));
});

onMounted(() => {
  restoreStates();
});

function restoreStates() {
  // restore states
  const storedState = JSON.parse(localStorage.getItem("weatherApp"));
  location.value = storedState.location ?? location.value;
  locationQuery.value = storedState.locationQuery ?? locationQuery.value;
  weatherData.value = storedState.weatherData ?? weatherData.value;
  currentWeather.value = storedState.currentWeather ?? currentWeather.value;
  isCelsius.value = storedState.isCelsius ?? isCelsius.value;
  lastHour = storedState.lastHour;


  // get last location's weather when 1 hour has passed by
  const currentHour = new Date().getHours();
  if (currentHour > lastHour) {
    getWeatherData();
  }
}

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
                        hint="Use city name for better result"></v-text-field>
        </v-col>
      </v-row>

      <!-- weather and temperature -->
      <v-row>
        <v-col align="center">
          <!-- when searching in progress -->
          <ProgressCircular v-if="isSearching"
                            size="128"
                            width="12"
                            :color="weatherData ? 'white' : 'primary'"
                            class="ma-16" />

          <!-- if got the data -->
          <v-card v-else-if="weatherData && currentWeather"
                  max-width="800px"
                  :elevation="isError || isSearching ? 0 : '16'"
                  class="pa-10">

            <div class="d-flex flex-column align-center">
              <v-row class="d-flex align-center">

                <!-- hero weather data -->
                <v-col class="d-flex flex-column align-center">
                  <span class="text-h3">
                    {{ location.city ?? location.town }}
                  </span>
                  <span class="text-grey">
                    {{ `${(location.state ?? location.region ?? location.province ?? location.city)}, ${location.country}` }}
                  </span>

                  <div class="text-h1 my-10">
                    <span v-if="isCelsius">
                      {{ parseFloat(currentWeather.temperature_2m).toFixed(1) }}
                      <sup>
                        <small>°C</small>
                      </sup>
                    </span>

                    <span v-else>
                      {{ toFahrenheit(parseFloat(currentWeather.temperature_2m)).toFixed(1) }}
                      <sup>
                        <small>°F</small>
                      </sup>
                    </span>
                  </div>

                  <span class="text-h5">
                    {{ weatherService.getWeatherName(currentWeather.weathercode) }}
                  </span>

                  <v-btn class="mt-5"
                         :color="`${tempColor} `"
                         :icon="`mdi-chevron-${isShowingDetails ? 'left' : 'right'}`"
                         @click="isShowingDetails = !isShowingDetails"></v-btn>
                </v-col>

                <!-- weather details -->
                <v-scroll-x-transition>
                  <v-col v-show="isShowingDetails"
                         transition="fade-transition"
                         cols="6">
                    {{ currentWeather }}
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
