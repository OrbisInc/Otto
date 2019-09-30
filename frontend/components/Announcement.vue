<template>
  <section class="ticker__container" v-if="announcements.length">
    <client-only>
      <vue-tiny-slider
        class="list--plain ticker"
        :item="1"
        slide-by="page"
        :controls="false"
        :nav="false"
        :autoplay-button-output="false"
        :speed="3000"
        :autoplay="true"
        :autoplay-timeout="5000"
      >
        <div class="ticker__item" v-for="m in announcements">
          <div>{{m.message}}</div>
        </div>
      </vue-tiny-slider>
    </client-only>
  </section>
</template>

<script>
    export default {
        name: "Announcement",
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
