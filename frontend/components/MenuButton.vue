<!-- 
This component handles the circular menu button in the bottom right corner of the screen.
This component deals with all of the actions that can be done from the menu, and also deals with the resulting modals that are created.

There are two types of modals, delete modals and add modals. Both modals are represented in the template.
 -->

<template>
    <div>
        <transition name="modal">
            <div v-if="isOpen">
                <div class="modal is--visible" @click.self="isOpen = false;">
                    <!-- This div is responsible for the black background. When the black background is clicked it will no longer display the modal. -->
                    <div class="modal__inner">

                        <!-- This section is responsible for the button displayed at the top of the modal. -->
                        <button type="button" class="modal__btn--close js--close--modal" @click="isOpen = false;"><i class="material-icons">close</i></button>
                        <button class="btn__default--text btn--info" type="button" @click="openAddPanel">Add </button>
                        <button class="btn__default--text btn--info" type="button" @click="openDeletePanel">Manage {{ this.actionType.replace('delete', '') }} </button>

                        <!-- This section is responsible for all of the 'add' modal templates. -->
                        <!-- Add Announcement or Alert Template -->
                        <template v-if="this.actionType == 'Announcement' || this.actionType == 'Alert' ">
                            <label class="width--100"> Add an{{this.actionType}} </label>
                            <div class="display--flex flex--column">
                                <textarea required v-model="message" name="message" placeholder="Enter your message" class="ticker__item width--100" autofocus></textarea>
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

                        <!-- This section is responsible for all of the 'delete' modal templates. -->
                        <!-- Delete Alert Template -->
                        <template v-if="this.actionType == 'deleteAlert'">
                            <br>
                            <label>Select something to delete:</label>
                            <select id="birthday" v-model="deletionIDs">
                                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in alerts">{{m.message}}</option>
                            </select>
                        </template>
                        <!-- Delete Announcement Template -->
                        <template v-if="this.actionType == 'deleteAnnouncement'">
                            <br>
                            <label>Select something to delete:</label>
                            <select id="birthday" v-model="deletionIDs">
                                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in announcements">{{m.message}}</option>
                            </select>
                        </template>

                        <!-- Delete Birthday Template -->
                        <template v-if="this.actionType == 'deleteBirthday'">
                            <br>
                            <label>Select something to delete:</label>
                            <select id="birthday" v-model="deletionIDs">
                                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in birthdays">{{m.name}}</option>
                            </select>
                        </template>

                        <!-- Delete Deployment Template -->
                        <template v-if="this.actionType == 'deleteDeployment'">
                            <br>
                            <label>Select something to delete:</label>
                            <select id="birthday" v-model="deletionIDs">
                                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in deployments">{{m.school}}</option>
                            </select>
                        </template>

                        <!-- Delete Event Template -->
                        <template v-if="this.actionType == 'deleteEvent'">
                            <br>
                            <label>Select something to delete:</label>
                            <select id="birthday" v-model="deletionIDs">
                                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in events">{{m.title}}</option>
                            </select>
                        </template>

                        <!-- Delete Vacation Template -->
                        <template v-if="this.actionType == 'deleteVacation'">
                            <br>
                            <label>Select something to delete:</label>
                            <select id="birthday" v-model="deletionIDs">
                                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in vacations">{{m.name}}</option>
                            </select>
                        </template>

                        <br>
                        <button v-if='!this.actionType.includes("delete")' class="btn__default--text btn--info" type="button" @click="postRequest">Add</button>
                        <button v-if='this.actionType.includes("delete")' class="btn__default--text btn--info" type="button" @click="deleteRequest">Delete</button>
                    </div>

                </div>
            </div>
        </transition>

        <button type="button" class="btn btn--menu--circular always--circular color--bg--red js--interaction-btn display--block" id="otto__actions">
            <i class="material-icons">add</i>
        </button>

        <nav class="nav--interaction nav--interaction--modified color--bg--grey js--interaction-menu">
            <h6 aria-hidden="true" class="nav--interaction__title margin--b--xl">Actions</h6>
            <div class="nav--interaction__list" aria-controls="otto__actions">
                <div class="nav--interaction__item">
                    <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "alert", "Alert")'>Manage Alert</button>
                </div>
                <div class="nav--interaction__item">
                    <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "announcement", "Announcement")'>Manage Announcement</button>
                </div>
                <div class="nav--interaction__item">
                    <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "birthday", "Birthday")'>Manage Birthday</button>
                </div>
                <div class="nav--interaction__item">
                    <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "deployment", "Deployment")'>Manage Deployment</button>
                </div>
                <div class="nav--interaction__item">
                    <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "event", "Event")'>Manage Event</button>
                </div>
                <div class="nav--interaction__item">
                    <button class="nav--interaction__button js--btn-open-transcript" @click='openModal(hostURL + "vacation", "Vacation")'>Manage Out of Office</button>
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
              eventLocation: '',
              
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
              actionType: '',

              deletionIDs: '',
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
              deploymentDate: this.deploymentDate,
              location: this.eventLocation,
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
          deleteRequest() {
            console.log("DELTE REQUEST FIRED: ")
            console.log("Deleted ID's: " + this.deletionIDs[0]);
            console.log("Deleted ID's: " + this.deletionIDs[1]);
            console.log(this.$store.state.vacation.all)
            var arrayToRemoveFrom = this.actionType.replace('delete', '');
            var headers = {
              "Content-Type": "application/json"                         
            }
            var data = {
              id: this.deletionIDs[1],
            }
            fetch(this.fetchURL, {
              method: "DELETE",
              headers: headers,
              body:  JSON.stringify(data)
                })
                .then((response) => { 
                  return response.json();
                });
            console.log(arrayToRemoveFrom);
            if (arrayToRemoveFrom == 'Announcement') {
              this.announcements.splice(this.deletionIDs[0], 1);
            }
            if (arrayToRemoveFrom == 'Alert') {
              this.alerts.splice(this.deletionIDs[0], 1);
            }
            if (arrayToRemoveFrom == 'Birthday') {
              this.birthdays.splice(this.deletionIDs[0], 1);
            }
            if (arrayToRemoveFrom == 'Deployment') {
              this.deployments.splice(this.deletionIDs[0], 1);
            }
            if (arrayToRemoveFrom == 'Event') {
              this.events.splice(this.deletionIDs[0], 1);
            }  
            if (arrayToRemoveFrom == 'Vacation') {
              this.vacations.splice(this.deletionIDs[0], 1);
            }                                       
            this.deletionIDs = '';
          },
          openModal: function(route, actionType) {
              this.fetchURL = route;
              this.actionType = actionType;
              this.isOpen = true;
          },
          openDeletePanel: function() {
            this.actionType = "delete" + this.actionType;
          },
          openAddPanel: function() {
            this.actionType = this.actionType.replace('delete', '')
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
          alerts() {
            return this.$store.state.alert.all;
          }
        },
      watch: {
        vacations() {
          this.vacations = this.$store.state.vacation.all;
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

#otto__actions {
    width: 4.5em;
    height: 4.5em;
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
