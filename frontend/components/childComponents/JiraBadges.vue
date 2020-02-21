<!-- 
      JiraBadges.vue is a child component in Jira.vue. This component is responsible for sending fetch statements to the Jira API
      to display a series of recently updated Jira Statuses. This component will also show the descriptions of the recently changed
      tickets.
-->

<!-- The template for the component. This template formats the component using spiral robots CSS and HTML -->
<template>
  <div>
    <client-only>
      <vue-tiny-slider
        v-if="this.recentIssues.length"
        ref="tinySlider"
        class="list--plain ticker"
        :items="1"
        slide-by="page"
        :controls="false"
        :nav="true"
        :autoplay-button-output="false"
        :speed="7000"
        :autoplay="true"
        :autoplay-timeout="10000"
      >
        <div class="ticker__item tns-item" :key="m[0]" v-for="m in recentIssues">
          <div class="badgeSummary">{{ m[0] }} : {{m[2]}}</div>
        </div>
      </vue-tiny-slider>
    </client-only>

    <div class="jiraBadge marginUp">
      <div class="jiraKey"></div>
      <div class="jiraStatus">
        Recently
        <br />Updated:
      </div>
    </div>

    <div class="jiraBadge" v-for="badge in recentIssues " :key="badge[0]">
      <div class="jiraKey">{{ badge[0] }}</div>
      <div class="jiraStatus">{{ badge[1] }}</div>
    </div>
  </div>
</template>

<!-- The scripts for the component. This script contains data attributes and methods for this component. -->
<script>
import schedule from "node-schedule"; //this imported module permits scheduled updates

export default {
  name: "jiraBadges",
  props: [],
  data() {
    return {
      recentIssues: [],
      recentIssueKey: "",
      recentIssueStatusName: "",
      recentIssueSummary: ""
    };
  },
  methods: {
    // badgeFetch() will send a Fetch API request to the Jira EndPoint to retrieve data for the badges and then assign 
    // a value to those badges.
    badgeFetch: function() {
      let jira = this;
      let useremail = "coopthree@orbiscommunications.com";
      let api_token = "tAe1rrWGwsJgboUXjIgH13DA"; // 
      let encodedHeader = btoa(useremail + ":" + api_token); 
      var headers = {
        "Authorization": "Basic " + encodedHeader,
        "Content-Type": "application/json"
      };
      fetch(
        "https://orbisinc.atlassian.net/rest/api/3/search?jql=status%20changed%20during%20(-1h%2Cnow())",
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          if (this.recentIssues.length < jsonData.issues.length) {
            this.recentIssues = [];
            for (let i = 0; i < jsonData.issues.length; i++) {
              if (this.recentIssues.length > 3) {
                break;
              }
              this.recentIssueKey = jsonData.issues[i].key;
              this.recentIssueStatusName = jsonData.issues[i].fields.status.name;
              this.recentIssueSummary = jsonData.issues[i].fields.summary;
              this.recentIssues.push([ this.recentIssueKey, this.recentIssueStatusName, this.recentIssueSummary ]);
            }
          }
        });
    },
    // scheduleBadgeFetch() will schedule a badgeFetch() every minute.
    scheduleBadgeFetch: function() {
      var self = this;
      schedule.scheduleJob("*/1 * * * *", function() {
        self.badgeFetch();
      });
    }
  },
  mounted() {
    this.badgeFetch();
    this.scheduleBadgeFetch();
  }
};
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>
.jiraBadge {
  width: 15em;
  display: inline-block;
  margin-right: 1em;
  border: 2px solid silver;
  background-color: black;
  height: 7.5em;
  border-radius: 1.5em;
}

.jiraKey {
  background-color: aquamarine;
  color: black;
  font-weight: bold;
  border-radius: 2em;
  text-align: center;
  width: 90%;
  margin: auto;
  margin-top: 0.8em;
  font-size: 1.2em;
}

.badgeSummary {
  font-size: 2em;
  overflow: hidden;
  height: 4em;
}

.jiraStatus {
  margin-top: 0.4em;
  color: white;
  font-size: 1.5em;
  text-align: center;
}
.ticker__item {
  height: 30%;
}
.jiraData {
  position: absolute;
  top: 0;
  height: 30% !important;
}
</style>