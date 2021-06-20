const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(email, password) {
    logger.debug(`auth.service - login with username: ${email}`)

    const user = await userService.getByUsername(email)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    return user
}

async function signup(email, password, fullname, imgUrl) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with email: ${email}, fullname: ${fullname}`)
    if (!email || !password || !fullname) return Promise.reject('fullname, email and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, fullname, imgUrl })
}

module.exports = {
    signup,
    login,
}