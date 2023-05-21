'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments().unsigned()
      table.string('client_id', 256).notNullable().unique()
      table.string('save_data', 256).notNullable().defaultTo("")
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UserSchema
