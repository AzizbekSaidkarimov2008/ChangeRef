const mongoose = require('mongoose')

module.exports = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const db = mongoose.connection

        db.on('error', console.error.bind(console, 'Console error'))
        db.once('open', function() {
            console.log('MongoDB success connected');
        })

    } catch (error) {
        console.log(error);
    }
}