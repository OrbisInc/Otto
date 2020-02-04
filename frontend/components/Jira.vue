<!-- The component for the Jira pane (bottom-right). This pane displays information about Jira to users.
-->

<template>
  <section class="ticker__container">
    <ul class="list--plain ticker" id="ticker04">
      <li class="ticker__item">
        <!-- Team Sprint Details -->
        <div id="jiraData"></div>

        <!-- <h1>{{results}}</h1> -->
      </li>
    </ul>
  </section>
</template>

<script>
import schedule from "node-schedule";

export default {
  name: "Jira",
  data() {
    return {
      //results: [],

      outcomeOpenIssues: 0,
      outcomeInProgressIssues: 0,
      outcomeInReviewIssues: 0,
      outcomeClosedIssues: 0,

      campusConnectOpenIssues: 0,
      campusConnectInProgressIssues: 0,
      campusConnectInReviewIssues: 0,
      campusConnectClosedIssues: 0,

      spiralRobotOpenIssues: 0,
      spiralRobotInProgressIssues: 0,
      spiralRobotInReviewIssues: 0,
      spiralRobotClosedIssues: 0
    };
  },
  methods: {
    scheduleJiraFetch: function() {
      var self = this;
      schedule.scheduleJob("*/1 * * * *", function() {
        console.log("fetching ... ");
        self.jiraFetch();
      });
    },

    jiraFetch: function() {
      let jira = this;
      let useremail = "coopthree@orbiscommunications.com";
      let api_token = "tAe1rrWGwsJgboUXjIgH13DA";
      let encodedHeader = btoa(useremail + ":" + api_token);
      var headers = {
        Authorization: "Basic " + encodedHeader,
        "Content-Type": "application/json"
      };

      // fetch the outcome open issues

      fetch(
        "https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20OUTCOME%20AND%20status%20in%20(%22Needs%20Scoping%22%2C%20%22On%20Hold%22%2C%20Open%2C%20Reopened)%20AND%20Sprint%20in%20openSprints()",
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.outcomeOpenIssues = jsonData.total;

          console.log("outcome open issues: " + jsonData.total);
        });

      // fetch the outcome in progress issues

      fetch(
        'https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20OUTCOME%20AND%20status%20%3D%20"In%20Progress"%20AND%20Sprint%20in%20openSprints()',
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.outcomeInProgressIssues = jsonData.total;
        });

      // fetch the outcome in review issues

      fetch(
        'https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20OUTCOME%20AND%20status%20%3D%20"In%20Review"%20AND%20Sprint%20in%20openSprints()',
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.outcomeInReviewIssues = jsonData.total;
        });

      // fetch the outcome closed issues

      fetch(
        "https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20OUTCOME%20AND%20status%20in%20(Closed%2C%20Resolved)%20AND%20Sprint%20in%20openSprints()",
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.outcomeClosedIssues = jsonData.total;
        });

      // fetch the campus connect open issues

      fetch(
        'https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20CC%20AND%20status%20in%20("Needs%20Scoping"%2C%20"On%20Hold"%2C%20Open%2C%20Reopened)%20AND%20Sprint%20in%20openSprints()',
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.campusConnectOpenIssues = jsonData.total;
        });

      // fetch the campus connect in progress issues

      fetch(
        'https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20CC%20AND%20status%20%3D%20"In%20Progress"%20AND%20Sprint%20in%20openSprints()',
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.campusConnectInProgressIssues = jsonData.total;
        });

      // fetch the campus connect in review issues

      fetch(
        'https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20CC%20AND%20status%20%3D%20"In%20Review"%20AND%20Sprint%20in%20openSprints()',
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.campusConnectInReviewIssues = jsonData.total;
        });

      // fetch the campus connect closed issues

      fetch(
        "https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20CC%20AND%20status%20in%20(Closed%2C%20Resolved)%20AND%20Sprint%20in%20openSprints()",
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log("Test1");
          this.campusConnectClosedIssues = jsonData.total;
        });

      // fetch the spiral robot open issues

      fetch(
        'https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20SPIRAL%20AND%20status%20in%20("Needs%20Scoping"%2C%20"On%20Hold"%2C%20Open%2C%20Reopened)%20AND%20Sprint%20in%20openSprints()',
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.spiralRobotOpenIssues = jsonData.total;
        });

      // fetch the spiral robot in progress issues

      fetch(
        'https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20SPIRAL%20AND%20status%20%3D%20"In%20Progress"%20AND%20Sprint%20in%20openSprints()',
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.spiralRobotInProgressIssues = jsonData.total;
        });

      // fetch the spiral robot in review issues

      fetch(
        'https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20SPIRAL%20AND%20status%20%3D%20"In%20Review"%20AND%20Sprint%20in%20openSprints()',
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.spiralRobotInReviewIssues = jsonData.total;
        });

      // fetch the spiral robot closed issues

      fetch(
        "https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20SPIRAL%20AND%20status%20in%20(Closed%2C%20Resolved)%20AND%20Sprint%20in%20openSprints()",
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.spiralRobotClosedIssues = jsonData.total;

          setTimeout(function() {
            console.log("Test2");
            google.charts.load("current", { packages: ["corechart", "bar"] });
            google.charts.setOnLoadCallback(jira.drawChart);
          }, 3000);
        });
    },
    drawChart: function() {
      var data = google.visualization.arrayToDataTable([
        [
          "Status",
          "Open / To do",
          { role: "annotation" },
          "In progress",
          { role: "annotation" },
          "In review",
          { role: "annotation" },
          "Resolved / Closed",
          { role: "annotation" }
        ],

        [
          "Outcome",
          this.outcomeOpenIssues,
          this.outcomeOpenIssues,
          this.outcomeInProgressIssues,
          this.outcomeInProgressIssues,
          this.outcomeInReviewIssues,
          this.outcomeInReviewIssues,
          this.outcomeClosedIssues,
          this.outcomeClosedIssues
        ],

        [
          "Campus Connect",
          this.campusConnectOpenIssues,
          this.campusConnectOpenIssues,
          this.campusConnectInProgressIssues,
          this.campusConnectInProgressIssues,
          this.campusConnectInReviewIssues,
          this.campusConnectInReviewIssues,
          this.campusConnectClosedIssues,
          this.campusConnectClosedIssues
        ],

        [
          "Spiral Robot",
          this.spiralRobotOpenIssues,
          this.spiralRobotOpenIssues,
          this.spiralRobotInProgressIssues,
          this.spiralRobotInProgressIssues,
          this.spiralRobotInReviewIssues,
          this.spiralRobotInReviewIssues,
          this.spiralRobotClosedIssues,
          this.spiralRobotClosedIssues
        ]
      ]);

      var options_fullStacked = {
        isStacked: "percent",
		title: "	Jira tracking snapshot",
		
        titlePosition: "top",
        titleTextStyle: {
			          alignment: "center",

          color: "white",
		  fontSize: 35,
		  
        },
        legend: {
          position: "bottom",
          alignment: "center",
          maxLines: 2,
          textStyle: { color: "white", fontSize: 16 }
        },
        hAxis: {
          ticks: [],
          baselineColor: "transparent"
        },
        colors: ["#ac4c38", "#8013ec", "#1919e6", "darkgreen"],
        backgroundColor: "transparent",

        vAxis: {
          textStyle: { color: "white", fontSize: 30 }
        },
        height: "100%",
        width: "100%"
      };
      var chart = new google.visualization.BarChart(
        document.getElementById("jiraData")
      );
      chart.draw(data, options_fullStacked);
    }
  },

  mounted() {
    this.scheduleJiraFetch();
    this.jiraFetch();
  }
};
</script>

<style scoped>
</style>

