<!-- The component for the bottom sliding alerts. 
 -->


<template>
  <div class="tckr-wrap">
    <div class="tckr">
      <div v-for="m in alerts" class="tckr__item">{{m.message}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        computed: {
            alerts() {
                return this.$store
                    .state
                    .alert
                    .all
            }
        }
    }
</script>

<style scoped>
.alertButtonTest{
  position: absolute;
  left: 0px;
  height: 65px !important; 
  width: 60px !important;
  margin: auto;
  border-radius: 30% !important;
  z-index: 100;
}
</style>
