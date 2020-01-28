<!-- 
The component for the Announcement Pane (top left) of the grand pane.<style scoped>
This pane is used to display user-made messages as announcements to everybody as a whole. The slides
will pan through at a rate of 8000ms (8 seconds) per slide.
 -->


<template>
  <section class="ticker__container" v-if="announcements.length">
    <client-only>
      <div>
        <carousel>
          <slide>
            Slide 1 Content
          </slide>
          <slide>
            Slide 2 Content
          </slide>
        </carousel>
      </div>
    </client-only>
  </section>
</template>  
<script>
    import FormButton from "../components/childComponents/FormButton";
    
    export default {
        name: "Announcement",
        components: {
        },
        computed: {
          announcements() {
            return this.$store
                .state
                .announcement
                .all
          },
        }
    }
</script>

<style scoped>

</style>
