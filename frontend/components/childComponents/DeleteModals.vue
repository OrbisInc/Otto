<!-- 
    DeleteModals.vue is a child component. It is used in another component called MenuButton.
    It serves as a container for the deletion modal template.
    This component will take in a few props (arguments) to construct itself. 
-->

<!-- The template for the component. This template formats the event item using spiral robots CSS and HTML -->
<!-- This HTML is responsible for the 'DELETE' modal template. -->
<template>
    <div>
        <template>
            <br>
            <label>Select something to delete:</label>
            <select v-if="this.actionType == 'deleteAlert'" id="birthday" v-model="deletionIDs">
                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in alerts">{{m.message}}</option>
            </select>
            <select v-if="this.actionType == 'deleteAnnouncement'" id="birthday" v-model="deletionIDs">
                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in announcements">{{m.message}}</option>
            </select>
            <select v-if="this.actionType == 'deleteBirthday'" id="birthday" v-model="deletionIDs">
                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in birthdays">{{m.name}}</option>
            </select>
            <select v-if="this.actionType == 'deleteDeployment'" id="birthday" v-model="deletionIDs">
                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in deployments">{{m.school}}</option>
            </select>
            <select v-if="this.actionType == 'deleteEvent'" id="birthday" v-model="deletionIDs">
                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in events">{{m.title}}</option>
            </select>
            <select v-if="this.actionType == 'deleteVacation'" id="birthday" v-model="deletionIDs">
                <option v-bind:value="[index, m.id]" :key="m.id" v-for="(m, index) in vacations">{{m.name}}</option>
            </select>
        </template>
        <button v-if='this.actionType.includes("delete")' class="btn__default--text btn--info" type="button" @click="deleteRequest">Delete</button>
    </div>
</template>

<!-- The scripts for the component. This script contains data attributes and methods for this component. -->
<script>
  export default {
      name: "DeleteModals",
      props: ["actionTypeProp", "fetchURLProp"],
      data() {
          return {
              actionType: '',
              fetchURL: '',
              deletionIDs: '',
          };
      },
      methods: {
          // constructor() will utilize the props (arguments) taken in by the component, and parse them into the relevant data for the module
          constructor: function() {
              this.actionType = this.actionTypeProp;
              this.fetchURL = this.fetchURLProp;
          },
         // deleteRequest() will send a deletion request to the server.
          deleteRequest() {
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
      },
      mounted() {
          console.log(this.actionTypeProp);
          this.constructor();
      },
      watch: {
          actionTypeProp() {
              this.constructor();
          },
          fetchURLProp() {
              this.constructor();
          }
      },
      computed: {
        alerts() {
          return this.$store.state.alert.all;
        },
        announcements() {
          return this.$store.state.announcement.all;
        },
        birthdays() {
          return this.$store.state.birthday.all;
        },
        deployments() {
          return this.$store.state.deployment.all;
        },
        events() {
          return this.$store.state.event.all;
        },
        vacations() {
          return this.$store.state.vacation.all;
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