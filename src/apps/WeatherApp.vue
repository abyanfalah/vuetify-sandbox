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

const tempColor = computed(() => {
  if (!weatherData.value) return 'white';

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
  <div class="h-100"
       :class="`bg-${tempColor}-lighten-2`">
    <v-app-bar title="Weather app"
               flat>
      <template v-slot:append>
        <v-switch density="comfortable"
                  hide-details
                  v-model="isCelsius"
                  :color="isCelsius ? 'green' : 'yellow'"
                  prepend-icon="mdi-temperature-celsius"
                  append-icon="mdi-temperature-fahrenheit"></v-switch>

      </template>
    </v-app-bar>


    <v-container>

      <!-- locationQuery input -->
      <v-row>
        <v-col cols="4"
               class="mx-auto">
          <v-text-field color="blue"
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
        <v-col>
          <v-card align="center"
                  elevation="24"
                  max-width="700px"
                  class="pt-5 pb-10 mx-auto">
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
                    {{ weatherData.current.temp_c }} <sup>
                      <small class="font-weight">°C</small>
                    </sup>
                  </div>

                  <span class="text-h5">
                    {{ weatherData.current.condition.text }}
                  </span>
                </v-col>
              </v-row>



            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- other details -->
      <div v-if="weatherData">
        {{ weatherData.current }}
      </div>
    </v-container>


  </div>
</template>
