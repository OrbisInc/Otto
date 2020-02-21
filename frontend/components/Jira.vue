<!-- The component for the Jira pane (bottom-right). This pane displays information about Jira to users.
      
      This Vue JS component is called in index.vue. It uses the Jira API to find the total number of issues in the current sprint, displayed for each team. A stacked bar graph (from Google Charts - called in app.html) for each team is displayed by Issue Status - Open, In Progress, In Review, and Closed. The data is updated dynamically according to the scheduling program (node-schedule), and was initially set to refresh once a minute.

-->

<template>    <!--  the Vue template determines what actually gets written to the DOM. -->
  <section class="ticker__container">
    <JiraGraph/>
    <JiraBadges/>
  </section>
</template>

<script>
  import JiraGraph from "../components/childComponents/JiraGraph";
  import JiraBadges from "../components/childComponents/JiraBadges";

  export default {                    
    name: "Jira",                         
    components: {
      JiraGraph,
      JiraBadges
    },
    methods: {
      
      oAuthTwoAttempt: function() {
        var redirectURL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=VA7mRLqZTSdJv5711Rx8PuVH69cou7O0&scope=read%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=5555&response_type=code&prompt=consent`;
        this.redirectedRecently = true;
        window.location.href = redirectURL;
      },
      getParameterByName: function(name, url) {
        if (!url) url = window.location.search;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      },
      oAuthExchange: function() {
        var authCode = this.getParameterByName("code", window.location.search);
        var headers = {
          "Content-Type": "application/json"
        };
        var jiraData =
          '"grant_type": "authorization_code","client_id": "VA7mRLqZTSdJv5711Rx8PuVH69cou7O0","client_secret": "hA1bUi58y6cejWTJ-PYPcySmiBgTaBbNfxLCS51HZ1eS8bufFefqKUBjI-4ndT3l","code": "' +
          authCode +
          '","redirect_uri": "http%3A%2F%2Flocalhost%3A3000"';

        fetch("https://auth.atlassian.com/oauth/token", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(jiraData)
        })
          .then(response => {
            return response.json();
          })
          .then(jsonData => {});
      }
    },
  };
</script>

<!-- Any styles for this component. These styles are scoped meaning they only hold value within the component. -->
<style scoped>

</style>