<!-- 
    This index serves as the main vue component for Otto. It is populated by multiple components:
                Event,
                Birthday,
                Weather,
                Vacation,

                Jira,
                ZenDesk,
                Announcement,
                Deployment,

                Alert,
                MenuButton,

    These components separate and modularize all parts of Otto to their respective containers.  

    There are a few methods here, which are used to register and set up the socket events for the components that require a database.

    These methods are called immediately upon the index component being loaded. 
 -->

<template>
  <div class="voltron">
    <div class="tickers">
      <Announcement :url="this.hostURL"/>
      <Deployment :url="this.hostURL"/>
      <ZenDesk/>
      <Jira/>
    </div>
    <aside class="ticker__aside">
      <Weather/>
      <Birthday/>
      <Event :url="this.hostURL"/>
      <Vacation :url="this.hostURL"/>
    </aside>
    <MenuButton :url="this.hostURL" />
    <Alert/>
  </div>
</template>

<script>
    // Importing widgets
    import Weather from "../components/widgets/Weather"
    import Birthday from "../components/widgets/Birthday";
    import Event from "../components/widgets/Event";
    import Vacation from "../components/widgets/Vacation";

    // Importing the main panes 
    import Deployment from "../components/Deployment";
    import Announcement from "../components/Announcement";
    import Jira from "../components/Jira";
    import ZenDesk from "../components/ZenDesk";

    import Alert from "../components/Alert";
    import MenuButton from "../components/MenuButton";
    // Importing Vue
    import Vue from 'vue'

    export default {
      // Registering Components
        components: {
            Event,
            Birthday,
            Weather,
            Vacation,

            Jira,
            ZenDesk,
            Announcement,
            Deployment,

            Alert,
            MenuButton,
        },
        data() {
          return {
            hostURL: "http://192.168.20.56:1337/" // Mike Samborski's desktop "server"
           // hostURL: "http://localhost:1337/" 
          }
        },
      // Start of methods block
        methods: {
            loadData: function () {
                let _this = this;

                ["announcement", "alert", "birthday", "event", "vacation", "deployment"]
                    .forEach(function (api) {
                        _this.$socket.get(`/${api}`,
                            (body, response) => {
                                _this.$store.commit(`${api}/set`, body);
                            });
                    });
            },
            registerSocketEvents: function () {
                let _this = this;

                ["announcement", "alert", "birthday", "event", "vacation", "deployment"]
                    .forEach(function (api) {
                        _this.$socket.on(api, res => {
                            _this.$store.commit(`${api}/${res.verb}`, res.data)
                        });
                    });
            }
        },
      // Start of life-cycle method.
        mounted() {
            this.registerSocketEvents();
            this.loadData();
        }
    }
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>
  aside {
    font-weight: bold;
  }
  .ticker__item p{
    font-size: 3.0em;
  }

  .tns-nav {
    width: 3.0em;
    height: 3.0em;
  }
</style>
