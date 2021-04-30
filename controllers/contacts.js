<<<<<<< HEAD
const Contacts = require('../model/index')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: contacts,
=======
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
>>>>>>> hw04-auth
    })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
=======
    const userId = req.user.id
    const contact = await Contacts.getContactById(
      req.params.contactId,
      userId,
    )

    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
>>>>>>> hw04-auth
        data: contact,
      })
    } else {
      return res.json({
        status: 'error',
<<<<<<< HEAD
        code: 404,
=======
        code: HttpCode.NOT_FOUND,
>>>>>>> hw04-auth
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const contact = await Contacts.addContact(req.body)
    return res.json({
      status: 'success',
      code: 201,
=======
    const userId = req.user.id
    const contact = await Contacts.addContact({
      ...req.body,
      owner: userId,
    })
    return res.json({
      status: 'success',
      code: HttpCode.CREATED,
>>>>>>> hw04-auth
      data: contact,
    })
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
=======
    const userId = req.user.id
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId,
>>>>>>> hw04-auth
    )

    if (!req.body) {
      return res.json({
        status: 'error',
<<<<<<< HEAD
        code: 400,
=======
        code: HttpCode.BAD_REQUEST,
>>>>>>> hw04-auth
        message: 'missing fields',
      })
    }

    if (contact) {
      return res.json({
        status: 'success',
<<<<<<< HEAD
        code: 200,
=======
        code: HttpCode.OK,
>>>>>>> hw04-auth
        data: contact,
      })
    } else {
      return res.json({
        status: 'error',
<<<<<<< HEAD
        code: 404,
=======
        code: HttpCode.NOT_FOUND,
>>>>>>> hw04-auth
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: contact,
        message: 'contact deleted',
=======
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
>>>>>>> hw04-auth
      })
    } else {
      return res.json({
        status: 'error',
<<<<<<< HEAD
        code: 404,
=======
        code: HttpCode.NOT_FOUND,
>>>>>>> hw04-auth
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
