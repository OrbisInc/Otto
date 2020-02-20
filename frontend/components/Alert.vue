<!-- The component for the bottom sliding alerts. -->

<!-- The template for the component. This template formats the event item using spiral robots CSS and HTML -->
<template>
  <div class="tckr-wrap">
    <div class="tckr">
      <div :key="m.id" v-for="m in alerts" class="tckr__item">{{m.message}}</div>
    </div>
    <div v-if="m.severity == 'High'" :key="m.id" v-for="m in alerts" class="highAlert">
      <div class="highAlertMessageContainer">
        <div class="highAlertMessage"> 
          {{ m.message }}
        </div>
        <div class="highAlertMessageDate">
          {{m.highAlertDate}} EGG
        </div>
      </div>
      <div class="highAlertSymbol">
      </div>
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
  },
  watch: {
    alerts() {
      console.log(this.alerts);
    }
  }
};
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>
  .highAlert {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    height: 6.5rem;
    padding-left: 100%;
    box-sizing: content-box;
    background-color: red;
    height: 100%;
    z-index: 101 !important;
  }
  .highAlertMessageContainer {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 0.5em;
    margin-left: 0.5em;
    z-index: 10000 !important;
    margin-bottom: 0.85em;
  }
  .highAlertMessageDate {
    position: absolute;
    bottom: -50px;
    font-size: 0.6em;
    left: 0;
    color: yellow;
    z-index: 10001 !important;
  }

  .tckr-wrap {
    height: 9%;
    z-index: -300;
    font-size: 10.0em;
    display: relative;
  }

  .tckr__item {
    font-size: 1.05em;
    margin: auto;
    padding: auto;
    display: inline-block;
    vertical-align: center;
    text-align: center;

  }
</style>
