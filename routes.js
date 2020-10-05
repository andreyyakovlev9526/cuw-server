const memberController = require('./controllers/memberController');
const songController = require('./controllers/songController');
const songList_Controller = require('./controllers/songList_Controller');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const auth = require('./middleware/auth');

const Router = require('express').Router();

Router.get('/', (req, res) => {
	res.json({});
});

Router.route('/member')
	.get(memberController.index)
	.post(memberController.new);
Router.route('/member/:member_id')
	.get(memberController.view)
	.put(memberController.update)
	.delete(memberController.delete);

Router.route('/song')
	.get(songController.index)
	.post(songController.new);
Router.route('/song/:song_id')
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

Router.route('/user')
	.get(userController.index)
	.post(userController.new);
Router.route('/user/:song_id')
	.get(userController.view)
	.put(userController.update)
	.delete(userController.delete);

Router.route('/auth')
	.post('/register', authController.registerUser)
	.post('/login', authController.loginUser)
	.get('/auth', auth, authController.getUserDetails)
	.get('/logout', auth, authController.logoutUser);

module.exports = Router;
