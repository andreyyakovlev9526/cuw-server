const memberController = require('./src/controllers/memberController');
const songController = require('./src/controllers/songController');
const songListController = require('./src/controllers/songListController');
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
	.post(songController.createOrUpdate);
Router.route('/songs/:id')
	.get(songController.view)
	.put(songController.createOrUpdate)
	.delete(songController.delete);

Router.route('/song-list')
	.get(songListController.index)
	.post(songListController.createOrUpdate);
Router.route('/song-list/:id')
	.get(songListController.view)
	.put(songListController.createOrUpdate)
	.delete(songListController.delete);

Router.route('/users')
	.get(userController.index)
	.post(userController.createOrUpdate);
Router.route('/users/:id')
	.get(userController.view)
	.put(userController.createOrUpdate)
	.delete(userController.delete);

module.exports = Router;
