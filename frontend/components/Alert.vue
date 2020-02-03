<!-- The component for the bottom sliding alerts. -->

<!-- The template for the component. This template formats the event item using spiral robots CSS and HTML -->
<template>
  <div class="tckr-wrap">
    <div class="tckr">
      <div v-for="m in alerts" class="tckr__item">{{m.message}}</div>
    </div>
  </div>
</template>

<!-- The scripts for the component. This script contains data attributes and methods for this component. -->
<script>
export default {
  computed: {
    alerts() {
      return this.$store.state.alert.all;
    }
  }
};
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>
.alertButtonTest {
  position: absolute;
  left: 0px;
  height: 65px !important;
  width: 60px !important;
  margin: auto;
  border-radius: 30% !important;
  z-index: 100;
}
</style>
