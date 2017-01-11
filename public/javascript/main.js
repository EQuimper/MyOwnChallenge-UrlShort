/* eslint-disable */

axios.defaults.baseURL = '/api/v1';

const app = new Vue({
  el: '#app',
  data: {
    url: '',
    getShort: false,
    top5Lists: [],
    loading: false,
    error: false,
    loadingPrc: 0,
    loadingClass: 'progress-bar progress-bar-striped active'
  },
  created: function () {
    this.loading = true;
  },
  mounted: function () {
    $('#btn-short').tooltip();
    new Clipboard('#btn-short');
    axios.get('/getTop5')
      .then(
        res => {
          this.top5Lists = res.data.urls;
          const int = setInterval(() => {
            if (this.loadingPrc === 100) {
              this.loading = false;
              clearInterval(int);
            }
            this.loadingPrc = this.loadingPrc + 2;
          }, 20)
        },
        err => {
          this.loading = false;
          this.error = true;
        }
      )
  },
  methods: {
    urlSub: function (e) {
      axios.post('/shorten', { longUrl: this.url })
        .then(
          res => {
            this.getShort = true;
            this.url = `http://shneed.com/${res.data.url.shortUrl}`;
          },
          err => console.log(err)
        )
    },
    reset: function() {
      this.url = '',
      this.getShort = false
    }
  }
});
