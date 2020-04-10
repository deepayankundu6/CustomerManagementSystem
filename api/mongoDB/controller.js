var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/MyDB";
var DatabaseName = "MyDB";
var CollectionName = "Customers"

exports.createDatabase = () => {
    let response;
    let client;
    let MongoDBPromise = new Promise((resolve, reject) => {
        resolve(client = MongoClient.connect(url)).then((db => {
            dbo.createCollection(CollectionName);
            console.log("Collection created!");
            db.close();
        })
        ).catch((err) => {
            console.log("There are some errors:", err);
        })
        reject(console.log("Unable to connect to the database!!!!"))
    });
}

exports.insertOneDocument = async (item) => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url);
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).insertOne(item);
    }
    catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

exports.insertManyDocuments = async (item) => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url);
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).insertMany(item);
    }
    catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

exports.findDocuments = async () => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url);
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).find({}).toArray();
    }
    catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

exports.findOneDocument = async (query) => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url);
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).find(query).toArray();
    }
    catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

exports.updateOneDocument = async (query, newValues) => {
    let result;
    let client;
    let values = { $set: newValues }
    try {
        client = await MongoClient.connect(url);
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).updateOne(query, values);
    }
    catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

exports.deleteOneDocument = async (query) => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url);
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).deleteOne(query);
    }
    catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

exports.deleteManyDocuments = async (query) => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url);
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).deleteMany(query);
    }
    catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}