<!-- The component for the Announcement Pane (top-left) This utilizes a plug-in called tiny slider which actively slides through the created div tags beneath it. The div tags
are created dynamically through the v-for loop. They loop through all announcements currently present in the database. This also has code beneath for refreshing the slider so it dynamically updates. 
The variable 'renderSlider' which is utilized in a v-if is used. It changes to false when a new database item is loaded causing tiny slider to no longer render. It changes back to true immediately after which refreshes tiny slider.
 -->

<template>
  <section class="ticker__container" v-if="renderSlider && announcements.length">
    <client-only>
      <vue-tiny-slider ref="tinySlider"
        class="list--plain ticker"
        :items="1"
        slide-by="page"
        :controls="false"
        :nav="false"
        :autoplay-button-output="false"
        :speed="3000"
        :autoplay="true"
        :autoplay-timeout="5000"
      >
        <div class="ticker__item tns-item" :key="m.Id" v-for="m in announcements">
          <div class="testtest">{{m.message}}</div>
        </div>
      </vue-tiny-slider>
    </client-only>
  </section>
</template>

<script>

import schedule from 'node-schedule'
import Vue from 'vue'    
    export default {
        name: "Announcement",
        updated: function() {
          var that = this;
          window.test = this;

          if(!this.renderSlider)
          {
            Vue.nextTick(function(){
              that.renderSlider = true;
            });
          }
        },
        data : function(){
          return {
            numberOfSlides : 0,
            renderSlider : true,
            currentAnnouncements: [], 
          };
        },
        methods: {
          getCurrentDate: function() {
            return new Date().toJSON().slice(0,10).replace(/-/g,'-');
          },
          compareDates: function(date1, date2) {
            var d1 = Date.parse(date1);
            var d2 = Date.parse(date2);
            if (d1 <= d2) {
              return true
            } else {
              return false
            }
          },
          deleteAnnouncement(uniqueID) {
            var headers = {
              "Content-Type": "application/json"                         
            }
            var data = {
              message: this.message,
              name: this.name,
              id: uniqueID,
              date: this.startDate,
              title: this.eventTitle,
              type: this.eventType,
              startDate: this.startDate,
              endDate: this.endDate,
              startsAt: this.startDate + this.startTime,
              endsAt: this.endDate + this.endTime
            }
              fetch('http://127.0.0.1:1337/announcement', {
              method: "DELETE",
              headers: headers,
              body:  JSON.stringify(data)
            })
          },
          scheduledDatabaseMaintenance: function() {
            var self = this;
            schedule.scheduleJob('*/1 * * * *', function(){
              console.log("Announcements Called.");
              for(var i = 0; i < self.announcements.length; i++) {
                if (self.compareDates(self.announcements[i].expiresAt, self.getCurrentDate())) {
                  console.log("DELETED")
                  console.log(self.announcements[i].id)
                  self.deleteAnnouncement(self.announcements[i].id);
                  self.announcements.splice(i, i);
                }
              }
              });
          },
        },
        mounted() {
         this.scheduledDatabaseMaintenance();
        },
        watch: {
          numberOfSlides : function(val, oldVal){
            if(val != oldVal)
            {
              this.renderSlider = false;
            }
          }
        },
        computed: {
          announcements: {
            cache: false,
            get: function() {         
              this.numberOfSlides = this.$store.state.announcement.all.length;
              return this.$store
                  .state
                  .announcement
                  .all
            }
          }
        }
    }
</script>
