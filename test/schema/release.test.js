const {expect} = require('chai')
const schema = require('../../src/release/schema')

describe('schema - release', () => {
  it('Error - Chart and Values is required', () => {
    const release = [
      {
        name: 'supergrafana',
        namespace: 'istio-system',
      },
    ]
    const result = schema.validate(release, {abortEarly: false})

    expect(result.error.details).has.length(2)
  })

  it('Release - minimum properties', () => {
    const release = [
      {
        name: 'reloader',
        namespace: 'openapi',
        chart: '5.0.1',
        version: '1.1.2',
      },
    ]
    const result = schema.validate(release, {abortEarly: false})

    // eslint-disable-next-line no-unused-expressions
    expect(result.error).to.be.undefined
  })

  it('Release - Complete Chart, values with version', () => {
    const release = [
      {
        name: 'reloader',
        namespace: 'openapi',
        chart: {
          name: 'reloader-dev',
          version: '5.0.1',
        },
        version: '1.1.2',
      },
    ]
    const result = schema.validate(release, {abortEarly: false})

    // eslint-disable-next-line no-unused-expressions
    expect(result.error).to.be.undefined
  })

  it('Release - All properties', () => {
    const releases = [
      {
        name: 'reloader',
        namespace: 'openapi',
        chart: {
          name: 'reloader-dev',
          version: '5.0.1',
        },
        version: {
          name: 'reloadercloud',
          version: '1.1.2',
        },
      },
    ]
    const result = schema.validate(releases, {abortEarly: false})

    // eslint-disable-next-line no-unused-expressions
    expect(result.error).to.be.undefined
  })
})
