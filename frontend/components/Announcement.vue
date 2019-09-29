<template>
  <div class="tckr-wrap">
    <div class="tckr">
      <div v-for="m in announcements" class="tckr__item">{{m.message}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        computed: {
            announcements() {
                return this.$store
                    .state
                    .announcement
                    .all
            }
        }
    }
</script>
