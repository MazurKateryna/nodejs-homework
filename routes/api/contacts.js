const express = require('express')
const router = express.Router()
const validation = require('./validation')
const contactsControllers = require('../../controllers/contacts')

router
  .get('/', contactsControllers.listContacts)
  .post('/', validation.addContact, contactsControllers.addContact)

router
  .get('/:contactId', contactsControllers.getContactById)
  .patch(
    '/:contactId',
    validation.updateContact,
    contactsControllers.updateContact,
  )
  .delete('/:contactId', contactsControllers.removeContact)

module.exports = router
