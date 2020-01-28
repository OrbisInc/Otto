<template>
  <div class="ticker__item in--sidebar padding--a--s noBorder containerColor">
    <p class="weatherData"> Overcast: {{ this.overcast }} </p>
    <p class="weatherData"> Temperature: {{ this.temperature }}°C </p>
    <p class="weatherData"> Feels Like: {{ this.temperatureFeelsLike }}°C </p>
    <img class="weatherImage" src="/Clouds.png"> 
    <span class="weatherData dateHeader"> {{this.currentDate}} </span>
    </div>
</template>

<script>
    import schedule from 'node-schedule'

    let dt = new Date()
    export default {
        name: "Weather",
        data() {
          return {
            currentDate: '',
            apiKey: '2917c463cf5bbabd5602c2e4c6e388a8',
            temperature: '',
            temperatureFeelsLike: '',
            overcast: '',
          }
        },
         methods: {
          getDate: function() {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var today  = new Date();

            return today.toLocaleDateString("en-US", options);
          },
          weatherAPICall: function() {
              fetch('http://api.openweathermap.org/data/2.5/forecast?id=5969785&APPID=2917c463cf5bbabd5602c2e4c6e388a8', {
                method: 'GET'
            })  
              .then((response) => {
                return response.json();
              })
              .then((jsonData) => {
                this.temperature = Math.round((jsonData.list[0].main.temp) - 273.15)
                this.temperatureFeelsLike = Math.round((jsonData.list[0].main.feels_like) - 273.15)
                this.overcast = jsonData.list[0].weather[0].main
              })
          },
          scheduleDate: function() {
            // schedule.scheduleJob('54 * * * *', function(){
            //     console.log(window);
            //     console.log("Called.");
            //     this.weatherAPICall();
            //     this.currentDate = this.getDate();
            //   });
             setInterval(() => {
               console.log("Weather Called");
               this.weatherAPICall();
             }, 100000);
          }
        },
        mounted() {
          this.weatherAPICall();
          this.currentDate = this.getDate();
          this.scheduleDate();
        }
    }
</script>

<style scoped>
.weatherData {
  margin: 0;
  padding: 0;
  font-size: 0.7em;
}
.containerColor {
  background-color:rgb(102, 102, 102);
  color: white;
  font-size: 1.4em;
  position: relative;
}
.dateHeader {
  background-color:rgb(64, 64, 64);
  color: rgb(184, 184, 184);
  text-align: center;
  height: 20%;
  font-size: 1.0em;
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
