const db = require('../data/dbConfig');

function findUser() {
    return db('users');
}

function findBy(filter) {
    return db("users").where(filter);
}

async function addUser(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);    
}

function findById(id) {
    return db("users")
    .where({ id })
    .first();
}



module.exports = {
    findUser,
    findBy,
    addUser,
    findById
};