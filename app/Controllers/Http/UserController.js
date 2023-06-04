'use strict'

const User = use("App/Models/User")

class UserController {

    async index(){
        return User.all()
    }

    async show({params}){
        const usuario = User.findOrFail(params.id)
        return usuario
    }

    async store({request}){
        const data = request.only([
            'client_id'
        ])
        console.log(data)
        const usuario = User.create(data)
        return usuario
    }

    async update({params, request}){
        const usuario = await User.findOrFail(params.id)
        const data = request.only([
            'client_id',
            'save_data'
        ])

        if(!data['save_data']) data['save_data'] = ""

        usuario.merge(data)
        await usuario.save()
        return usuario
    }

    async destroy({params}){
        const usuario = await User.findOrFail(params.id)
        return await usuario.delete()
    }

    /*async autenticar({request}){
        const data = request.only([
            'email',
            'senha'
        ])
        return await User.autenticar(data)
    }

    async verificar_email({request}){
        const data = request.only([
            'email'
        ])
        return await User.verificar_email(data)
    }*/

    async get_dados({params}){
        const client_id = params.client_id
        return await User.getDados(client_id)
    }

    async set_dados({request, params}){
        const client_id = params.client_id
        const data = request.only([
            'save_data'
        ])
        return await User.setDados(client_id, data)
    }

    async save_level({request, params}){
        const user_id = params.user_id
        const data = request.only([
            'level',
            'stars'
        ])

        return await User.create_or_replace_level(user_id, data.level, data.stars)
    }

    async reset_user({params}){
        return await User.reset_user(params.user_id)
    }
}

module.exports = UserController
