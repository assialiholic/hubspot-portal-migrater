class CommonMethods {
  fetch: any
  HubSpotClient: any
  config: any

  constructor() {
    this.fetch = require('node-fetch')
    this.HubSpotClient = require('hubspot-api')
    this.config = require('../config.json')
  }
}

module.exports = CommonMethods
