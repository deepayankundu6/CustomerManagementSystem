var MongoDB = require('../mongoDB/controller');

exports.createCustomer = async (req, res) => {
    console.log("Inside createCustomer");
    let details = req.body;
    let cusotmerID = Math.floor(Math.random() * 1000000000);
    details.CustomerID = cusotmerID;
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    today = day + ' - ' + month + ' - ' + year;
    details.Comments = [{
        "Message": "Customer added",
        "Time": today
    }];
    details.Escalation = 0;
    details.Appreciations = 0;
    let response = await MongoDB.insertOneDocument(details);
    res.send(response);
}

exports.fetchAllCustomer = async (req, res) => {
    console.log("Inside fetch customer");
    let response = await MongoDB.findDocuments();
    response.forEach(el => delete el._id);
    res.send(response);
}

exports.fetchCustomer = async (req, res) => {
    console.log("Inside fetchCustomer");
    let details = req.body;
    let query = {
        "CustomerID": details.CustomerID
    };
    let response = await MongoDB.findOneDocument(query);
    delete response[0]._id;
    res.send(response[0]);
}

exports.modifyCustomer = async (req, res) => {
    console.log("Inside fetchCustomer");
    let details = req.body;
    let query = {
        "CustomerID": details.CustomerID
    };
    delete details.CustomerID
    let response = await MongoDB.updateOneDocument(query, details);
    res.send(response);
}

exports.deleteCustomer = async (req, res) => {
    console.log("Inside deleteCustomer");
    let details = req.body;
    let query = {
        "CustomerID": details.CustomerID
    };
    let response = await MongoDB.deleteOneDocument(query);
    res.send(response);
}