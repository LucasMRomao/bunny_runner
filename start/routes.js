'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.resource('/usuario', 'UserController')
//Route.get('/autenticar', 'UserController.autenticar')
Route.get('/usuario/getdados/:client_id', 'UserController.get_dados')
Route.get('/verificaremail', 'UserController.verificar_email')