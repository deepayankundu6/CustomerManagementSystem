var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/MyDB";
var DatabaseName = "MyDB";
var CollectionName = "Users";

exports.verifyLogin = async (req, res) => {
    console.log("Inside verifyLogin");
    let email = req.body.Email;
    let password = req.body.Password;
    let isValid = false;
    query = {
        "Email": email,
        "Password": password,
    };
    let response = await this.findOneDocument(query);
    response = response[0];
    if (response) {
        if (query.Email == response.Email && query.Password == response.Password) {
            isValid = true;
        }
    }
    res.send({
        "IsValid": isValid
    });
}

exports.createUser = async (req, res) => {
    console.log("Inside createUser");
    let user = req.body;
    finalResponse = {};
    query = {
        "Email": user.Email
    }
    user.IsAdmin = false;
    let response = await this.findOneDocument(query);
    if (response.length == 0) {
        response = await this.insertOneDocument(user);
        finalResponse.Result = response;
        finalResponse.Status = "SUCCESS";
        finalResponse.Success = true;
        finalResponse.message = "User added successfully";
    }
    else {
        finalResponse.Result = [];
        finalResponse.Status = "FAILURE";
        finalResponse.Success = false;
        finalResponse.message = "User already exists";
    }

    res.send(finalResponse);
}

exports.findOneDocument = async (query) => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        db = await client.db(DatabaseName);
        result = await db.collection(CollectionName).find(query).toArray();
    } catch (err) { console.error(err); } // catch any mongo error here
    finally {
        client.close();
        return result;
    } // make sure to close your connection after

}

exports.insertOneDocument = async (item) => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).insertOne(item);
    } catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after
    return result;
}

exports.createDatabase = () => {
    let response;
    let client;
    let MongoDBPromise = new Promise((resolve, reject) => {
        resolve(client = MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })).then((db => {
            db.createCollection(CollectionName);
            console.log("Connection established")
            db.close();
        })).catch((err) => {
            console.log("There are some errors:", err);
        })
        reject(console.log("Unable to connect to the database!!!!"))
    });
}
