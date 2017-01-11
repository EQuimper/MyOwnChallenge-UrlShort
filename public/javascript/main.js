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
    axios.get('/getTop5', {
      onDownloadProgress: e => {
        console.log(e.loaded);
        console.log(e.total);
        console.log(e);
        if (e.lengthComputable) {
          this.loadingPrc = e.loaded / e.total;
          console.log(this.loadingPrc);
        }
      }
    })
      .then(
        res => {
          this.top5Lists = res.data.urls;
          this.loading = false;
        },
        err => {
          this.loading = false
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
