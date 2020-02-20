<!-- 
      Vacations.vue is a right hand side widget. It is located in the vacations pane underneath Events. This component
      will pull and display informatoin in the database. It will only select the vacations that occur within
      the next four months, and it will only select a maximum of four of them. Any vacations that are currently
      occuring will show the date the individual comes back, and the excess will be in upcoming and will show the day 
      the individual leaves. 
 -->

<!-- The template for the component. This template formats the event item using spiral robots CSS and HTML -->
<template>
    <div class="ticker__item in--sidebar padding--a--s noBorder">
        <p>Currently Out of Office:</p>
        <div class="vacationItem" v-for="m in this.currentVacationsArray" :key="m.id">
            <span class="greyCircle"></span> {{m.name}} is back on {{m.endDate}}
        </div>
        <br />
        <p>Upcoming Out of Office:</p>
        <div class="vacationItem" v-for="m in this.upcomingVacationsArray" :key="m.id">
            <span class="greyCircle"></span> {{m.name}} leaves on: {{m.startDate}}
        </div>
    </div>
</template>

<!-- The scripts for the component. This script contains data attributes and methods for this component. -->
<script>
import schedule from "node-schedule";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default {
  name: "Vacations",
  props: ["url"],
  components: {},
  data() {
    return {
      cutOffVacationArray: [],
      currentVacationsArray: [],
      upcomingVacationsArray: [],
      hostURL: this.url
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
    getCutOffDate: function() {
      var futureWindow = 4;
      var date = new Date();
      var dd = date.getDate();
      var mm = "0" + (date.getMonth() + futureWindow);
      var y = date.getFullYear();
      var finalDate = y + "-" + mm + "-" + dd;
      return finalDate;
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

    // createCutOffVacations() will duplicate the vacations array - and then filter through the array for elements that only occur within the next three months.
    // Additionally, it will fetch up to four vacations before breaking the loop. It then returns that array.
    createCutOffVacations: function() {
      let futureDate = this.getCutOffDate();
      let testArray = JSON.parse(JSON.stringify(this.vacations));
      let sortedArray = testArray.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
      let cutOffArray = [];
      for (var i = 0; i < testArray.length; i++) {
        if (this.compareDates(testArray[i].endDate, this.getCurrentDate())) {
          this.deleteVacation(testArray[i].id);
        }
        if (cutOffArray.length > 4) {
          break;
        }
        if (this.compareDates(testArray[i].startDate, futureDate)) {
          cutOffArray.push(testArray[i]);
        }
      }
      return cutOffArray;
    },

    // splitArrays() take in the vacations from createCutOffVacations() - and then sort it into the current vacations and
    // upcoming vacations by comparing dates. This returns two arrays. Within this function it parse and reassign the dates 
    // so they use a more human-friendly format.
    splitArrays: function() {
      let currentVacations = [];
      let upcomingVacations = [];
      for (var i = 0; i < this.cutOffVacationArray.length; i++) {
        if (
          this.compareDates(
            this.cutOffVacationArray[i].startDate,
            this.getCurrentDate()
          )
        ) {
          currentVacations.push(this.cutOffVacationArray[i]);
        } else {
          upcomingVacations.push(this.cutOffVacationArray[i]);
        }
      }
      var currentArray = currentVacations.sort(
        (a, b) => new Date(a.endDate) - new Date(b.endDate)
      );
      var upcomingArray = upcomingVacations.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
        currentArray.forEach(function(vacation) {
          let splitDate = vacation.startDate.split("-");
          let year = splitDate[0];
          let month = monthNames[splitDate[1].replace('0', '')-1];
          let day = splitDate[2];
          vacation.startDate = month + " " + day + " " + year;

          splitDate = vacation.endDate.split("-");
          year = splitDate[0];
          month = monthNames[splitDate[1].replace('0', '')-1];
          day = splitDate[2];
          vacation.endDate = month + " " + day + " " + year;
        });
         upcomingArray.forEach(function(vacation) {
          let splitDate = vacation.startDate.split("-");
          let year = splitDate[0];
          let month = monthNames[splitDate[1].replace('0', '')-1];
          let day = splitDate[2];
          vacation.startDate = month + " " + day + " " + year;

          splitDate = vacation.endDate.split("-");
          year = splitDate[0];
          month = monthNames[splitDate[1].replace('0', '')-1];
          day = splitDate[2];
          vacation.endDate = month + " " + day + " " + year;
        });
      return [currentArray, upcomingArray];
    },

    // createVacationsArray() will call both previous array functions to construct the arrays we want to display.
    createVacationsArray: function() {
      if (this.vacations.length != 0) {
        this.cutOffVacationArray = this.createCutOffVacations();
        if (this.cutOffVacationArray != 0) {
          var values = this.splitArrays();
          this.currentVacationsArray = values[0];
          this.upcomingVacationsArray = values[1];
        }
      }
    },

    // deleteVacation() uses an AJAX fetch to delete something in the database.
    deleteVacation(uniqueID) {
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
      fetch(this.hostURL + "vacation", {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data)
      });
    },

    // scheduledDatabaseMaintenance() will repeat given the functions given on the given schedule.
    scheduledDatabaseMaintenance: function() {
      var self = this;
      schedule.scheduleJob("*/1 * * * *", function() {
        console.log("Vacation Called.");
        for (var i = 0; i < self.vacations.length; i++) {
          if (
            self.compareDates(self.vacations[i].endDate, self.getCurrentDate())
          ) {
            console.log(
              self.vacations[i].endDate + "<" + self.getCurrentDate()
            );
            self.deleteVacation(self.vacations[i].id);
            self.vacations.splice(i, i);
          }
        }
      });
    }
  },
  mounted: function() {
    this.createVacationsArray();
    this.scheduledDatabaseMaintenance();
  },
  computed: {
    vacations() {
      return this.$store.state.vacation.all;
    },
  },
  watch: {
    vacations() {
      this.createVacationsArray();
    }
  }
};
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>
.ticker__item {
  align-content: left;
}
.vacationItem {
  color: rgb(85, 85, 85);
  position: relative;
  font-size: 1.75em;
  height: 10%;
  margin: 0;
  padding: 0;
  margin-left: 2.5em;
  margin-top: 0.5em;
  display: block;
}
.greyCircle {
  position: absolute;
  left: -2.2em;
  background-color: rgb(64, 64, 64);
  border-radius: 1.5em;
  width: 1.75em;
  height: 1.75em;
}
.noBorder {
  background-color: rgb(196, 196, 196);
  color: black;
  height: 25%;
}

.noBorder p {
  font-size: 1.8em;
}
</style>
