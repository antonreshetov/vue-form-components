const isProd =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'docs'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  baseUrl: isProd ? '/vue-form-components/' : '/',

  chainWebpack: config => {
    config.entryPoints.delete('app')

    if (isProd) {
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
