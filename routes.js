const memberController = require('./src/controllers/memberController');
const songController = require('./src/controllers/songController');
const songList_Controller = require('./src/controllers/songListController');
const userController = require('./src/controllers/userController');
const Router = require('express').Router();

Router.route('/members')
	.get(memberController.index)
	.post(memberController.createOrUpdate);
Router.route('/members/:id')
	.get(memberController.view)
	.put(memberController.createOrUpdate)
	.delete(memberController.delete);

Router.route('/songs')
	.get(songController.index)
	.post(songController.new);
Router.route('/songs/:id')
	.get(songController.view)
	.put(songController.update)
	.delete(songController.delete);

Router.route('/song-list')
	.get(songList_Controller.index)
	.post(songList_Controller.new);
Router.route('/song-list/:id')
	.get(songList_Controller.view)
	.put(songList_Controller.update)
	.delete(songList_Controller.delete);

Router.route('/admin/users')
	.get(userController.index)
	.post(userController.new);
Router.route('/admin/users/:id')
	.get(userController.view)
	.put(userController.update)
	.delete(userController.delete);

module.exports = Router;
