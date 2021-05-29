require('dotenv').config();
module.exports = {
    application: {
        port                            : process.env.APP_PORT ? process.env.APP_PORT : 5050
    }    
}