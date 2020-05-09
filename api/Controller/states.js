var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
//var url = "mongodb://Deepayan:123456@127.0.0.1";
var DatabaseName = "MyDB";
var CollectionName = "States"

exports.getDistrict = async (req, res) => {
    console.log("Inside getDistrict");
    let state = req.params.state;

    query = {
        "state": state
    }
    let response = await findOneDocument(query);

    res.send(response[0].districts);
}

exports.getStates = async (req, res) => {
    console.log("Inside getStates");
    let response = await findDocuments();
    let states = [];
    response.forEach(el => {
        states.push(el.state);
    })
    res.send(states);
}

findDocuments = async () => {
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

findOneDocument = async (query) => {
    let result;
    let client;
    try {
        client = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        db = client.db(DatabaseName);
        result = await db.collection(CollectionName).find(query).toArray();
    } catch (err) { console.error(err); } // catch any mongo error here
    finally { client.close(); } // make sure to close your connection after

    return result;
}

createDatabase = () => {
    let response;
    let client;
    let MongoDBPromise = new Promise((resolve, reject) => {
        resolve(client = MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })).then((db => {
            db.db(DatabaseName);

        })).then((db) => {
            db.createCollection(CollectionName);
            db.close();
        }).catch((err) => {
            console.log("There are some errors:", err);
        })
        reject(console.log("Unable to connect to the database!!!!"))
    });
}