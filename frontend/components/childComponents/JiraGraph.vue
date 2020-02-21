<!-- 
      JiraGraph.vue is a child component in Jira.vue. This component is responsible for sending Fetch Statements to the Jira API 
      to display a stacked bar graph of information about current sprints.
-->

<!-- The template for the component. This template formats the component using spiral robots CSS and HTML -->
<template>
  <ul class="list--plain ticker" id="ticker04">
    <li class="ticker__item">
      <!-- Team Sprint Details text to be displyed directly to the screen could go here, for example-->
      <div id="jiraData"></div>
      <!-- BUT, the Stacked Bar Chart will be written in this div!!! -->
    </li>
  </ul>
</template>

<!-- The scripts for the component. This script contains data attributes and methods for this component. -->
<script>
import schedule from "node-schedule"; //this imported module permits scheduled updates

export default {
  name: "JiraGraph",
  data() {
    return {
      jiraGlobalArray: [
        [this.outcomeOpenIssues, this.outcomeInProgressIssues, this.outcomeInReviewIssues, this.outcomeClosedIssues], 
        [this.campusConnectOpenIssues, this.campusConnectInProgressIssues, this.campusConnectInReviewIssues, this.campusConnectClosedIssues], 
        [this.spiralRobotOpenIssues, this.spiralRobotInProgressIssues, this.spiralRobotInReviewIssues, this.spiralRobotClosedIssues], 
      ],
    };
  },
  methods: {
        // the methods to be used by the Vue Component Jira.vue
    scheduleJiraFetch: function() {
      // this function schedules the use of jiraFetch
      var self = this;
      schedule.scheduleJob("*/1 * * * *", function() {
        // scheduling a "refresh" each minute
        self.jiraFetch(); // and actually running the fetch and chart draw calls
        self.waitingForJiraFetch();
      });
    },

    waitingForJiraFetch: function() {
      // After gathering all the necessary data, load it into the Google Chart module, with sufficient delay so that the data can actually be loaded before the 3 Stacked Bar Charts are drawn. The setTimeout function ensures this.
      var self = this;
      setTimeout(function() {
        google.charts.load("current", { packages: ["corechart", "bar"] }); // the chart data is loaded
        google.charts.setOnLoadCallback(self.drawChart); // the drawChart function will be called ...
      }, 3000); // after a 3000 millisecond delay.
    },

    // jiraFetch a method that fetches the number of Issues in each category for each of the three teams,
    // and then calls the method that actually draws the chart

    jiraFetch: function() {
      let jira = this; // a variable to clarify the use of the keyowrd "this"
      let useremail = "coopthree@orbiscommunications.com"; // a login to sign in to Jira
      let api_token = "tAe1rrWGwsJgboUXjIgH13DA"; // ... and a token to Authenticate that user.
      let encodedHeader = btoa(useremail + ":" + api_token); // the process for Basic Authentication, found at:
      var headers = {
        "Authorization": "Basic " + encodedHeader,
        "Content-Type": "application/json"
      };

      let team = ["OUTCOME", "CC", "SPIRAL"];
      
      let status = [
        "in%20(%22Needs%20Scoping%22%2C%20%22On%20Hold%22%2C%20Open%2C%20Reopened)", // Open
        '%3D%20"In%20Progress"', // In Progress
        '%3D%20"In%20Review"', // In Review
        "in%20(Closed%2C%20Resolved)" // Completed
      ];

      for (let i = 0; i < team.length; i++) {
        for (let j = 0; j < status.length; j++) {
          let baseURL = `https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20${team[i]}%20AND%20status%20${status[j]}%20AND%20Sprint%20in%20openSprints()`;
          fetch(baseURL, {
            method: "GET",
            headers: headers
          })
            .then(response => {
              return response.json();
            })
            .then(jsonData => {
              this.jiraGlobalArray[i][j] = jsonData.total;
            });
        }
      }
    },
    drawChart: function() {
      // this function builds the data table dynamically
      var data = google.visualization.arrayToDataTable([
        [
          "Status", // the Title of the Legend
          "Open / To do", // the first legend item's color swatch
          { role: "annotation" }, // the first legend item's text annotation
          "In progress", // ... and so on for each item in the legend
          { role: "annotation" },
          "In review",
          { role: "annotation" },
          "Resolved / Closed",
          { role: "annotation" }
        ],

        [
          "Outcome", // data for the first Stacked Bar of the Chart
          this.jiraGlobalArray[0][0], // the value fetched for the number of Open Issues for the Outcome Team is represented by a colored block in the graph
          this.jiraGlobalArray[0][0], // that same value, duplicated here, is used to literally display the number corresponding that color block on the screen.
          this.jiraGlobalArray[0][1], // ... and so on for Status of each Issue type for the Outcome Team in this Sprint
          this.jiraGlobalArray[0][1],
          this.jiraGlobalArray[0][2],
          this.jiraGlobalArray[0][2],
          this.jiraGlobalArray[0][3],
          this.jiraGlobalArray[0][3]
        ],

        [
          "Campus Connect",
          this.jiraGlobalArray[1][0], // similarly, the fetched data for the Campus Connect team's Open issues is used to draw a color block for that Team's Stacked bar ...
          this.jiraGlobalArray[1][0], // ... and the text to go along with that color block.
          this.jiraGlobalArray[1][1], // ... for each Issue Status for the Campus Connect Team
          this.jiraGlobalArray[1][1],
          this.jiraGlobalArray[1][2],
          this.jiraGlobalArray[1][2],
          this.jiraGlobalArray[1][3],
          this.jiraGlobalArray[1][3]
        ],

        [
          "Spiral Robot",
          this.jiraGlobalArray[2][0], // the data array fetched for the Stacked Bar for the Spiral Robot Team is similarly stored.
          this.jiraGlobalArray[2][0],
          this.jiraGlobalArray[2][1],
          this.jiraGlobalArray[2][1],
          this.jiraGlobalArray[2][2],
          this.jiraGlobalArray[2][2],
          this.jiraGlobalArray[2][3],
          this.jiraGlobalArray[2][3]
        ]
      ]);

      var options_fullStacked = {
        // this option sets the type of Chart to be drawn, in this case a Stacked Bar Chart.
        isStacked: "percent", // ... a "percent" chart spreads the data over the full length of the available axis.
        title: "	Jira Sprint Snapshot", // The Title of the Chart.
        titlePosition: "top", // The Title is positioned at the top of the Chart area.
        titleTextStyle: {
          alignment: "center", // the Title's position in the area
          color: "white", // ... and its color
          fontSize: 35 // ... and the size of the text.
        },
        legend: {
          // the Legend explains the way the data is corellated with the color acheme
          position: "bottom", // ... that it is positioned at the bottom of the chart area.
          alignment: "center", // ... it's alignment with respect to the chart
          maxLines: 2, // ... that only 2 lines of the legend wil be displayed at a time
          textStyle: { color: "white", fontSize: 16 }
          // ... and the characteristice of teh Legend's text
        },
        hAxis: {
          // characteristics of the horizontal axis of the chart
          ticks: [], // no descriptive ticks will be along the Chart's bars.
          baselineColor: "transparent" // the default ticks, where called, will not be visible
        },
        colors: ["#ac4c38", "#8013ec", "#1919e6", "darkgreen"], // these are the colours of the actual Stacked Basd in the Chart
        backgroundColor: "transparent", // the background color of the chart iwll also be invisible

        vAxis: {
          // the characteristics of the vertical axis of the chart
          textStyle: { color: "white", fontSize: 20 } // these text fields name the Teams
        },
        height: 650, // the Stacked Bars fill up as much of the available space as possible, vertically ...
        width: "100%" // ... and horizontally
      };
      var chart = new google.visualization.BarChart( // this variable of the Chart script determines where it will be written ...
        document.getElementById("jiraData") // .. that is, in the div "jiraData"
      );
      chart.draw(data, options_fullStacked); // the chart is drawn
    },
  },
  mounted() {
    this.scheduleJiraFetch(); // the time scheduling method commences after mounting ...
    this.jiraFetch(); // as does the method to fetch data and draw the Chart.
    this.waitingForJiraFetch();
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