<!-- 
    Deployment.vue is for the Deployment Pane (top-right) This utilizes a plug-in called tiny slider which actively slides through the created div tags beneath it.
    The div tags are created dynamically through the v-for loop. They loop through all announcements currently present in the database. This also has code 
    beneath for refreshing the slider so it dynamically updates. The variable 'renderSlider' which is utilized in a v-if is used to do this.
    It changes to false when a new database item is loaded causing tiny slider to no longer render. It changes back to true immediately after which refreshes tiny slider.
 -->
<template>
  <section class="ticker__container" v-if="renderSlider && deploymentFormatted.length">
    <client-only>
      <vue-tiny-slider
        ref="tinySlider"
        class="list--plain ticker"
        :items="1"
        slide-by="page"
        :controls="false"
        :nav="true"
        :autoplay-button-output="false"
        :speed="3000"
        :autoplay="true"
        :autoplay-timeout="5000"
      >
        <div class="ticker__item tns-item" :key="m.Id" v-for="m in deploymentFormatted">
          <div class="testtest">
            {{m.deploymentDate}}
            <br />
            {{m.school}}
            <br />
            {{ m.message}}
          </div>
        </div>
      </vue-tiny-slider>
    </client-only>
  </section>
</template>

<script>
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  import schedule from "node-schedule";
  import Vue from "vue";

  export default {
    name: "Deployment",
    props: ["url"],
    updated: function() {
      var that = this;
      window.test = this;

      if (!this.renderSlider) {
        Vue.nextTick(function() {
          that.renderSlider = true;
        });
      }
    },
    data: function() {
      return {
        hostURL: this.url,
        numberOfSlides: 0,
        renderSlider: true,
        dissectedDate: "",
        deploymentFormatted: []
      };
    },
    methods: {
      // These two methods are helper methods used in the methods below.
      getCurrentDate: function() {
        return new Date()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "-");
      },
      compareDates: function(date1, date2) {
        var d1 = Date.parse(date1);
        var d2 = Date.parse(date2);
        if (d1 <= d2) {
          return true;
        } else {
          return false;
        }
      },

      // createFormattedDeploymentArray() will format the dates so they are more pleasing to the eye.
      createFormattedDeploymentArray: function() {
        let intermittentArray = [];
        intermittentArray = JSON.parse(JSON.stringify(this.deployments));
        for (var i = 0; i < intermittentArray.length; i++) {
          if (intermittentArray[i].deploymentDate != "TBD") {
            let splitDate = intermittentArray[i].deploymentDate.split("-");
            let year = splitDate[0];
            let month = monthNames[splitDate[1].replace("0", "") - 1];
            let day = splitDate[2];
            intermittentArray[i].deploymentDate = month + " " + day + " " + year;
          }
        }
        return intermittentArray;
      },

    // deleteDeployment() uses an AJAX fetch to delete something in the database. It is called in the scheduler below.
      deleteDeployment(uniqueID) {
        var headers = {
          "Content-Type": "application/json"
        };
        var data = {
          message: this.message,
          name: this.name,
          id: uniqueID,
          date: this.startDate,
          title: this.eventTitle,
          startDate: this.startDate,
          endDate: this.endDate,
          startsAt: this.startDate + this.startTime,
          endsAt: this.endDate + this.endTime
        };
        fetch(this.hostURL + "deployment", {
          method: "DELETE",
          headers: headers,
          body: JSON.stringify(data)
        });
      },

      // scheduledDatabaseMaintenance() will repeat the given function on a given schedule.
      scheduledDatabaseMaintenance: function() {
        var self = this;
        schedule.scheduleJob("*/1 * * * *", function() {
          console.log("Deployments Called.");
          for (var i = 0; i < self.deployments.length; i++) {
            if (
              self.compareDates(
                self.deployments[i].expiresAt,
                self.getCurrentDate()
              )
            ) {
              console.log("DELETED");
              console.log(self.deployments[i].id);
              self.deleteDeployment(self.deployments[i].id);
              self.deployments.splice(i, i);
            }
          }
        });
      }
    },
    mounted() {
      this.scheduledDatabaseMaintenance();
    },
    watch: {
      deployments() {
        this.deploymentFormatted = this.createFormattedDeploymentArray();
      },
      numberOfSlides: function(val, oldVal) {
        if (val != oldVal) {
          this.renderSlider = false;
        }
      }
    },
    computed: {
      deployments: {
        cache: false,
        get: function() {
          this.numberOfSlides = this.$store.state.deployment.all.length;
          return this.$store.state.deployment.all;
        }
      }
    }
  };
</script>

<style scoped>
  .ticker__item,
  .tns-item {
    align-content: center;
  }
</style>
