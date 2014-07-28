var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var User = require('./models/user.js')
mongoose.connect('mongodb://localhost/wingzingly')

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/signup', function(req, res) {
	// creating a new user object from our mongoose model
	var user = new User({
		email: req.body.email
	})

	//save the user to the database
	user.save()

	res.render('signup', {user: user})
})

app.get('/viewusers', function(req, res) {
	// find all documents within the users collection
	// (static method)
	// first argument of callback: error object(or null)
	// second argument of callback: results
	User.find({}, function(error, users){
		if(error) {
			res.send(500, 'Error accessing users collection.')
		}
		else {
			res.render('viewusers', {users: users})
		}
	})


})


app.post('/edit', function(req, res) {
	// change this to update the user's email
	User.findOneAndUpdate({_id: req.body.id}, {$set: {email: req.body.email}}, function(error, user) {
		if(error){
			res.send("Error.")
		}
		else {
			console.log("req.body._id:", req.body._id)
			console.log("req.body.email:", req.body.email)
			user.save()
			res.send("Saved as " +user.email)
		}
	})
})


var server = app.listen(9902, function() {
	console.log('Express server listening on port ' + server.address().port);
});
