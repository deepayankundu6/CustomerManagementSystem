export interface ICustomers {
    FirstName: String
    LastName: String
    Email: String
    Address: String
    District: String
    State: String
    Gender: String
    CustomerID: Number
    Comments: [{
        Message: String,
        Time: String,
        Pinned: boolean
    }]
    Escalation: Number
    Appreciations: Number
}
