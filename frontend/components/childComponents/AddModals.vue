<!-- This eventItem is a child component. It is used in another component called MenuButton.
 It serves as a container for the deletion modal template.
 This component will take in a few props (arguments) to construct itself. -->

<!-- The template for the component. This template formats the event item using spiral robots CSS and HTML -->
<template>
    <div>
      <!-- This section is responsible for all of the 'ADD' modal templates. -->

      <!-- Add Announcement Template -->
      <template v-if="this.actionType == 'Announcement'">
          <div class="display--flex flex--column">
              <textarea required v-model="message" name="message" placeholder="Enter your message" class="ticker__item width--100" autofocus></textarea>
          </div>
          <label class="width--100"> Expires On: </label>
          <div class="display--flex width--100">
              <input required v-model="expirationDate" name="expirationDate" class="ticker__item margin--r--l" type="date">
          </div>
      </template>

      <!-- Add Alert Template -->
      <template v-if="this.actionType == 'Alert' ">
          <div class="display--flex flex--column">
              <textarea required v-model="message" name="message" placeholder="Enter your message" class="ticker__item width--100" autofocus></textarea>
          </div>
          <label class="width--100"> Severity: </label>
          <div class="display--flex flex--column">
            <select v-model="alertSeverity">  
              <option> Low </option>
              <option> High </option>
            </select>
          </div>
          <div v-if="alertSeverity == 'High'">
            <input required v-model="highAlertDate" name="expirationDate" class="ticker__item margin--r--l" type="date">
          </div>
          <label class="width--100"> Expires On: </label>
          <div class="display--flex width--100">
              <input required v-model="expirationDate" name="expirationDate" class="ticker__item margin--r--l" type="date">
          </div>
      </template>

      <!-- Add Deployment Template -->
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
              <label class="width--100">Expires On: </label>
              <div class="display--flex width--100">
                  <input required v-model="expirationDate" name="expirationDate" class="ticker__item margin--r--l" type="date">
              </div>
          </div>
      </template>

      <!-- Add Birthday Template -->
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

      <!-- Add Event Template -->
      <template v-if="this.actionType == 'Event'">
          <div class="display--flex flex--column">
              <label class="width--100">Title of Event: </label>
              <textarea required v-model="eventTitle" name="message" placeholder="Enter the event title" class="ticker__item width--100" autofocus></textarea>
              <label class="width--100">Location of Event: </label>
              <textarea required v-model="eventLocation" name="message" placeholder="Enter the event location" class="ticker__item width--100" autofocus></textarea>
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

      <!-- Add Vacation Template -->
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
      <button v-if='!this.actionType.includes("delete")' class="btn__default--text btn--info" type="button" @click="postRequest">Add</button>
    </div>
</template>

<!-- The scripts for the component. This script contains data attributes and methods for this component. -->
<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

  export default {
      name: "DeleteModals",
      props: ["actionTypeProp", "fetchURLProp"],
      components: {
        VueTimepicker,
      },
      data() {
          return {
              message: '',
              alertSeverity: '',
              name: '',
              eventTitle: '',
              eventLocation: '',

              highAlertDate: '',
              
              school: '',
              deploymentDate: 'TBD',
              expirationDate: '',

              startDate: '',
              startTime: '',
              finalStart: '',

              endDate: '',
              endTime: '',
              finalEnd: '',

              fetchURL: '', 
              buttonText: '', 
              actionType: 'Vacation',
          };
      },
      methods: {
          // dissectTime() will utilize the props (arguments) taken in by the component, and parse them into the relevant data for the module
          dissectActionType: function() {
              this.actionType = this.actionTypeProp;
              this.fetchURL = this.fetchURLProp;
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
              deploymentDate: this.deploymentDate,
              location: this.eventLocation,
              school: this.school,
              startDate: this.startDate,
              endDate: this.endDate,
              startsAt: this.startDate + this.startTime,
              endsAt: this.endDate + this.endTime,
              expiresAt: this.expirationDate,
              severity: this.alertSeverity,
              highAlertDate: this.highAlertDate,
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
              this.message = '',
              this.name = '',
              this.startDate = '',
              this.eventTitle = '',
              this.deploymentDate = 'TBD',
              this.school = '',
              this.startDate = '',
              this.endDate = '',
              this.startDate + this.startTime,
              this.endDate + this.endTime,
              this.expirationDate = '',
              this.isOpen = false;
          },
      },
      mounted() {
          this.dissectActionType();
      },
      watch: {
          actionTypeProp() {
              this.dissectActionType();
          },
          fetchURLProp() {
              this.dissectActionType();
          }
      },
      computed: {
          alerts() {
            return this.$store.state.alert.all;
          },
          announcements: {
            cache: false,
            get: function() {         
              return this.$store
                  .state
                  .announcement
                  .all
            }
          },
          vacations: {
            get: function() {
              return this.$store.state.vacation.all;
            },
            set: function() {
              return this.$store.state.vacation.all;
            }
          },
          birthdays: {
            cache: false,
            get: function() {
              let all = this.$store.state.birthday.all;
              return all;
            }
          },
          events: {
            get: function() {
              return this.$store.state.event.all;
            }
          },
          deployments: {
            cache: false,
            get: function() {       
              this.numberOfSlides = this.$store.state.deployment.all.length;
              return this.$store
                  .state
                  .deployment
                  .all
            }
        },
    },
  };
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
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

  .nav--interaction {
    width: 15.0em;
    height: 15.0em;
    max-width: 15.0em;
    text-align: center;
  }

  .nav--interaction__list {
    text-align: center;
  }

  .nav--interaction__button {
    font-size: 1.7em;
    margin-top: 0.7em;
    display: block;
    text-align: center;
    width: 100%;
  }

  .nav--interaction__button:hover {
    background-color: rgb(73, 64, 64);
  }

  .nav--interaction--modified {
    height: 30.0em !important;
    width: 30.0em !important;
    max-width: 300em;
  }

  .nav--interaction__title {
    font-size: 2.0em;
    margin-bottom: 2.0em;
  }

  .modal__inner {
    font-size: 1.5em;
  }

  .modal__title {
    font-size: 1.6em;
    margin-top: 0.5em;
  }

  .btn__default--text {
    font-size: 1.0em;
  }
</style>