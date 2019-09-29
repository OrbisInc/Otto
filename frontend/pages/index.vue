<template>
  <div class="voltron">
    <div class="tickers">
      <section class="ticker__container">
        <ul class="list--plain ticker" id="ticker01">
          <li class="ticker__item">
            <div>"Twenty years from now, you will be more disappointed by the things that you didn't do than by the ones
              you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your
              sails.
              Explore. Dream. Then, gaze at the stars and realize you're in a simulation."
            </div>
          </li>
          <li class="ticker__item">
            <div>"Twenty years from now, you will be more disappointed by the things that you didn't do than by the ones
              you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your
              sails.
              Explore. Dream. Then, gaze at the stars and realize you're in a simulation."
            </div>
          </li>
          <li class="ticker__item">
            <div>"Twenty years from now, you will be more disappointed by the things that you didn't do than by the ones
              you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your
              sails.
              Explore. Dream. Then, gaze at the stars and realize you're in a simulation."
            </div>
          </li>
          <li class="ticker__item">
            <div>"Twenty years from now, you will be more disappointed by the things that you didn't do than by the ones
              you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your
              sails.
              Explore. Dream. Then, gaze at the stars and realize you're in a simulation."
            </div>
          </li>
        </ul>
      </section>
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

    <Announcement/>

  </div>
</template>

<script>
    import Weather from "../components/widgets/Weather"
    import Birthdays from "../components/widgets/Birthdays";
    import Events from "../components/widgets/Events";
    import Vacations from "../components/widgets/Vacations";
    import Announcement from "../components/Announcement";

    export default {
        components: {
            Events,
            Birthdays,
            Weather,
            Vacations,
            Announcement
        },
        methods: {
            getAnnouncements: function () {
                let _this = this;
                this.$socket.get('/announcement',
                    (body, response) => {
                        _this.$store.commit('announcement/set', body);
                    });
            },
            startSlider: () => {
                let slider01 = tns({
                    container: '#ticker01',
                    items: 1,
                    slideBy: 'page',
                    controls: false,
                    nav: false,
                    autoplayButtonOutput: false,
                    speed: 3000,
                    autoplay: true,
                    autoplayTimeout: 5000
                });
            },

            registerSocketEvents: function () {
                let _this = this;
                this.$socket.on("announcement", res => {
                    console.log(res);
                    _this.$store.commit(`announcement/${res.verb}`, res.data)
                });
            }
        },
        mounted() {
            this.startSlider();
            this.getAnnouncements();
            this.registerSocketEvents();
        }
    }
</script>
