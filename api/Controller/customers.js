var MongoDB = require('../mongoDB/controller');

exports.createCustomer = async (req, res) => {
    console.log("Inside create customer");
    let details = req.body;
    let response = await MongoDB.insertOneDocument(details);
    res.send(response);
}
