// Import member model
Member = require('./memberModel');
// Handle index actions
exports.index = function (req, res) {
    Member.get(function (err, member) {
       if (err) {
           res.json({
               status: "error",
               message: err,
           });
       }
       res.json({
           status: "success",
           message: "Members retrieved successfully",
           data: member
       });
    });
};
// Handle create member actions
exports.new = function (req, res) {
    var member = new Member();
    member.name = req.body.name ? req.body.name : member.name;
    member.phone = req.body.phone;
    member.skype = req.body.skype;
    member.position = req.body.position;
    member.note = req.body.note;
    member.email = req.body.email;
    // save the member and check for errors
    member.save(function (err) {
       if (err)
           res.json(err);
       res.json({
           message: 'New member created!',
           data: member
       });
    });
};
// Handle view member info
exports.view = function (req, res) {
    Member.findById(req.params.member_id, function (err, member) {
       if (err)
           res.send(err);
       res.json({
           message: '1 member found!',
           data: member
       });
    });
};
// Handle update member info
exports.update = function (req, res) {
    Member.findById(req.params.member_id, function (err, member) {
       if (err)
           res.send(err);
           member.name = req.body.name ? req.body.name : member.name;
           member.phone = req.body.phone;
           member.skype = req.body.skype;
           member.position = req.body.position;
           member.note = req.body.note;
           member.email = req.body.email;
       // save the member and check for errors
       member.save(function (err) {
          if (err)
              res.json(err);
          res.json({
              message: 'Member Info updated',
              data: member
          });
       });
    });
};
// Handle delete member
exports.delete = function (req, res) {
    Member.deleteOne({
       _id: req.params.member_id
    }, function (err, member) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Member deleted'
        });
    });
};