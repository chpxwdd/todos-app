module.exports = function(app) {
	const passport = require('passport')
	const controllerTodo = require('../controllers/todo.js')
	app.get('/api/todo/list', passport.authenticate('jwt', { session: false }), controllerTodo.list)
}
