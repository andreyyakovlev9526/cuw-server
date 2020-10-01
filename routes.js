// Import express router
let Router = require('express').Router();
// Set default API response
Router.get('/', function (req, res){
    res.json({
        status: 'WORKING',
        message: 'This is the /api/ route!'
    });
});
// Import member controller
var memberController = require('./memberController');
// Book routes
Router.route('/member')
    .get(memberController.index)
    .post(memberController.new);
Router.route('/member/:member_id')
    .get(memberController.view)
    .patch(memberController.update)
    .put(memberController.update)
    .delete(memberController.delete);
// Export API routes
module.exports = Router;