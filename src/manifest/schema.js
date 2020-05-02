const {semver} = require('joi-extension-semver')
const Joi = require('@hapi/joi').extend(semver)

const chart = Joi.object({
  name: Joi.string().required(),
  version: Joi.semver().valid().required(),
})

const values = Joi.object({
  name: Joi.string().required(),
  version: Joi.semver().valid().required(),
})

const release = Joi.object({
  name: Joi.string().required(),
  namespace: Joi.string().required(),
  chart, //: chart.required(),
  values, //: values.required(),
})

const releases = Joi.array().items(release)
const repositories = Joi.array().items(Joi.object().pattern(Joi.string(), Joi.string().uri()))

module.exports = Joi.object({
  releases,
  repositories,
})
