const Contacts = require('../model/index')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: contacts,
    })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: contact,
      })
    } else {
      return res.json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.json({
      status: 'success',
      code: 201,
      data: contact,
    })
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    )

    if (!req.body) {
      return res.json({
        status: 'error',
        code: 400,
        message: 'missing fields',
      })
    }

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: contact,
      })
    } else {
      return res.json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: contact,
        message: 'contact deleted',
      })
    } else {
      return res.json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}
