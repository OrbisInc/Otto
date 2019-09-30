<template>
  <div class="voltron">
    <div class="tickers">

      <Announcement />

      <section class="ticker__container">
        <ul class="list--plain ticker" id="ticker02">
          <li class="ticker__item">
            <div>Upcoming Deployments</div>
          </li>
        </ul>
      </section>
      <section class="ticker__container">
        <ul class="list--plain is--quad ticker" id="ticker03">
          <li class="ticker__item is--quad">
            <div>
              <span>Unresonded To</span>
              <span>88</span>
            </div>
          </li>
          <li class="ticker__item is--quad">
            <div>
              <span>All Unsolved</span>
              <span>168</span>
            </div>
          </li>
          <li class="ticker__item is--quad">
            <div>
              <span>Total Passed SLA</span>
              <span>8</span>
            </div>
          </li>
          <li class="ticker__item is--quad">
            <div>
              <span>All</span>
              <span>888</span>
            </div>
          </li>

        </ul>
      </section>
      <section class="ticker__container">
        <ul class="list--plain ticker" id="ticker04">
          <li class="ticker__item">
            <div>Team Sprint Details</div>
          </li>

        </ul>
      </section>
    </div>

    <aside class="ticker__aside padding--a--s">
      <Weather/>
      <Birthdays/>
      <Events/>
      <Vacations/>
    </aside>

    <Alert/>

  </div>
</template>

<script>
    import Weather from "../components/widgets/Weather"
    import Birthdays from "../components/widgets/Birthdays";
    import Events from "../components/widgets/Events";
    import Vacations from "../components/widgets/Vacations";
    import Alert from "../components/Alert";
    import Announcement from "../components/Announcement";

    export default {
        components: {
            Announcement,
            Events,
            Birthdays,
            Weather,
            Vacations,
            Alert
        },
        methods: {
            loadData: function () {
                let _this = this;

                ["announcement", "alert"]
                    .forEach(function (api) {
                        _this.$socket.get(`/${api}`,
                            (body, response) => {
                                _this.$store.commit(`${api}/set`, body);
                            });
                    });
            },
            registerSocketEvents: function () {
                let _this = this;

                ["announcement", "alert"]
                    .forEach(function (api) {
                        _this.$socket.on(api, res => {
                            _this.$store.commit(`${api}/${res.verb}`, res.data)
                        });
                    });
            }
        },
        mounted() {
            this.registerSocketEvents();
            this.loadData();
        }
    }
</script>
