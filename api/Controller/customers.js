var MongoDB = require('../mongoDB/controller');

exports.createCustomer = async (req, res) => {
    console.log("Inside create customer");
    let details = req.body;
    let cusotmerID = Math.floor(Math.random() * 1000000000);
    details.CustomerID = cusotmerID;
    let response = await MongoDB.insertOneDocument(details);
    res.send(response);
}

exports.fetchAllCustomer = async (req, res) => {
    console.log("Inside fetch customer");
    let response = await MongoDB.findDocuments(details);
    res.send(response);
}

exports.fetchCustomer = async (req, res) => {
    console.log("Inside create customer");
    let customerID = req.params.id;
    let query = {
        "CusotmerID": customerID
    };
    let response = await MongoDB.findOneDocument(query);
    res.send(response);
}