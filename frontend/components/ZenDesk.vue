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
            <button type="button" class="modal__btn--close js--close--modal" @click="oAuthorizatonCodeGet"><i class="material-icons">ZenDesk Call</i></button>
            <span>All Unresponded</span>
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
      Unresponded: "",
      Unsolved: "",
      PassedSLA: "",
      All: ""
    };
  },
  methods: {
    getParameterByName: function(name, url) {
      if (!url) url = window.location.search;
          name = name.replace(/[\[\]]/g, '\\$&');
          var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    oAuthorizatonCodeGet: function() {
        var redirect_uri = encodeURI('http://localhost:3000')
        var client_id = encodeURI('otto_integration')
        var state = '555'
        var givenString = 'https://{subdomain}.zendesk.com/oauth/authorizations/new?response_type=code&redirect_uri={your_redirect_url}&client_id={your_unique_identifier}&scope=read%20write'
        var redirectURI = 'https://orbiscommunications.zendesk.com/oauth/authorizations/new?response_type=code&redirect_uri=' + redirect_uri + '&client_id=' + client_id + '&scope=read'
        console.log(givenString);
        console.log(redirectURI);
        window.location.href = redirectURI;
    },
    oAuthorizationExchange: function() {
        var authCode = encodeURI(this.getParameterByName("code", window.location.search));
        var client_id = encodeURI('otto_integration')
        var secret = encodeURI('bb44c63e802b402b6c5e4ad611e4ee662f0857f47ef62e2643e1169ef678a14a')
        var redirect_uri = encodeURI('http://localhost:3000')
        console.log("Auth Code: " + authCode);
        var headers = {                                         
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin": "*"
        }; 
        var zenDeskData = 
          {
             "grant_type": "authorization_code",
             "code": authCode,
             "client_id": client_id,
             "client_secret": secret,
             "redirect_uri": redirect_uri,
             "scope": '["tickets:read"]'
          }
          console.log(zenDeskData);
          fetch(
            'https://orbiscommunications.zendesk.com/oauth/tokens',
            {
              method: "POST",
              headers: headers,
              data: zenDeskData
            })
            .then(response => {
              return response.json();
            })
            .then(jsonData => {
              var oAuthToken = 'some response'
              // this.oAccessTokenCall(oAuthToken)
            });
    },

    oAccessWithTokenCall: function(oAuthToken) {
      var headers = {                                         
          "Authorization" : "Bearer " + 'dda80502a0fc70f73c300e567ed8d5a7e40b71183f45ae4a805375368485cec4',
          "Content-Type" : "application/json"
        }; 
        fetch(
            'https://orbiscommunications.zendesk.com/api/v2/search.json?query=type:ticket status:Open',
            {
              method: "GET",
              headers: headers,
            })
            .then(response => {
              return response.json();
            })
            .then(jsonData => {
              this.Unsolved = jsonData.count;
            });
         fetch(
            'https://orbiscommunications.zendesk.com/api/v2/search.json?query=type:ticket status:New',
            {
              method: "GET",
              headers: headers,
            })
            .then(response => {
              return response.json();
            })
            .then(jsonData => {
              this.Unresponded = jsonData.count;
            });
          fetch(
            'https://orbiscommunications.zendesk.com/api/v2/search.json?query=type:ticket status:Solved',
            {
              method: "GET",
              headers: headers,
            })
            .then(response => {
              return response.json();
            })
            .then(jsonData => {
              this.PassedSLA = jsonData.count;
            });
          var self = this;
          setTimeout(function() {
            self.All = self.Unresponded + self.PassedSLA + self.Unsolved
          }, 3000)
    },
    scheduleZenDeskUpdate: function() {
      var self = this;
      schedule.scheduleJob('*/1 * * * *', function(){
        console.log("ZenDesk Called.");
        self.oAccessWithTokenCall();
      });
    },
  },
  mounted() {
    this.oAuthorizationExchange()
    this.oAccessWithTokenCall()
    this.scheduleZenDeskUpdate()
  }
};
</script>

<style scoped>
</style>
