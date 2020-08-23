'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatustaskSchema extends Schema {
  up () {
    this.create('statustasks', (table) => {
      table.increments()
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('statustasks')
  }
}

module.exports = StatustaskSchema
