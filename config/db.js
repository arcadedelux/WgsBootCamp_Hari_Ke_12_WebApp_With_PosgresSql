const Pool =require('pg').Pool

const pool = new Pool({
    user:'postgres',
    password:'test',
    database:'ContactApp',
    host:'localhost',
    port:5432

})

module.exports = pool