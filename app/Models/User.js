'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const Database = use("Database")

class User extends Model {

  static get table(){
    return 'usuarios'
  }

  /*static autenticar({email, senha}){
    if(email == null || senha == null) return []
    return Database.table("usuarios").select("*").where("email", email).where("senha", senha)
  }

  static verificar_email({email}){
    if(email == null) return []
    return Database.table("usuarios").select("*").where("email", email)
  }*/

  static getDados(client_id){
    if(client_id == null) return []
    return Database.table("usuarios")
                    .leftJoin("user_saves", "usuarios.id", "user_saves.user_id")
                    .select("usuarios.id", "usuarios.client_id", "user_saves.level", "user_saves.stars")
                    .where("usuarios.client_id", client_id)
                    .orderBy("user_saves.level")
  }

  static setDados(user_id, data){
    if(user_id == null) return "no-user-id"
    User.limparSave(user_id)
    let save_data = data["save_data"]
    if (!save_data.length) return "no-save-data"

    for(var i in save_data){
      if(!User.create_or_replace_level(user_id, save_data[i].level, save_data[i].stars)) return false
    }

    return true
  }

  static async limparSave(user_id){
    await Database.table("user_saves").where("user_id", user_id).delete()
  }

  static async create_or_replace_level(user_id, level, stars){
    let ret = await Database.table("user_saves")
                      .where("user_id", user_id)
                      .where("level", level)
                      .update({stars: stars})
    
    if(!ret){
      ret = console.log(await Database.table("user_saves").insert({user_id: user_id, level: level, stars: stars}))
    }

    return ret ? true : false
  }

  static async reset_user(user_id){
    return await Database.table("user_saves")
                          .where("user_id", user_id)
                          .delete()
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
