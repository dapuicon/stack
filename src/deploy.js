const Release = require('./release')

const run = function ({file}) {
  const {releases, error} = Release.get({file})
  // eslint-disable-next-line no-console
  console.log(releases)
  return {error}
}

module.exports = {
  run: run,
}
