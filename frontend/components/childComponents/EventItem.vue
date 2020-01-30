<template>
<div class="eventItemWrapperDiv"> 
    <div class="schedule-item">
        <div class="schedule-item__left color--bg--blue">
            <div class="date">
            <span class="day">{{this.day}}</span>
            <span class="month">{{this.month}}</span>
            </div>
            <div class="time">
                <span class="schedule-item__left--time-span">{{ this.startHour }}</span>
            </div>
        </div>
        <div class="schedule-item__right">
            <h5 class="schedule-item__title"><a href="" attrs="">{{ this.title }}</a></h5>
            <span class="schedule-item__location">Hamilton, ON</span>
            <span class="schedule-item__time-status">From {{ this.startHour }} - {{ this.endHour }} </span>
        </div>
    </div>
</div>
</template>

<script>
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

    export default {
        name: "EventItem",
        props: ['title', 'startTime', 'endTime'],
        data() {
            return {
                day: '23',
                month: 'Nov',
                startHour: '3:00PM',
                endHour: '4:30PM',
                
            }
        },
        methods: {
            dissectTime: function() {
                this.day = this.startTime.slice(8, 10)
                this.month = monthNames[this.startTime.slice(5, 7).replace('0', '')-1]
                this.startHour = this.startTime.slice(10, this.startTime.length)
                this.endHour = this.endTime.slice(10, this.startTime.length)
            }
        },
        mounted() {
           this.dissectTime();
        }
    }
</script>

<style scoped>
.eventItemWrapperDiv {
    margin: 0;
    padding: 0;
    display: block;
    height: 23%;
    font-size: 1.75em;

}
.container {
    position: relative;
    width: 95%;
    height: 30%;
    font-size: 0.5em;
    margin-top: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: white;
    padding: 0;
    margin: auto;
}

.schedule-item {
    height: 5.3em;
}
.schedule-item__right {
    font-size: 1.25em;
}
.schedule-item__left {
    background-color: rgb(56, 56, 56);
    font-size: 1.25em;
}

.schedule-item__title{
    color: rgb(56, 56, 56);
  font-size: 0.8em;
}
.schedule-item__location {
  font-size: 0.7em;
}

.schedule-item__calendar {
  font-size: 0.7em;
}

.schedule-item__time-status {
  font-size: 0.7em;
}
.schedule-item__left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #b13888;
  color: #ffffff;
  flex-basis: 160px;
  min-width: 0px;
  max-width: 160px;
  width: 80px;
}

.schedule-item__left .date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
}

.schedule-item__left .date .day {
  font-size: 1.9em;
  font-weight: bold;
  flex-basis: 32px;
  line-height: 82px;
  text-align: center;
}

.schedule-item__left .date .month {
  font-size: 0.7em;
  font-weight: bold;
  text-transform: uppercase;
  flex-basis: 12px;
  line-height: 12px;
  text-align: center;
}

.schedule-item__left .time {
  font-size: 25px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.33);
  width: 100%;
  text-align: center;
  height: 20px;
  line-height: 20px;
}

.schedule-item__left .time {
  font-size: 25px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.33);
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
</style>
