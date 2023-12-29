const { Router } = require('express')
const router = Router()
const controller = require('./controller')
router
  .use('/proxy', controller.proxy)
  // .use('/sockjs-node', controller.proxy)
  .get('/install', controller.install)
  .get('/auth', controller.auth)
  .get('/home', controller.home)
  .get('/authorize', controller.inClientAuthorize)
  .post('/onauthorized', controller.inClientOnAuthorized)
  .post('/uninstall', controller.uninstall) //fix added by Calla

module.exports = router
