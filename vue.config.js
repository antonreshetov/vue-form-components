const isDev = process.env.NODE_ENV === 'development'
const isDocs = process.env.APP_TARGET === 'docs'

module.exports = {
  baseUrl: isDocs ? '/vue-form-components/' : '/',

  chainWebpack: config => {
    config.entryPoints.delete('app')

    if (isDocs) {
      config
        .entry('docs')
        .add('./example/main.js')
        .end()
        .plugin('html')
        .tap(args => {
          args[0].template = './example/index.html'
          return args
        })
    }
    if (isDev) {
      config
        .entry('dev')
        .add('./dev/main.js')
        .end()
        .plugin('html')
        .tap(args => {
          args[0].template = './dev/index.html'
          return args
        })
    }
  }
}
