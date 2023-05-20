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
            'client_id',
            'save_data'
        ])

        const usuario = User.create(data)
        return usuario
    }

    async update({params, request}){
        const usuario = await User.findOrFail(params.id)
        const data = request.only([
            'client_id',
            'save_data'
        ])
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

}

module.exports = UserController
