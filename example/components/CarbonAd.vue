<script>
export default {
  watch: {
    $route (to, from) {
      if (
        to.path !== from.path &&
        this.$el.querySelector('#carbonads')
      ) {
        this.$el.innerHTML = ''
        this.load()
      }
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      const s = document.createElement('script')
      s.id = '_carbonads_js'
      s.src = `//cdn.carbonads.com/carbon.js?serve=CK7DEK7I&placement=antonreshetovgithubio`
      this.$el.appendChild(s)
    }
  },
  render (h) {
    return h('div', { class: 'carbon' })
  }
}
</script>

<style lang="scss">
.carbon {
  position: absolute;
  min-height: 250px;
  max-width: 180px;
  font-size: 0.9rem;
  line-height: 1.4em;
  padding-bottom: 10px;
  a {
    color: #444!important;
    font-weight: normal;
    text-decoration: none;
  }
  .carbon-img {
    img {
      display: block;
      margin: 10px 0;
      border: 1px solid #ddd;
    }
  }
  .carbon-text {
    // width: 130px;
    display: block;
  }
  .carbon-poweredby {
    color: #999;
    display: block !important;
    margin-top: 0.5em;
  }
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
