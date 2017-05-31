let mysql = require('mysql');
// Set Environment variables from .env file
require('dotenv').config();

(function () {
	console.log('Checking database exists, password:', process.env.DB_PASS);
	this.connection = mysql.createConnection(
	    {
	      host     : process.env.DB_HOST,
	      user     : process.env.DB_USER,
	      password : process.env.DB_PASS
	    }
	);
	let dbName = process.env.DB_NAME || "rtfm";
	//Get database names and call init to check for dbName db.
	this.connection.query('SHOW DATABASES', (err, results) => {
    if(err) throw err;
    let dbExists = results.filter( (el) => (el.Database === dbName) );
		if (dbExists.length > 0)  {
			console.log("Database exists: ", dbName);

        this.connection.end();
        return true;
    }
    // Database doesn't exist, create it, end connection, and return.
    this.connection.query('CREATE DATABASE ' + dbName, (err, results) => {
      if (err) throw err;
			console.log("Creating database: ", dbName);
      this.connection.end();
      return true;
    });
	});
})();
