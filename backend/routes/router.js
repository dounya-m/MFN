const express = require('express')
const router = express.Router()
const api = '/api/mfn/'

router.use(`${api}admin`, require('./admin/AdmineRoute'))
router.use(`${api}user`, require('./user/UserRoutes'))
router.use(`${api}company`, require('./company/CompanyRoutes'))

module.exports = router