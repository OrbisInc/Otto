<!-- The component for the bottom sliding alerts. -->

<!-- The template for the component. This template formats the event item using spiral robots CSS and HTML -->
<template>
  <div class="tckr-wrap">
    <div class="tckr">
      <div :key="m.id" v-for="m in alerts" class="tckr__item">{{m.message}}</div>
    </div>
    <div v-if="m.severity == 'High'" :key="m.id" v-for="m in alerts" class="highAlert">
      <div class="highAlertMessageContainer">
        <div class="highAlertMessage">{{ m.message }}</div>
        <div class="highAlertMessageDate">{{m.highAlertDate}} EGG</div>
      </div>
      <div class="highAlertSymbol"></div>
    </div>
  </div>
</template>

<!-- The scripts for the component. This script contains data attributes and methods for this component. -->
<script>
export default {
  name: "Alert",
  methods: {
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
    deleteAnnouncement(uniqueID) {
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
      fetch(this.hostURL + "announcement", {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data)
      });
    },
    scheduledDatabaseMaintenance: function() {
      var self = this;
      schedule.scheduleJob("*/1 * * * *", function() {
        console.log("Announcements Called.");
        for (var i = 0; i < self.announcements.length; i++) {
          if (
            self.compareDates(
              self.announcements[i].expiresAt,
              self.getCurrentDate()
            )
          ) {
            console.log("DELETED");
            console.log(self.announcements[i].id);
            self.deleteAnnouncement(self.announcements[i].id);
            self.announcements.splice(i, i);
          }
        }
      });
    }
  },
  mounted() {},
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
  font-size: 10em;
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
