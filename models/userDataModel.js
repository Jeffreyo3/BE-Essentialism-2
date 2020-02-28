const db = require('../database/dbConfig');

module.exports = {
    getUserValues,
    getUserProjects
}

// Return a list values that belong to the user.
// This list will contain 
function getUserValues(user_id) {
    return db('values AS v')
        .join('user_values AS uv', 'v.id', 'uv.value_id')
        .join('users AS u', 'uv.user_id', 'u.id')
        .where({ user_id })
        .select('uv.id', 'uv.user_id', 'v.value', 'uv.important', 'uv.comment')
}

function getUserProjects(user_id) {
    return db('user_values AS uv')
        .join('projects AS p', 'uv.id', 'p.user_value_id')
        .join('users AS u', 'p.user_id', 'u.id')
        .where({ user_id })
        .select('p.id', 'p.project', 'p.user_id', 'u.username', 'p.user_value_id')
}