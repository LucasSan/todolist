'use strict'

const Project = use('App/Models/Project')
const Task = use('App/Models/Task')
const { validateAll } = use('Validator')

class TaskController {
  async update({ params, response, session }) {
    const task = await Task.find(params.id)
    task.status_id = 2

    await task.save()

    return response.redirect(`/project/${session.get('project')}`)
  }
}

module.exports = TaskController
