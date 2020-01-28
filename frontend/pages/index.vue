<!-- This index serves as the main page for otto. It is populated by multiple components. A fe methods are located here - including the event to load data for announcements and alert
as well as registering the socket events. -->

<template>
  <div class="voltron">
    <div class="tickers">
      <Announcement />
      <Deployments/>
      <ZenDesk/>
      <Jira/>
    </div>
    <aside class="ticker__aside">
      <Weather/>
      <Birthday/>
      <Event/>
      <Vacation/>
    </aside>
    <MenuButton/>
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
    import Alert from "../components/Alert";
    import MenuButton from "../components/MenuButton";
    import Deployments from "../components/Deployments";
    import Announcement from "../components/Announcement";
    import Jira from "../components/Jira";
    import ZenDesk from "../components/ZenDesk";
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
            Deployments,

            Alert,
            MenuButton,
        },
      // Start of methods block
        methods: {
            loadData: function () {
                let _this = this;

                ["announcement", "alert", "birthday", "event", "vacation"]
                    .forEach(function (api) {
                        _this.$socket.get(`/${api}`,
                            (body, response) => {
                                _this.$store.commit(`${api}/set`, body);
                            });
                    });
            },
            registerSocketEvents: function () {
                let _this = this;

                ["announcement", "alert", "birthday", "event", "vacation"]
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

<style scoped>
aside {
  font-weight: bold;
}
</style>
