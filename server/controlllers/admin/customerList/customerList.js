const customerListModel = require('../../../models/adminModel/customerList/customerListModel')
const customerList = async (req, res) => {
    try {
        const customers = await customerListModel();
    
        res.json(customers); // return all customers
    } catch (err) {
        console.error('Error fetching customer list:', err);
        res.status(500).json({ message: 'Server error' });
    }
    }
        
module.exports = customerList;  