<!-- The component for the bottom sliding alerts. -->

<!-- The template for the component. This template formats the event item using spiral robots CSS and HTML -->
<template>
  <div class="tckr-wrap">
    <div class="tckr">
      <div :key="m.id" v-for="m in alerts" class="tckr__item">{{m.message}}</div>
    </div>
    <div v-if="m.severity == 'High'" :key="m.id" v-for="m in alerts" class="highAlert">
      <div class="highAlertMessage">
        {{ m.message }}
        <div class="highAlertMessageDate">
          Nov. 22-25
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
  }
};
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>
  .highAlert {
    position: absolute;
    left: 0;
    bottom: 9.0em;
    width: 100%;
    overflow: hidden;
    height: 6.5rem;
    padding-left: 100%;
    box-sizing: content-box;
    background-color: red;
    height: 8%;
    z-index: 10000 !important;
  }
  .highAlertMessage {
    position: fixed;
    left: 0;
    font-size: 3.0em;
    width: 100%;
    height: 7.5em;
    padding-left: 1.0em;
    background-color: red;
  }
  .highAlertMessageDate {
    color: yellow;
  }
</style>
