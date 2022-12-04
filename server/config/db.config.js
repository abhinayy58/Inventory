const mongoose = require('mongoose')
const option = require('../utils/MonOption')
const connect = () => {
mongoose.connect(process.env.Mongo_URL, option)
.then(()=> {
    console.log('Sucessfully connected to MongoDB');
}).catch(err => console.log(err))
}

module.exports = connect