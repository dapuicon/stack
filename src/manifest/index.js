'use strict'

// const {CLIError} = require('@oclif/errors')
const fs = require('fs')
const yaml = require('js-yaml')

const schema = require('./schema')

const internals = {}

internals.read = ({file}) => {
  const fileContents = fs.readFileSync(file, 'utf8')
  const data = yaml.safeLoad(fileContents)

  return schema.validate(data, {abortEarly: false})
}

internals.normalizeRelease = release => {
  const normalized = {
    name: release.name,
    namespace: release.namespace,
    chart: {},
    values: {},
  }

  // Chart -> name
  if (release.chart.name) {
    normalized.chart.name = release.chart.name
  } else {
    normalized.chart.name = release.name
  }

  // Chart -> version
  if (release.chart.version) {
    normalized.chart.version = release.chart.version
  } else {
    normalized.chart.version = release.chart
  }

  // Values -> name
  if (release.values.name) {
    normalized.values.name = release.values.name
  } else {
    normalized.values.name = release.name
  }

  // Values -> version
  if (release.values.version) {
    normalized.values.version = release.values.version
  } else {
    normalized.values.version = release.values
  }

  return normalized
}

internals.normalize = releases => {
  return releases.map(internals.normalizeRelease)
}

const get = ({file}) => {
  const {value, error} = internals.read({file})
  if (error) return ({error})
  // if (error) throw new CLIError(error)
  // const manifest = internals.normalize(value)
  return {manifest: value}
}

// eslint-disable-next-line no-multi-assign
exports = module.exports = {get}
