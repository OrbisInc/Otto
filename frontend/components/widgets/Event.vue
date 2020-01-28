<template>
    <div class="ticker__item in--sidebar padding--a--s noBorder">
    
        <p> Happening Today: </p>
    
        <span v-if="this.events.length">
    
          <span v-if="currentEvents.length" v-for="m in currentEvents">
    
            <EventItem v-if="currentEvents.length" :title="m.title" :startTime = "m.startsAt"  :endTime = "m.endsAt" />
    
          </span>
    
        </span>
    
        <p> Up Next: </p>
    
        <span v-if="upcomingEvents.length" v-for="m in upcomingEvents">
    
         <EventItem v-if="upcomingEvents.length" :title="m.title" :startTime = "m.startsAt"  :endTime = "m.endsAt" />
    
        </span>
    
    </div>
</template>

<script>
import EventItem from "../childComponents/EventItem";
export default {
    name: "Event",
    components: {
        EventItem
    },
    data() {
        return {
            cutOffEventArray: [],
            currentEvents: [],
            upcomingEvents: [],
        }
    },
    methods: {
        getCurrentDate: function() {
            return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        },
        // getCutOffDate: function() {
        //   var futureWindow = 4;
        //   var date = new Date();
        //   var dd = date.getDate();
        //   var mm = '0' + (date.getMonth() + futureWindow);
        //   var y = date.getFullYear();
        //   var finalDate = y + '-'+ mm + '-'+ dd;
        //   return finalDate;
        // },
        compareDates: function(date1, date2) {
            var d1 = Date.parse(date1);
            var d2 = Date.parse(date2);
            if (d1 < d2) {
                return true
            } else {
                return false
            }
        },
        compareDatesEqual: function(date1, date2) {
            var d1 = Date.parse(date1);
            var d2 = Date.parse(date2);
            if (d1 <= d2) {
                return true
            } else {
                return false
            }
        },
        createCutOffEvents: function() {
            let temporaryArray = [...this.events]
            let pushArray = temporaryArray.sort((a, b) => new Date(a.startsAt.slice(0, 10)) - new Date(b.startsAt.slice(0, 10)))
            let finalArray = []
            for (var i = 0; i < pushArray.length; i++) {
                if (finalArray.length > 3) {
                    break;
                }
                finalArray.push(pushArray[i]);
            }
            return finalArray
        },

        createCurrentEvents: function() {
            let currentEvents = [];
            let upcomingEvents = [];
            for (var i = 0; i < this.cutOffEventArray.length; i++) {
                if (this.compareDatesEqual(this.cutOffEventArray[i].startsAt.slice(0, 10), this.getCurrentDate())) {
                    currentEvents.push(this.cutOffEventArray[i]);
                } else {
                    upcomingEvents.push(this.cutOffEventArray[i]);
                }
            }
            return [currentEvents, upcomingEvents]
        },
        createEventsArray: function() {
            if (this.events.length != 0) {
                this.cutOffEventArray = this.createCutOffEvents();
                if (this.cutOffEventArray != 0) {
                    var values = this.createCurrentEvents()
                    this.currentEvents = values[0];
                    this.upcomingEvents = values[1];
                }
            }
        },
        deleteEvent(uniqueID) {
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
            fetch('http://127.0.0.1:1337/event', {
                method: "DELETE",
                headers: headers,
                body: JSON.stringify(data)
            })
        },
        deletionScan() {
             setInterval(() => {
                for(var i = 0; i < this.events.length; i++) {
                  if (this.compareDates(this.events[i].startsAt.slice(0, 10), this.getCurrentDate())) {
                    this.deleteEvent(this.events[i].id);
                    this.events.splice(i, i);
                  }
                }
             }, 10000);
          }
    },
    mounted() {
        this.createEventsArray();
        this.deletionScan();
    },
    computed: {
        events: {
            get: function() {
                return this.$store
                    .state
                    .event
                    .all
            },
        }
    },
    watch: {
        events() {
            this.createEventsArray()
        }
    }
}
</script>

<style scoped>
.noBorder {
    background-color: rgb(211, 211, 211);
    color: black;
    height: 40.9%;
}

.eventItems {
    margin: 0;
    padding: 0;
}
</style>
