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
