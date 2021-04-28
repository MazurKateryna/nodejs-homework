const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcryptjs')
const { Subscription } = require('../../helpers/constants')
const SALT_WORK_FACTOR = 8

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      validate(value) {
        const reg = /\S+@\S+\.\S+/
        return reg.test(String(value).toLowerCase())
      },
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: 5,
    },
    subscription: {
      type: String,
      enum: {
        values: [
          Subscription.FREE,
          Subscription.PRO,
          Subscription.PREMIUM,
        ],
        message: "It is'nt allowed",
      },
      default: Subscription.FREE,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  this.password = await bcrypt.hash(this.password, salt, null)
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
