<!-- 
The component for the ZenDesk Pane (bottom-left) of the large pane.
This pane is used to display information about ZenDesk to the users.
 -->

<template>
  <section id="ZenDesk" class="ticker__container">
    <client-only>
      <ul class="list--plain is--quad ticker" id="ticker03">
        <li class="ticker__item is--quad">
          <div>
            <span>Unresponded To</span>
            <span>{{Unresponded}}</span>
          </div>
        </li>
        <li class="ticker__item is--quad">
          <div>
            <span>All Unsolved</span>
            <span>{{Unsolved}}</span>
          </div>
        </li>
        <li class="ticker__item is--quad">
          <div>
            <span>Total Passed SLA</span>
            <span>{{PassedSLA}}</span>
          </div>
        </li>
        <li class="ticker__item is--quad">
          <div>
            <span>All</span>
            <span>{{All}}</span>
          </div>
        </li>
      </ul>
    </client-only>
  </section>
</template>


<script>
import schedule from 'node-schedule'

export default {
  name: "ZenDesk",
  data() {
    return {
      zenDeskJson: "5",
      Unresponded: "55",
      Unsolved: "555",
      PassedSLA: "53",
      All: "5355"
    };
  },
  methods: {
    zenDeskAPICall: function() {
      let useremail = 'coopthree@orbiscommunications.com'
      let password = 'tAe1rrWGwsJgboUXjIgH13DA'
      let encodedHeader = btoa(useremail + ':' + password)
      var headers = {
        Authorization: "Basic " + password,
        "Content-Type": "application/json"
      };
      fetch(
        "https://xxxxxx.zendesk.com/api/v2/help_center/en-us/articles.json",
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.Unresponded = jsonData;
          this.Unsolved = jsonData;
          this.PassedSLA = jsonData;
          this.All = jsonData;
        });
    },
    scheduleDate: function() {
      var self = this;
      schedule.scheduleJob('*/1 * * * *', function(){
        console.log("ZenDesk Called.");
        this.zenDeskAPICall();
      });
    },
  },
  mounted() {
    //  this.scheduleDate();
  }
};
</script>

<style scoped>
</style>
