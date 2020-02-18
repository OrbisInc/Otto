<!-- The component for the Jira pane (bottom-right). This pane displays information about Jira to users.
      
      This Vue JS component is called in index.vue. It uses the Jira API to find the total number of issues in the current sprint, displayed for each team. A stacked bar graph (from Google Charts - called in app.html) for each team is displayed by Issue Status - Open, In Progress, In Review, and Closed. The data is updated dynamically according to the scheduling program (node-schedule), and was initially set to refresh once a minute.

-->

<template>    <!--  the Vue template determines what actually gets written to the DOM. -->
  <section class="ticker__container">
    <ul class="list--plain ticker" id="ticker04">
      <li class="ticker__item">
        <!-- Team Sprint Details text to be displyed directly to the screen could go here, for example--> 
        <div id="jiraData"></div>
        <!-- BUT, the Stacked Bar Chart will be written in this div!!! -->
      </li>

    </ul>

    <client-only>
      <vue-tiny-slider v-if="this.recentIssues.length" ref="tinySlider"
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
          <div class="badgeSummary"> {{ m[0] }} : {{m[2]}} </div>
        </div>
      </vue-tiny-slider>
    </client-only>


      <div class="jiraBadge marginUp">
         <div class="jiraKey">
         </div>
         <div class="jiraStatus">
            Recently <br> Updated:            
         </div>
      </div>

      


      <div class="jiraBadge" v-for="badge in recentIssues " :key="badge[0]">
         <div class="jiraKey">
           {{ badge[0]  
           
           }}
         </div>
         <div class="jiraStatus">
             {{ badge[1] }} 
         </div>
      </div>
    
  </section>
</template>

<script>
  import schedule from "node-schedule";     //this imported module permits scheduled updates

  export default {                          // this Vue component is made available to index.vue through the export command
    name: "Jira",                           // the name of the Vue "component"
    data() {                                // the variables to be used in this file are declared
      return {
        redirectedRecently: false,

        outcomeOpenIssues: 0,               // initialized to hold the number of open issues in the Outcome Team's current Sprint
        outcomeInProgressIssues: 0,         // ... and their issues that are "In Progress" ..
        outcomeInReviewIssues: 0,           // ... the Outcome Team's issues that have the status "In Review"
        outcomeClosedIssues: 0,             // ... and those that have the Status "Closed"

        campusConnectOpenIssues: 0,         // likewise 4 variables tracking the Status of the Issues for the Campus Connect Team
        campusConnectInProgressIssues: 0,
        campusConnectInReviewIssues: 0,
        campusConnectClosedIssues: 0,

        spiralRobotOpenIssues: 0,           // ... and the same for the Spiral Robot Team
        spiralRobotInProgressIssues: 0,
        spiralRobotInReviewIssues: 0,
        spiralRobotClosedIssues: 0,
        
        recentIssues: [],
        recentIssueKey: '',
        recentIssueStatusName: '',
        recentIssueSummary: ''
      };
    },
    methods: {                              // the methods to be used by the Vue Component Jira.vue
      scheduleJiraFetch: function() {       // this function schedules the use of jiraFetch
        var self = this;
        schedule.scheduleJob("*/1 * * * *", function() {    // scheduling a "refresh" each minute
          console.log("fetching ... ");
          self.jiraFetch();                 // and actually running the fetch and chart draw calls 
        });
      },
      
      // jiraFetch a method that fetches the number of Issues in each category for each of the three teams,
      // and then calls the method that actually draws the chart

      jiraFetch: function() {
        let jira = this;                                        // a variable to clarify the use of the keyowrd "this"
        let useremail = "coopthree@orbiscommunications.com";    // a login to sign in to Jira
        let api_token = "tAe1rrWGwsJgboUXjIgH13DA";             // ... and a token to Authenticate that user.
        let encodedHeader = btoa(useremail + ":" + api_token);  // the process for Basic Authentication, found at: 
        var headers = {                                         // https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/
          "Authorization": "Basic " + encodedHeader,
          "Content-Type": "application/json"
        };

        // next fetch the Outcome Team's Issues for the current Sprint, by Status. First, their Open Issues: ie. Issues where the Status is coded as "Needs Scoping", "On Hold", "Open", or "Reopened." First, fetching from the URL that the Jira API makes avalable for this purpose:

        fetch(
          'https://orbisinc.atlassian.net/rest/api/3/search?jql=project%20%3D%20OUTCOME%20AND%20status%20in%20(%22Needs%20Scoping%22%2C%20%22On%20Hold%22%2C%20Open%2C%20Reopened)%20AND%20Sprint%20in%20openSprints()',
          {
            method: "GET",
            headers: headers
          }
        )
          .then(response => {
            return response.json();               // ... then returning the fetched JSON object from Jira ...
          })
          .then(jsonData => {
            this.outcomeOpenIssues = jsonData.total;    // ... and extracting the Total number of Issues of this type, storing it in outcomeOpenIssues
          });

        // Next fetch the Outcome Team's In Progress Issues for the current Sprint, by Status, similar to the Open Issues above, storing it in outcomeInProgressIssues.

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

        // Next fetch the Outcome Team's In Review Issues for the current Sprint, by Status, similar to the Open Issues above, storing it in outcomeInReviewIssues.

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

        // Finally for the Outcome Team, fetch their Closed Issues for the current Sprint, by Status, similar to the Open Issues above, storing it in outcomeClosedIssues. NOTE: Closed Issues also includes those that are Resolved.
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

        // Fetch the Campus Connect Team's Issues Statuses, as with the Outcome Team above.

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

        // Fetch the Campus Connect Team's In Progress Issues

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

        // Fetch the Campus Connect Team's In Review Issues

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

        // Fetch the Campus Connect Team's In Review Issues

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
            this.campusConnectClosedIssues = jsonData.total;
          });

        // Fetch the Spiral Team's Open Issues

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

        // Fetch the Spiral Robot Team's In Progress Issues

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

        // Fetch the Spiral Robot Team's In Review Issues

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

        // Fetch the Spiral Robot Team's Closed Issues

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
          // After gathering all the necessary data, load it into the Google Chart module, with sufficient delay so that the data can actually be loaded before the 3 Stacked Bar Charts are drawn. The setTimeout function ensures this.

            setTimeout(function() {
              google.charts.load("current", { packages: ["corechart", "bar"] });  // the chart data is loaded
              google.charts.setOnLoadCallback(jira.drawChart);                    // the drawChart function will be called ...
            }, 3000);                                                             // after a 3000 millisecond delay.
          });

                fetch(
            'https://orbisinc.atlassian.net/rest/api/3/search?jql=status%20changed%20during%20(-1h%2Cnow())',
          {
            method: "GET",
            headers: headers
          }
        )
          .then(response => {
            return response.json();
          })
          .then(jsonData => {

           if(this.recentIssues.length < jsonData.issues.length) {
             
            this.recentIssues = [];


            for (let i = 0; i < jsonData.issues.length; i++ ) {

              if (this.recentIssues.length > 3) {
                break;
              }
                this.recentIssueKey = jsonData.issues[i].key;
                this.recentIssueStatusName = jsonData.issues[i].fields.status.name;
                this.recentIssueSummary = jsonData.issues[i].fields.summary;              
                this.recentIssues.push( [this.recentIssueKey , this.recentIssueStatusName , this.recentIssueSummary] );
              }
              }




          });
      },

  // the Google Stacked Bar Chart package receives arrays of data in a predetermined structure, stored in several arrays that it imports into a data table. For further reference see: https://developers.google.com/chart/interactive/docs/gallery/barchart. 

      drawChart: function() {                               // this function builds the data table dynamically
        var data = google.visualization.arrayToDataTable([    
          [
            "Status",                             // the Title of the Legend
            "Open / To do",                       // the first legend item's color swatch
            { role: "annotation" },               // the first legend item's text annotation
            "In progress",                        // ... and so on for each item in the legend 
            { role: "annotation" },
            "In review",
            { role: "annotation" },
            "Resolved / Closed",
            { role: "annotation" }
          ],

          [
            "Outcome",                            // data for the first Stacked Bar of the Chart
            this.outcomeOpenIssues,               // the value fetched for the number of Open Issues for the Outcome Team is represented by a colored block in the graph 
            this.outcomeOpenIssues,               // that same value, duplicated here, is used to literally display the number corresponding that color block on the screen.
            this.outcomeInProgressIssues,         // ... and soon for Status of each Issue type for the Outcome Team in this Sprint
            this.outcomeInProgressIssues,
            this.outcomeInReviewIssues,
            this.outcomeInReviewIssues,
            this.outcomeClosedIssues,
            this.outcomeClosedIssues
          ],

          [
            "Campus Connect",
            this.campusConnectOpenIssues,         // similarly, the fetched data for the Campus Connect team's Open issues is used to draw a color block for that Team's Stacked bar ...
            this.campusConnectOpenIssues,         // ... and the text to go along with that color block.
            this.campusConnectInProgressIssues,   // ... for each Issue Status for the Campus Connect Team
            this.campusConnectInProgressIssues,
            this.campusConnectInReviewIssues,
            this.campusConnectInReviewIssues,
            this.campusConnectClosedIssues,
            this.campusConnectClosedIssues
          ],

          [
            "Spiral Robot",
            this.spiralRobotOpenIssues,           // the data array fetched for the Stacked Bar for the Spiral Robot Team is similarly stored.
            this.spiralRobotOpenIssues,
            this.spiralRobotInProgressIssues,
            this.spiralRobotInProgressIssues,
            this.spiralRobotInReviewIssues,
            this.spiralRobotInReviewIssues,
            this.spiralRobotClosedIssues,
            this.spiralRobotClosedIssues
          ]
        ]);

        var options_fullStacked = {               // this option sets the type of Chart to be drawn, in this case a Stacked Bar Chart.
          isStacked: "percent",                   // ... a "percent" chart spreads the data over the full length of the available axis.
          title: "	Jira Sprint Snapshot",      // The Title of the Chart.
          titlePosition: "top",                   // The Title is positioned at the top of the Chart area.
          titleTextStyle: {
            alignment: "center",                  // the Title's position in the area
            color: "white",                       // ... and its color
            fontSize: 35,	                        // ... and the size of the text.
          },
          legend: {                               // the Legend explains the way the data is corellated with the color acheme
            position: "bottom",                   // ... that it is positioned at the bottom of the chart area.
            alignment: "center",                  // ... it's alignment with respect to the chart
            maxLines: 2,                          // ... that only 2 lines of the legend wil be displayed at a time
            textStyle: { color: "white", fontSize: 16 } 
                                                  // ... and the characteristice of teh Legend's text
          },
          hAxis: {                                // characteristics of the horizontal axis of the chart
            ticks: [],                            // no descriptive ticks will be along the Chart's bars.
            baselineColor: "transparent"          // the default ticks, where called, will not be visible
          },
          colors: ["#ac4c38", "#8013ec", "#1919e6", "darkgreen"], // these are the colours of the actual Stacked Basd in the Chart
          backgroundColor: "transparent",         // the background color of the chart iwll also be invisible

          vAxis: {                                // the characteristics of the vertical axis of the chart
            textStyle: { color: "white", fontSize: 20 } // these text fields name the Teams
          },
          height: 650,                         // the Stacked Bars fill up as much of the available space as possible, vertically ...
          width: "100%"                           // ... and horizontally
        };
        var chart = new google.visualization.BarChart(  // this variable of the Chart script determines where it will be written ...
          document.getElementById("jiraData")           // .. that is, in the div "jiraData"
        );
        chart.draw(data, options_fullStacked);          // the chart is drawn
      },

      oAuthTwoAttempt: function () {   
        var redirectURL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=VA7mRLqZTSdJv5711Rx8PuVH69cou7O0&scope=read%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=5555&response_type=code&prompt=consent`
        this.redirectedRecently = true;
        window.location.href = redirectURL;
      },
      getParameterByName: function(name, url) {
          if (!url) url = window.location.search;
          name = name.replace(/[\[\]]/g, '\\$&');
          var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, ' '));
      },
      oAuthExchange: function () {
          var authCode = this.getParameterByName("code", window.location.search);
          var headers = {                                         
            "Content-Type" : "application/json"
          }; 
          var jiraData = '"grant_type": "authorization_code","client_id": "VA7mRLqZTSdJv5711Rx8PuVH69cou7O0","client_secret": "hA1bUi58y6cejWTJ-PYPcySmiBgTaBbNfxLCS51HZ1eS8bufFefqKUBjI-4ndT3l","code": "' + authCode + '","redirect_uri": "http%3A%2F%2Flocalhost%3A3000"'
          //  {
          //    "grant_type": encodeURI("authorization_code"),
          //    "client_id": encodeURI("VA7mRLqZTSdJv5711Rx8PuVH69cou7O0"),
          //    "client_secret": encodeURI("hA1bUi58y6cejWTJ-PYPcySmiBgTaBbNfxLCS51HZ1eS8bufFefqKUBjI-4ndT3l"),
          //    "code": encodeURI(authCode),
          //    "redirect_uri": encodeURI('http://localhost:3000')
          //  }
          console.log(jiraData);
          fetch(
            'https://auth.atlassian.com/oauth/token',
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify(jiraData)
            })
            .then(response => {
              return response.json();
            })
            .then(jsonData => {
            });
        }
    },

    mounted() {                                   // this Vue life cycle method contains methods so that they will be only implemented after the other code is mounted
      this.scheduleJiraFetch();                   // the time scheduling method commences after mounting ...
      this.jiraFetch();                           // as does the method to fetch data and draw the Chart.
      // this.oAuthExchange();
    }
  };
</script>

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
  color:black;
  font-weight: bold;
  border-radius: 2.0em;
  text-align: center;
  width: 90%;
  margin: auto;
  margin-top: 0.8em;
  font-size: 1.2em;
} 

.badgeSummary {
  font-size: 2.0em;
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