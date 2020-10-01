var mongoose = require('mongoose');
// Setup schema
var memberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    skype: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
// Export Book model
var Member = module.exports = mongoose.model('member', memberSchema);
module.exports.get = function (callback, limit) {
    Member.find(callback).limit(limit);
}