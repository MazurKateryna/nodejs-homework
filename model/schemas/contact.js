const mongoose = require('mongoose')
<<<<<<< HEAD
const { Schema, model } = mongoose
=======
const { Schema, model, SchemaTypes } = mongoose
const mongoosePaginate = require('mongoose-paginate-v2')
>>>>>>> hw04-auth

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      min: 3,
<<<<<<< HEAD
      max: 10,
=======
      max: 30,
>>>>>>> hw04-auth
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
<<<<<<< HEAD
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
=======
    },
    phone: {
      type: String,
      required: [true, 'Set email for contact'],
>>>>>>> hw04-auth
      unique: true,
      min: 10,
    },
    subscription: {
      type: String,
<<<<<<< HEAD
      required: [true, 'Set subscription for contact'],
    },
    password: {
      type: String,
      required: [true, 'Set password for contact'],
      unique: true,
      min: 5,
    },
    token: String,
=======
      default: 'free',
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
>>>>>>> hw04-auth
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

<<<<<<< HEAD
=======
contactSchema.plugin(mongoosePaginate)
>>>>>>> hw04-auth
const Contact = model('contact', contactSchema)

module.exports = Contact
