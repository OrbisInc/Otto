<template>
  <div>

    <transition name="modal">
      <div v-if="isOpen">
        <div class="modal is--visible" @click.self="isOpen = false;">

          <div class="modal__inner">
            <button type="button" class="modal__btn--close js--close--modal" @click="isOpen = false;"><i class="material-icons">close</i></button>
            <h3 class="modal__title">Add an {{ this.actionType }}</h3>
            <p>{{ this.actionType }}:</p>
<!-- 
            <template v-if="this.actionType == 'dAnnouncement'">
                  <p> Select an announcement to delete: </p>
                  <div class="display--flex width--100" v-for="m in announcements">
                    <input type="checkbox" :value="m.id" v-model="deletionIDs" class="ticker__item margin--r--l"> {{m.message}}
                  </div>
            </template> -->

            <template v-if="this.actionType == 'Announcement' || this.actionType == 'Alert' ">
                <div class="display--flex flex--column">
                  <textarea required v-model="message" name="message" placeholder="Enter your message" class="ticker__item width--100" autofocus></textarea>
                </div>
                <label class="width--100"> Expires On: </label>
                  <div class="display--flex width--100">
                    <input required v-model="expirationDate" name="expirationDate" class="ticker__item margin--r--l" type="date">
                  </div>
            </template>

            
            <template v-if="this.actionType == 'Deployment'">
              <div>
                  <label class="width--100">School: </label>
                  <textarea required v-model="school" name="message" placeholder="Enter the school" class="ticker__item width--100" autofocus></textarea>
                  <label class="width--100">Message: </label>
                  <textarea v-model="message" name="message" placeholder="Enter the message" class="ticker__item width--100" autofocus></textarea>
                  <label class="width--100">Deployment Date: </label>
                  <div class="display--flex width--100">
                    <input required v-model="deploymentDate" class="ticker__item margin--r--l" type="date" name="bday">
                  </div>
                  <label class="width--100"> Expires On: </label>
                  <div class="display--flex width--100">
                    <input required v-model="expirationDate" name="expirationDate" class="ticker__item margin--r--l" type="date">
                  </div>
              </div>
            </template>
            
            <template v-if="this.actionType == 'Birthday'">
               <div class="display--flex flex--column">
                  <label class="width--100">Name: </label>
                  <textarea required v-model="name" name="name" placeholder="Whose birthday?" class="ticker__item width--100" autofocus></textarea>
                  <label class="width--100">Day: </label>
                  <div class="display--flex width--100">
                    <input required v-model="startDate" name="startDate" class="ticker__item margin--r--l" type="date">
                  </div>
              </div>
            </template>

            <template v-if="this.actionType == 'Event'">
              <div class="display--flex flex--column">
                  <label class="width--100">Title of Event: </label>
                  <textarea required v-model="eventTitle" name="message" placeholder="Enter the event title" class="ticker__item width--100" autofocus></textarea>
                  <label class="width--100">Type of Event: </label>
                  <textarea v-model="eventType" name="message" placeholder="Enter the event type" class="ticker__item width--100" autofocus></textarea>
                  <label required class="width--100">Start Time: </label>
                  <div class="display--flex width--100">
                    <input v-model="startDate" class="ticker__item margin--r--l" type="date" name="bday">
                    <vue-timepicker v-model="startTime" :class="'vue-ticker__item'" format="hh:mm A" :minute-interval="15"></vue-timepicker>
                  </div>
                  <label class="width--100">End Time: </label>
                  <div class="display--flex width--100">
                    <input required v-model="endDate" class="ticker__item margin--r--l" type="date" name="bday">
                    <vue-timepicker required v-model="endTime" :class="'vue-ticker__item'" format="hh:mm A" :minute-interval="15"></vue-timepicker>
                  </div>
              </div>
            </template>

            <template v-if="this.actionType == 'Vacation'">
                  <div class="display--flex flex--column">
                  <label class="width--100">Name: </label>
                  <textarea required v-model="name" name="message" placeholder="Who is on vacation?" class="ticker__item width--100" autofocus></textarea>
                  <label class="width--100">Start Date: </label>
                  <div class="display--flex width--100">
                    <input required v-model="startDate" class="ticker__item margin--r--l" type="date" name="bday">
                  </div>
                  <label class="width--100">End Date: </label>
                  <div class="display--flex width--100">
                    <input required v-model="endDate" class="ticker__item margin--r--l" type="date" name="bday">
                  </div>
              </div>
            </template>

            <br>
            <button v-if="this.actionType != 'dAnnouncement'" class="btn__default--text btn--info" type="button" @click="postRequest">Add</button>
            <!-- <button v-if="this.actionType == 'dAnnouncement'" class="btn__default--text btn--info" type="button" @click="deleteRequest">Delete</button> -->
          </div>

        </div>
      </div>
    </transition>

    <button type="button" class="btn btn--menu--circular always--circular color--bg--red js--interaction-btn display--block" id="otto__actions">
      <i class="material-icons">add</i>
    </button>

    <nav class="nav--interaction color--bg--grey js--interaction-menu" >
      <h6 aria-hidden="true" class="nav--interaction__title margin--b--xl">Actions</h6>
      <div class="nav--interaction__list" aria-controls="otto__actions">
        <div class="nav--interaction__item">
          <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "alert", "Alert")'>Add Alert</button>
        </div>
        <div class="nav--interaction__item">
          <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "announcement", "Announcement")'>Add Announcement</button>
        </div>
        <div class="nav--interaction__item">
          <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "birthday", "Birthday")'>Add Birthday</button>
        </div>
        <div class="nav--interaction__item">
          <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "event", "Event")'>Add Event</button>
        </div>
        <div class="nav--interaction__item">
          <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "vacation", "Vacation")'>Add Out of Office</button>
        </div>      
        <div class="nav--interaction__item">
          <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "deployment", "Deployment")'>Add Deployment</button>
        </div>    
      </div>
    </nav>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

    export default {
      name: 'MenuButton',
        components: {
          VueTimepicker
        },
        props: ['url'],
        data: function(){
            return {
              hostURL: this.url,
              isOpen: false,
              message: '',
              name: '',
              eventTitle: '',
              eventType: '',

              school: '',
              deploymentDate: '',
              expirationDate: '',

              startDate: '',
              startTime: '',
              finalStart: '',

              endDate: '',
              endTime: '',
              finalEnd: '',

              fetchURL: '', 
              buttonText: '', 
              actionType: ''
            };
        },
        methods: {
          getCurrentDate: function() {
            var futureWindow = 7;
            var date = new Date();
            var dd = date.getDate();
            var mm = '0' + (date.getMonth() + futureWindow);
            var y = date.getFullYear();
            var finalDate = y + '-'+ mm + '-'+ dd;
            return finalDate;
          },
          postRequest() {
            var headers = {
              "Content-Type": "application/json"                         
            }
            var data = {
              message: this.message,
              name: this.name,
              date: this.startDate,
              title: this.eventTitle,
              type: this.eventType,
              deploymentDate: this.deploymentDate,
              school: this.school,
              startDate: this.startDate,
              endDate: this.endDate,
              startsAt: this.startDate + this.startTime,
              endsAt: this.endDate + this.endTime,
              expiresAt: this.expirationDate,
            }
              fetch(this.fetchURL, {
              method: "POST",
              headers: headers,
              body:  JSON.stringify(data)
                })
                .then((response) => { 
                  return response.json();
                  this.announcement = ''
                });
                this.isOpen = false;
          },
          //  deleteRequest() {
          //   console.log(this.deletionIDs)
          //   for(var i = 0; i < this.deletionIDs.length; i++) {
          //     console.log(this.deletionIDs[i]);
          //     var headers = {
          //      "Content-Type": "application/json"                         
          //    }
          //   var data = {
          //     message: this.message,
          //     name: this.name,
          //     date: this.startDate,
          //     title: this.eventTitle,
          //     id: this.deletionIDs[i],
          //     type: this.eventType,
          //     startDate: this.startDate,
          //     endDate: this.endDate,
          //     startsAt: this.startDate + this.startTime,
          //     endsAt: this.endDate + this.endTime,
          //     expiresAt: this.expirationDate,
          //   }
          //   fetch(this.url, {
          //     method: "DELETE",
          //     headers: headers,
          //     body:  JSON.stringify(data)
          //       })
          //       .then((response) => { 
          //         return response.json();
          //         this.announcement = ''
          //       });
          //   }
          //   this.isOpen = false;
          // },
          openModal: function(route, actionType) {
              this.fetchURL = route;
              this.actionType = actionType;
              this.isOpen = true;
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

<style scoped>
.modal__inner, .modal__title, .modal__btn--close {
  background-color: #555555;
}

.modal__title, .modal__btn--close { 
  color: #d8d8d8;

}

::placeholder {
  color: white;
  opacity: 1;
}

input[type=date] {
    color: white;
}

textarea {
    color: white;
}
</style>
