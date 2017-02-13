function buildConfig(env) {
  return require(`./${env || 'dev'}.webpack.config.js`)({env})
}

module.exports = buildConfig;
