'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('status_id').unsigned().references('id').inTable('statustasks').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('project_id').unsigned().references('id').inTable('projects').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
