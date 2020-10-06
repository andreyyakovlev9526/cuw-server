const app = require('./app');

const PORT = process.env.port || 3000;

app.listen(PORT, function () {
	console.log("Server has started on port " + PORT);
});
