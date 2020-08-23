'use strict'

const Project = use('App/Models/Project')
const Task = use('App/Models/Task')
const Database = use('Database')
const { validateAll } = use('Validator')

class ProjectController {
  async index({ view, auth }) {
    const projects = await Project
      .query()
      .where('user_id', auth.user.id)
      .fetch();

    return view.render('projects', {
      title: 'My projects',
      projects: projects.toJSON()
    })
  }

  async storeTask({ request, response, session, auth }) {
    const task = new Task()
    task.description = request.input('description')
    task.user_id = auth.user.id
    task.status_id = 1
    task.project_id = session.get('project')

    await task.save()

    session.flash({ notification: 'Task added!' })

    return response.redirect(`/project/${session.get('project')}`)
  }

  async store({ request, response, session, auth }) {
    const message = {
      'title.required': 'Field required',
      'title.min': 'Minimum 5 characters',
      'title.max': 'Maximum 140 characters'
    }

    const validation = await validateAll(request.all(), {
      title: 'required|min:5|max:140'
    }, message)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const project = new Project()
    project.title = request.input('title')
    project.user_id = auth.user.id
    await project.save()

    session.flash({ notification: 'Project added!' })

    return response.redirect('/projects')
  }

  async detail({ params, view, auth, session }) {
    const project = await Project.find(params.id)
    session.put('project', project.id)

    const tasks = await Database
      .select('task.*')
      .from('projects')
      .innerJoin('tasks as task', function() {
        this
          .on('projects.id', 'task.project_id')
          .on('projects.user_id', 'task.user_id')
      })
      .where({'projects.user_id': auth.user.id, 'projects.id': project.id });

    return view.render('projectdetail', {
      id: project.id,
      title: project.title,
      todoTasks: tasks.filter(item => item.status_id === 1),
      doneTasks: tasks.filter(item => item.status_id === 2)
    })
  }

  async remove({ params, response, session }) {
    const project = await Project.find(params.id)
    await project.delete();
    session.flash({ notification: 'Project removed!' })

    return response.redirect('/projects')
  }
}

module.exports = ProjectController
