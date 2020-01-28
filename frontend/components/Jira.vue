<!-- The component for the Jira pane (bottom-right). This pane displays information about Jira to users.
 -->


<template>
      <section class="ticker__container">
        <ul class="list--plain ticker" id="ticker04">
          <li class="ticker__item">
            <div>Team Sprint Details</div>
          </li>
        </ul>
      </section>
</template>

<script>
    export default {
          name: 'Jira',
         data() {
           return {

           }
         },
         methods: {
          jiraAPICall: function() {
            let useremail = 'coopthree@orbiscommunications.com'
            let api_token = 'tAe1rrWGwsJgboUXjIgH13DA'
            let encodedHeader = btoa(useremail + ':' + api_token)
            var headers = {
                "Authorization": "Basic " + encodedHeader,
                "Content-Type": "application/json"                         
            }
              fetch('https://orbisinc.atlassian.net/rest/api/3/search?jql=Sprint%20%3D%2019%20order%20by%20created%20DESC&fields=status,customfield_10127', {
                method: 'GET',
                headers: headers
            })  
              .then((response) => {
                return response.json();
              })
              .then((jsonData) => {
                this.weatherInformation = jsonData.list;
              })
          }
        },
        mounted() {
            //  this.jiraAPICall();
          }
    }
</script>

<style scoped>

</style>