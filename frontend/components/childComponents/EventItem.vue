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

.schedule-item__left {
    background-color: rgb(56, 56, 56);
}

.schedule-item__title a{
    color: rgb(56, 56, 56);
}
</style>
