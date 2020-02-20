<!-- 
This component handles the circular menu button in the bottom right corner of the screen.
This component deals with all of the actions that can be done from the menu.

There are two types of modals, delete modals and add modals. Both modals are contained within their own components in the template.
 -->

<template>
  <div>
    <!-- Manage Button. This is the button that is displayed on the main screen. -->
    <button type="button" class="btn btn--menu--circular always--circular color--bg--red js--interaction-btn display--block" id="otto__actions">
        <i class="material-icons">add</i>
    </button>

    <!-- Manage Actions. These are the actions that are displayed from the manage button. -->
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

  <!-- This is the beginning of the modals. The two child components make an appearance here. -->
    <transition name="modal">
      <div v-if="isOpen">
          <div class="modal is--visible" @click.self="isOpen = false;">
              <!-- This div is responsible for the black background. When the black background is clicked it will no longer display the modal. -->
              <div class="modal__inner">

                  <!-- This section is responsible for the buttons displayed at the top of the modal. -->
                  <button type="button" class="modal__btn--close js--close--modal" @click="isOpen = false;"><i class="material-icons">close</i></button>
                  <button class="btn__default--text btn--info" type="button" @click="openAddPanel">Add </button>
                  <button class="btn__default--text btn--info" type="button" @click="openDeletePanel">Manage {{ this.actionType.replace('delete', '') }} </button>
                  <h3 class="modal__title">Manage {{ this.actionType.replace('delete', '').concat('s') }}</h3>

                <!-- This component is responsible for all of the Add Modals -->
                  <AddModals
                  :actionTypeProp="this.actionType"
                  :fetchURLProp="this.fetchURL"
                  />

                <!-- This component is responsible for all of the Delete Modals -->
                  <DeleteModals
                  :actionTypeProp="this.actionType"
                  :fetchURLProp="this.fetchURL"
                  />
              </div>
          </div>
      </div>
    </transition>
  </div>
</template>

<!-- The scripts for the component. This script contains data attributes and methods for this component. -->
<script>
  import DeleteModals from "../components/childComponents/DeleteModals";
  import AddModals from "../components/childComponents/AddModals";

  export default {
    name: 'MenuButton',
      components: {
        DeleteModals,
        AddModals
      },
      props: ['url'],
      data() {
          return {
            hostURL: this.url,
            isOpen: false,
            fetchURL: '', 
            buttonText: '', 
            actionType: 'Vacation',
          };
      },
      methods: {
        // openModal() is for when the user clicks selects an action. It will assign the endpoint URL and the actiontype the user has selected.
        openModal: function(route, actionType) {
            this.fetchURL = route;
            this.actionType = actionType;
            this.isOpen = true;
        },
        // openAddPanel() is for when the user clicks on 'Add' at the top of the screen. 
        openAddPanel: function() {
          this.actionType = this.actionType.replace('delete', '')
        },
        // openDeletePanel() is for when the user clicks on 'Delete' at the top of the screen. 
        openDeletePanel: function() {
          this.actionType = "delete" + this.actionType;
        },
      },
    }
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
