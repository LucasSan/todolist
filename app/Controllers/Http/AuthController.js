'use strict'

const User = use("App/Models/User")

class AuthController {
  async register({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    await User.create(data)
    return response.route('/')
  }

  async authenticate({ request, auth, response }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)
    return response.route('/projects')
  }

  async destroy({ response, auth }) {
    await auth.logout()
    return response.route('/')
  }
}

module.exports = AuthController
