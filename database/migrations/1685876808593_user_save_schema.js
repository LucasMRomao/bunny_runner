'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSaveSchema extends Schema {
  up () {
    this.create('user_saves', (table) => {
      table.increments()
      table.integer("user_id", 255).unsigned().notNullable().references("id").inTable("usuarios")
      table.integer("level").notNullable()
      table.integer("stars").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_saves')
  }
}

module.exports = UserSaveSchema
