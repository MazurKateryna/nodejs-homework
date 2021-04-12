const express = require('express')
const router = express.Router()
const validate = require('./validation')
const contactsControllers = require('../../controllers/contacts')

router
  .get('/', contactsControllers.listContacts)
  .post('/', validate.addContact, contactsControllers.addContact)

router
  .get('/:contactId', contactsControllers.getContactById)
  .patch(
    '/:contactId',
    validate.updateContact,
    contactsControllers.updateContact,
  )
  .delete('/:contactId', contactsControllers.removeContact)

module.exports = router
