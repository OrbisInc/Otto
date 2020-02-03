<template>
    <transition name="modal">
      
        <div class="overlay" @click.self="$root.isOpen = false;">

          <div class="modal is--visible">
            <h1>Add an {{ this.type }}</h1>
            <p>{{ this.type }}:</p>

            <template v-if="this.type == 'Announcement' || this.type == 'Alert' ">
                <div class="display--flex flex--column">
                  <textarea v-model="message" name="message" placeholder="Enter your message" class="ticker__item width--100" autofocus></textarea>
                </div>
            </template>
            
            <template v-if="this.type == 'Birthday'">
               <div class="display--flex flex--column">
                  <label class="width--100">Name: </label>
                  <textarea v-model="name" name="name" placeholder="Whose birthday?" class="ticker__item width--100" autofocus></textarea>
                  <label class="width--100">Day: </label>
                  <div class="display--flex width--100">
                    <input v-model="startDate" name="startDate" class="ticker__item margin--r--l" type="date">
                  </div>
              </div>
            </template>

            <template v-if="this.type == 'Event'">
              <div class="display--flex flex--column">
                  <label class="width--100">Title of Event: </label>
                  <textarea v-model="eventTitle" name="message" placeholder="Enter the event title" class="ticker__item width--100" autofocus></textarea>
                  <label class="width--100">Start Time: </label>
                  <div class="display--flex width--100">
                    <input v-model="startDate" class="ticker__item margin--r--l" type="date" name="bday">
                    <vue-timepicker v-model="startTime" :class="'vue-ticker__item'" format="hh:mm A" :minute-interval="15"></vue-timepicker>
                  </div>
                  <label class="width--100">End Time: </label>
                  <div class="display--flex width--100">
                    <input v-model="endDate" class="ticker__item margin--r--l" type="date" name="bday">
                    <vue-timepicker v-model="endTime" :class="'vue-ticker__item'" format="hh:mm A" :minute-interval="15"></vue-timepicker>
                  </div>
              </div>
            </template>

            <template v-if="this.type == 'Vacation'">
                  <div class="display--flex flex--column">
                  <label class="width--100">Name: </label>
                  <textarea v-model="name" name="message" placeholder="Who is on vacation?" class="ticker__item width--100" autofocus></textarea>
                  <label class="width--100">Start Date: </label>
                  <div class="display--flex width--100">
                    <input v-model="startDate" class="ticker__item margin--r--l" type="date" name="bday">
                  </div>
                  <label class="width--100">End Date: </label>
                  <div class="display--flex width--100">
                    <input v-model="endDate" class="ticker__item margin--r--l" type="date" name="bday">
                  </div>
              </div>
            </template>

            <br>
            <button class="btn__default--text btn--info" type="button" @click="postRequest">Submit</button>
          </div>

        </div>
      
    </transition>
</template>
<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  components: {
    VueTimepicker
  },data: function() {
    return {
      
      message: '',
      name: '',
      eventTitle: '',

      startDate: '',
      startTime: '',
      finalStart: '',

      endDate: '',
      endTime: '',
      finalEnd: '',
    };
  },
  props: ['url', 'buttonText', 'type'],
  methods: {
      postRequest() {
        var headers = {
          "Content-Type": "application/json"                         
        }
        var data = {
          message: this.message,
          name: this.name,
          date: this.startDate,
          title: this.eventTitle,
          startDate: this.startDate,
          endDate: this.endDate,
          startsAt: this.startDate + this.startTime,
          endsAt: this.endDate + this.endTime
        }
          fetch(this.url, {
           method: "POST",
           headers: headers,
           body:  JSON.stringify(data)
            })
            .then((response) => { 
              return response.json();
              this.announcement = ''
            });
      }
  }
};
</script>

<style scoped>
.eventItemWrapperDiv {
  height: 30%;
}
.modal {
  width: 500px;
  height: 70%;
  margin: 0px auto;
  padding: 20px;
  background-color: #555555;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 1.5s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

.mainPageButton {
    width: 100%;
    height: 100%
  }
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
.btn__default--text {
  width: 100%;
}
</style>

