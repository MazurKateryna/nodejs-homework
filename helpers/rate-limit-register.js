const rateLimit = require('express-rate-limit')
const { HttpCode } = require('./constants')

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  handler: (req, res, next) => {
    return res.json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message:
          'Too many registrations. No more than two per hour from one IP',
    })
  },
})

module.exports = { createAccountLimiter }
