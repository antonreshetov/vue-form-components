module.exports = {
  baseUrl:
    process.env.NODE_ENV === 'production' ? '/vue-form-components/' : '/',
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'example/index.html',
      filename: 'index.html'
    }
  }
}
