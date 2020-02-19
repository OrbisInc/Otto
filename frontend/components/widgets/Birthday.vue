<!-- This Birthday widget is placed on the right hand side at the very top under weather. It will check the database of Birthdays to see if one is active today. -->

<!-- The template for the component. This template formats the birthday using spiral robots CSS and HTML -->
<template>
    <div class="ticker__item in--sidebar padding--a--s noBorder">
        <span class="birthdayItems" :key="m.id" v-for="m in birthdays">
          <p v-if="getDate() == m.date">Happy Birthday {{m.name}}!</p>
          <img class="cakeImage" v-if="getDate() == m.date" src="/funPicture.png" />
        </span>
    </div>
</template>

<!-- The scripts for the component. This script contains a few data attributes and methods for this component. -->
<script>
export default {
  name: "Birthdays",
  data() {
    return {
      active: false,
      sortedItems: []
    };
  },
  methods: {
    getDate: function() {
      return new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
    },
  },
  mounted() {},
  computed: {
    birthdays: {
      cache: false,
      get: function() {
        let all = this.$store.state.birthday.all;
        return all;
      }
    }
  }
};
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>
.noBorder {
  background-color: rgb(142, 142, 142);
  color: black;
  font-size: 2em;
  height: 10%;
}

.birthdayItems {
  font-size: 1.5em;
  position: relative;
  margin-left: 0.8em;
  margin-bottom: 0px;
  display: flex;
  text-align: center;
  font-weight: bold;
}
.birthdayItems p {
  margin: auto;
}
.cakeImage {
  width: 3em;
  height: 3em;
  left: 5em;
  margin-left: 1em;
  margin-right: 1em;
}
</style>
