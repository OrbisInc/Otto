<!-- The component widget for the events pane (bottom of the Right hand side). This component is used for displaying an event from
the database. There are multiple methods used here. Some of the methods are helper methods for simple use such as getting dates - the other methods are to construct
a series of arrays to display the data in the way that we want.
 -->

<!-- The template for the component. This template formats the event item using spiral robots CSS and HTML -->
<template>
  <div class="ticker__item in--sidebar padding--a--s noBorder">
    <p>Happening Today:</p>
    <span v-if="this.events.length">
      <span v-if="currentEvents.length" v-for="m in currentEvents">
        <EventItem
          v-if="currentEvents.length"
          :title="m.title"
          :startTime="m.startsAt"
          :endTime="m.endsAt"
          :eventLocation="m.location"
        />
      </span>
    </span>

    <p>Up Next:</p>
    <span v-if="upcomingEvents.length" v-for="m in upcomingEvents">
      <EventItem
        v-if="upcomingEvents.length"
        :title="m.title"
        :startTime="m.startsAt"
        :endTime="m.endsAt"
        :eventLocation="m.location"
      />
    </span>
  </div>
</template>

<!-- The scripts for the component. This script contains a few data attributes and methods for this component. -->
<script>
import schedule from "node-schedule";
import EventItem from "../childComponents/EventItem";
export default {
  name: "Event",
  components: {
    EventItem
  },
  props: ["url"],
  data() {
    return {
      hostURL: this.url,
      cutOffEventArray: [],
      currentEvents: [],
      upcomingEvents: []
    };
  },
  methods: {
    // The next three methods are helper methods used in the array construction methods below.
    getCurrentDate: function() {
      return new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
    },
    compareDates: function(date1, date2) {
      var d1 = Date.parse(date1);
      var d2 = Date.parse(date2);
      if (d1 < d2) {
        return true;
      } else {
        return false;
      }
    },
    compareDatesEqual: function(date1, date2) {
      var d1 = Date.parse(date1);
      var d2 = Date.parse(date2);
      if (d1 <= d2) {
        return true;
      } else {
        return false;
      }
    },

    // This function will duplicate the store events array, sort the array, and then construct a new array with the next three upcoming.
    createCutOffEvents: function() {
      let temporaryArray = [...this.events];
      let cutOffArray = [];
      let pushArray = temporaryArray.sort(
        (a, b) =>
          new Date(a.startsAt.slice(0, 10)) - new Date(b.startsAt.slice(0, 10))
      );
      for (var i = 0; i < pushArray.length; i++) {
        if (cutOffArray.length > 3) {
          break;
        }
        cutOffArray.push(pushArray[i]);
      }
      return cutOffArray;
    },

    // This function will analyze the cut off Array and split them into two arrays by comparing the dates. 
    // The two created arrays the events currently happening, and the events upcoming.
    splitArrays: function() {
      let currentEvents = [];
      let upcomingEvents = [];
      for (var i = 0; i < this.cutOffEventArray.length; i++) {
        if (
          this.compareDatesEqual(
            this.cutOffEventArray[i].startsAt.slice(0, 10),
            this.getCurrentDate()
          )
        ) {
          currentEvents.push(this.cutOffEventArray[i]);
        } else {
          upcomingEvents.push(this.cutOffEventArray[i]);
        }
      }
      return [currentEvents, upcomingEvents];
    },

    // This function will call the previous methods to construct the arrays wanted with some logic to make sure the store events array exists.
    createEventsArray: function() {
      if (this.events.length != 0) {
        this.cutOffEventArray = this.createCutOffEvents();
        if (this.cutOffEventArray != 0) {
          var values = this.splitArrays();
          this.currentEvents = values[0];
          this.upcomingEvents = values[1];
        }
      }
    },

    // A function that uses an AJAX fetch to delete something in the database.
    deleteEvent(uniqueID) {
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
      fetch(this.hostURL + "event", {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data)
      });
    },

    // The node-scheduler will repeat given the functions given on the given schedule.
    scheduledDatabaseMaintenance: function() {
      var self = this;
      schedule.scheduleJob("*/1 * * * *", function() {
        console.log("Event Called.");
        for (var i = 0; i < self.events.length; i++) {
          if (
            self.compareDates(
              self.events[i].startsAt.slice(0, 10),
              self.getCurrentDate()
            )
          ) {
            self.deleteEvent(self.events[i].id);
            self.events.splice(i, i);
          }
        }
      });
    }
  },
  mounted() {
    this.createEventsArray();
    this.scheduledDatabaseMaintenance();
  },
  computed: {
    events: {
      get: function() {
        return this.$store.state.event.all;
      }
    }
  },
  watch: {
    events() {
      this.createEventsArray();
    }
  }
};
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>
.noBorder {
  background-color: rgb(211, 211, 211);
  color: black;
  height: 40.9%;
}

.noBorder p {
  font-size: 1.8em;
}

.eventItems {
  margin: 0;
  padding: 0;
  font-size: 1.75em;
}
</style>
