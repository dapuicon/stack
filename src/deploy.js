const Manifest = require('./manifest')

const run = function ({file}) {
  const {manifest, error} = Manifest.get({file})
  // eslint-disable-next-line no-console
  console.log(manifest)
  return {error}
}

module.exports = {
  run: run,
}
