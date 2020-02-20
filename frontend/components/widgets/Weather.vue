<!-- 
    Weather.Vue is a right hand side widget. This component is used for displaying the current weather from an API (openweather). The 
    component is used to fetch information from the API using a key. The Fetch API method is then scheduled to repeat at a certain interval 
    set in in the methods below. The current date is displayed in a method below as well.
 -->

<!-- The template for the component. This template formats the event item using spiral robots CSS and HTML -->
<template>
  <div class="ticker__item in--sidebar padding--a--s noBorder containerColor">
    <p class="weatherData">Overcast: {{ this.overcast }}</p>
    <p class="weatherData">Temperature: {{ this.temperature }}°C</p>
    <p class="weatherData">Feels Like: {{ this.temperatureFeelsLike }}°C</p>
    <span class="weatherData dateHeader">{{ this.currentDate }}</span>
  </div>
</template>

<!-- The scripts for the component. This script contains data attributes and methods for this component. -->
<script>
import schedule from "node-schedule";
export default {
  name: "Weather",
  data() {
    return {
      currentDate: "",
      apiKey: "2917c463cf5bbabd5602c2e4c6e388a8",
      temperature: "",
      temperatureFeelsLike: "",
      overcast: ""
    };
  },
  methods: {
    // getDate() will retrieve the date in a format that looks nice.
    getDate: function() {
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      var today = new Date();
      var hours = today.getHours();
      var minutes = today.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      var dateTime = today.toLocaleDateString("en-US", options) + " " + strTime;
      return dateTime;
    },

    // weatherAPICall() will request the weather from openweather. The apiKey attached to our account is used here for verification.
    weatherAPICall: function() {
      fetch(
        "http://api.openweathermap.org/data/2.5/forecast?id=5969785&APPID=2917c463cf5bbabd5602c2e4c6e388a8",
        {
          method: "GET"
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.temperature = Math.round(jsonData.list[0].main.temp - 273.15);
          this.temperatureFeelsLike = Math.round(
            jsonData.list[0].main.feels_like - 273.15
          );
          this.overcast = jsonData.list[0].weather[0].main;
        });
    },

    // scheduledWeatherAPICall() will repeat the given function on a given schedule.
    scheduledWeatherAPICall: function() {
      var self = this;
      schedule.scheduleJob("*/1 * * * *", function() {
        console.log("Weather Called.");
        self.weatherAPICall();
      });
    },

   // scheduleTimeUpdate() will repeat the given function on a given schedule.
    scheduleTimeUpdate: function() {
      var self = this;
      schedule.scheduleJob("*/1 * * * * *", function() {
        self.currentDate = self.getDate();
      });
    }
  },

  // Initializing the module by giving the starting values for the weather and time, and starting the scheduled API Calls.
  mounted() {
    this.weatherAPICall();
    this.currentDate = this.getDate();
    this.scheduledWeatherAPICall();
    this.scheduleTimeUpdate();
  }
};
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>
  .weatherData {
    margin: 0;
    padding: 0;
    font-size: 1.3em;
  }
  .containerColor {
    background-color: rgb(102, 102, 102);
    color: white;
    font-size: 2em;
    position: relative;
  }
  .dateHeader {
    background-color: rgb(64, 64, 64);
    color: rgb(184, 184, 184);
    text-align: center;
    height: 20%;
    font-size: 1.3em;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: auto;
  }
  .weatherImage {
    height: 4em;
    width: 8em;
  }
</style>
