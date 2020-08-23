'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('login')
Route.on('/register').render('register')
Route.post('/task', 'ProjectController.storeTask').middleware(['auth'])
Route.get('/tasks', 'TaskController.index').middleware(['auth'])
Route.get('/done/:id', 'TaskController.update').middleware(['auth'])
Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')
Route.get('/logout', 'AuthController.destroy').middleware(['auth'])
Route.on('/newproject').render('newproject').middleware(['auth'])
Route.post('/newproject', 'ProjectController.store').middleware(['auth'])
Route.get('/projects', 'ProjectController.index').middleware(['auth'])
Route.get('/project/:id', 'ProjectController.detail').middleware(['auth'])
