const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "0CdXGAwb#lvhEA1BQvLiqDpntwsyAkA55ZFy0xm-S8BVtWT4cSig",
MONGODB: process.env.MONGODB || " mongodb+srv://sam:sam@cluster0.u1smxsv.mongodb.net/?retryWrites=true&w=majority",
};
