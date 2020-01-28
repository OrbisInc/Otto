<template>
  <div class="ticker__item in--sidebar padding--a--s noBorder ">
    Currently on Vacation:
      <div class="vacationItem" v-for="m in this.currentVacationsArray" :key="m.id">
       <span class="greyCircle"> </span> {{m.name}} is back on {{m.endDate}}
      </div>
    <br>
    Upcoming Vacations:
      <div class="vacationItem" v-for="m in this.upcomingVacationsArray" :key="m.id">
        <span class="greyCircle"> </span> {{m.name}} Starts Vacation on: {{m.endDate}}
      </div>
    </div>
</template>

<script>
import schedule from 'node-schedule'

    export default {
        name: "Vacations",
        components: {
        },
        data() {
          return {
            cutOffVacationArray: [],
            currentVacationsArray: [],
            upcomingVacationsArray: [],
          }
        },
        methods: {
          dbMaintenance: function() {
            schedule.scheduleJob('55 * * * *', function(){
            console.log("Checked!");
            console.log(this.vacations);
            for(var i = 0; i < this.vacations.length; i++) {
              if (this.compareDates(this.vacations[i].endDate, this.getCurrentDate())) {
                this.deleteVacation(this.vacations[i].id);
              }
            }
          });
          },
          getCurrentDate: function() {
            return new Date().toJSON().slice(0,10).replace(/-/g,'-');
          },
          getCutOffDate: function() {
            var futureWindow = 4;
            var date = new Date();
            var dd = date.getDate();
            var mm = '0' + (date.getMonth() + futureWindow);
            var y = date.getFullYear();
            var finalDate = y + '-'+ mm + '-'+ dd;
            return finalDate;
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
          createCutOffVacations: function() {
            let futureDate = this.getCutOffDate();
            let testArray = [...this.vacations];
            let sortedArray = testArray.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            let finalArray = []
            for(var i = 0; i < testArray.length; i++) {
              if (this.compareDates(testArray[i].endDate, this.getCurrentDate())) {
                this.deleteVacation(testArray[i].id);
              }
              if(finalArray.length > 4) {
                break;
              }
              if(this.compareDates(testArray[i].startDate, futureDate)) {
               finalArray.push(testArray[i]);
              }
            }
            return finalArray
          },
          createCurrentVacations: function() {
            let currentVacations = [];
            let upcomingVacations = [];
            for(var i = 0; i < this.cutOffVacationArray.length; i++) {
              if(this.compareDates(this.cutOffVacationArray[i].startDate, this.getCurrentDate())) {
                currentVacations.push(this.cutOffVacationArray[i]);
              } else {
                upcomingVacations.push(this.cutOffVacationArray[i]);
              }
            }
            var sortedArray = currentVacations.sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
            var sortedArray2 = upcomingVacations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            return [sortedArray, sortedArray2]
          },
          createVacationsArray: function() {
            if (this.vacations.length != 0) {
              this.cutOffVacationArray = this.createCutOffVacations();
              if (this.cutOffVacationArray != 0) {
                var values = this.createCurrentVacations()
                this.currentVacationsArray = values[0];
                this.upcomingVacationsArray = values[1];
              }
            }
          },
          deleteVacation(uniqueID) {
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
              fetch('http://127.0.0.1:1337/vacation', {
              method: "DELETE",
              headers: headers,
              body:  JSON.stringify(data)
                })
          },
          deletionScan() {
             setInterval(() => {
                for(var i = 0; i < this.vacations.length; i++) {
                  if (this.compareDates(this.vacations[i].endDate, this.getCurrentDate())) {
                    console.log(this.vacations[i].endDate + '<' + this.getCurrentDate())
                    this.deleteVacation(this.vacations[i].id);
                    this.vacations.splice(i, i);
                  }
                }
             }, 10000);
          }
        },
        mounted: function() {
          this.createVacationsArray();
          this.deletionScan();
        },
        computed: {
          vacations : {
            get: function() {     
              return this.$store
                  .state
                  .vacation
                  .all
            },
          }
        },
        watch: {
          vacations() {
            this.createVacationsArray(); 
            // this.dbMaintenance();
          }
        }
    }
</script>

<style scoped>
.ticker__item {
  align-content: left;
}
.vacationItem {
  color: rgb(85, 85, 85);
  position: relative;
  font-size: 1.0em;
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
  border-radius: 30px;
  width: 30px;
  height: 30px;
}
.noBorder {
  background-color:rgb(196, 196, 196);
  color: black;
  height: 25%;
}
</style>
