const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()
const ACCESS_KEY = process.env.ACCESS_KEY

const register = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
      return res.json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email in use',
      })
    }

    const newUser = await Users.create(req.body)
    return res.json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user.validPassword(password)
    if (!user || !isValidPassword) {
      return res.json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'Unauthorized',
        message: 'Email or password is wrong',
      })
    }

    const id = user._id
    const payload = { id }
    const token = jwt.sign(payload, ACCESS_KEY, { expiresIn: '12h' })
    await Users.updateToken(id, token)
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { token },
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const userId = req.user.id
    const loggedUser = await Users.findById(userId)

    if (loggedUser) {
      await Users.updateToken(userId, null)
      return res.json({})
    } else {
      return res.json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'Unauthorized',
        message: 'Not authorized',
      })
    }
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  try {
    const userId = req.user.id
    const currentUser = await Users.findById(userId)

    if (currentUser) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          email: currentUser.email,
          subscription: currentUser.subscription,
        },
      })
    } else {
      return res.json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'Unauthorized',
        message: 'Not authorized',
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  register,
  login,
  logout,
  current
}
