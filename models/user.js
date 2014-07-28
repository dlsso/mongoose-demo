var mongoose = require('mongoose')
// mongoose.model defines a constructor object that corresponds with a colection in your database
// first argument: name (singular)
// second argument: schema (object literal) that defines the properties allowed on documents in the collection

var User = mongoose.model('User', {
	// key: arbitrary name for that property
	// value: constructor that indicates the type
	// _id: mongoose.Schema.Types.ObjectId,
	email: String
})

module.exports = User
