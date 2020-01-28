<template>
  <div class="ticker__item in--sidebar padding--a--s noBorder">
     <span class="birthdayItems" v-for="m in birthdays">
      <p v-if="getDate() == m.date"> Happy Birthday {{m.name}}! </p>
      <img class="cakeImage" v-if="getDate() == m.date" src="/funPicture.png">  
    </span>
  </div>
</template>

<script>
    export default {
        name: "Birthdays",
        data() {
          return {
            active: false,
            sortedItems: [],
          }
        },
        methods: {
          getDate: function() {
            return new Date().toJSON().slice(0,10).replace(/-/g,'-');
          },
          organizeData: function() {
            return birthdays
          }
        },
        mounted() {
        },
       computed: {
          birthdays : {
            cache: false,
            get: function() {      
              let all = this.$store
                  .state
                  .birthday
                  .all
              return all
            }
          }
        }
    }
</script>

<style scoped>
.noBorder {
  background-color:rgb(142, 142, 142);
  color: black;
  font-size: 2.0em;
  height: 10%;
}

.birthdayItems {
  font-size: 1.02em;
  position: relative;
  margin-left: 0.8em;
  margin-bottom: 0px;
  display: flex;
  text-align: center;
  font-weight: bold;
}
.cakeImage {
  width: 3em;
  height: 3em;
  left: 5em;
  margin-left: 1.0em;
  margin-right: 1.0em;
}
</style>
