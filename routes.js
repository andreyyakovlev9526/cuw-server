const memberController = require('./src/controllers/memberController');
const songController = require('./src/controllers/songController');
const songList_Controller = require('./src/controllers/songList_Controller');
const userController = require('./src/controllers/userController');
const authController = require('./src/controllers/authController');
const auth = require('./src/middleware/auth');

const Router = require('express').Router();

Router.get('/', (req, res) => {
	res.json({});
});

Router.route('/members')
	.get(memberController.index)
	.post(memberController.new);
Router.route('/members/:member_id')
	.get(memberController.view)
	.put(memberController.update)
	.delete(memberController.delete);

Router.route('/songs')
	.get(songController.index)
	.post(songController.new);
Router.route('/songs/:song_id')
	.get(songController.view)
	.put(songController.update)
	.delete(songController.delete);

Router.route('/song-list')
	.get(songList_Controller.index)
	.post(songList_Controller.new);
Router.route('/song-list/:songList_id')
	.get(songList_Controller.view)
	.put(songList_Controller.update)
	.delete(songList_Controller.delete);

Router.route('/admin/users')
	.get(userController.index)
	.post(userController.new);
Router.route('/admin/users/:user_id')
	.get(userController.view)
	.put(userController.update)
	.delete(userController.delete);

module.exports = Router;
