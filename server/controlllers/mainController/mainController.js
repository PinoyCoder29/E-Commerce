const mainModel = require('../../models/mainModel/mainModel')
const mainController = async (req,res) =>{
    try {
        const results = await mainModel()
        res.json(results)
    } catch (error) {
        console.error('error fetching all products',error)
        res.status(400).json({error:'server error'})
    }
}
module.exports = mainController 