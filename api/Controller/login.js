var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/MyDB";
var DatabaseName = "MyDB";
var CollectionName = "Users";

exports.verifyLogin = async (req, res) => {
    console.log("Inside verifyLogin");
    let email = req.body.Email;
    let password = req.body.Password;
    let isValid = false;
    let isadmin = false;
    let canEdit = false;
    query = {
        "Email": email,
        "Password": password,
    };
    let response = await this.findOneDocument(query);
    response = response[0];
    if (response) {
        if (query.Email == response.Email && query.Password == response.Password) {
            isValid = true;
            isadmin = response.IsAdmin;
            canEdit = response.CanEdit
        }
    }
    res.send({
        "IsValid": isValid,
        "IsAdmin": isadmin,
        "CanEdit": canEdit
    });
}

exports.createUser = async (req, res) => {
    console.log("Inside createUser");
    let user = req.body;
    finalResponse = {};
    query = {
        "Email": user.Email
    }
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

exports.deleteUser = async (req, res) => {
    console.log("Inside deleteUser");
    let details = req.body;
    query = {
        "Email": details.Email
    };
    let response = await this.deleteOneDocument(query);
    res.send(response);
}

exports.fetchAllUsers = async (req, res) => {
    console.log("Inside fetchAllUsers");
    let response = await this.findDocuments();
    response.forEach(el => delete el._id);
    res.send(response);
}


exports.modifyUser = async (req, res) => {
    console.log("Inside modifyUser");
    let details = req.body;
    query = {
        "Email": details.Email
    };
    delete details.CustomerID
    let response = await this.updateOneDocument(query, details);
    res.send(response);
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

exports.configureUsers = async () => {
    let result;
    let client;
    let user = {
        "Email": "admin@user",
        "Password": "123456",
        "DOB": "2020-04-27",
        "Name": "Admin",
        "IsAdmin": true,
        "CanEdit": true
    }
    try {
        client = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        db = client.db(DatabaseName);
        result = await db.collection("Users").find({}).toArray();
        if (!result.length >> 0) {
            console.log("creating user in database:");
            result = await db.collection("Users").insertOne(user);
            console.log("Finished Creating User");
        }

    } catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

exports.updateOneDocument = async (query, newValues) => {
    let result;
    let client;
    let values = { $set: newValues }
    try {
        client = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).updateOne(query, values);
    } catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

exports.deleteOneDocument = async (query) => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).deleteOne(query);
    } catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

exports.findDocuments = async () => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).find({}).toArray();
    } catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}