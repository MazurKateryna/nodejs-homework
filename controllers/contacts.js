const Contacts = require('../model/contacts')
const { HttpCode } = require('../helpers/constants')

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await Contacts.listContacts(userId, req.query)
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { ...contacts },
    })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.getContactById(
      req.params.contactId,
      userId,
    )

    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: contact,
      })
    } else {
      return res.json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.addContact({
      ...req.body,
      owner: userId,
    })
    return res.json({
      status: 'success',
      code: HttpCode.CREATED,
      data: contact,
    })
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId,
    )

    if (!req.body) {
      return res.json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'missing fields',
      })
    }

    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: contact,
      })
    } else {
      return res.json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.removeContact(
      req.params.contactId,
      userId,
    )
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: contact,
        message: 'Contact deleted',
      })
    } else {
      return res.json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
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
