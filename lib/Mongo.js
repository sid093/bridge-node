const MongoClient = require('mongodb').MongoClient;

function connect() {
	return new Promise((resolve, reject) => {
		MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
			.then(client => {
				console.log('Connected to MongoDB.');
				resolve(client);
			})
			.catch(err => console.log('Error connecting to MongoDB.'));
	});
};

function insert(database, collection, data) {
	connect().then(client => {
		let db = client.db(database);
		db.collection(collection).insertOne(data).then(res => {
			if(res.insertedCount === 1) {
				console.log('Inserted document succesfully.')
			} else {
				console.log('Unknown error inserting document into MongoDB.');
			}
		})
		.catch(err => console.log('Error inserting into MongoDB.'));
		client.close();
		console.log('Connection to MongoDB closed.');
	});
};

module.exports = exports = {
	connect: connect,
	insert: insert
};