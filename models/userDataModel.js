const db = require('../database/dbConfig');

module.exports = {
    getUserValues,
    getUserProjects,
    addUserValues,
    getImportantValue
}

// Return a list values that belong to the user.
// 
function getUserValues(user_id) {
    return db('values as v')
        .join('user_values as uv', 'v.id', 'uv.value_id')
        .join('users as u', 'uv.user_id', 'u.id')
        .where({ user_id })
        .select('uv.user_id as id',  'uv.value_id', 'v.value', 'uv.important', 'uv.comment')
}

// Return a list of projects that belong to the user.
// 
function getUserProjects(user_id) {
    return db('projects AS p')
//         .join('projects AS p', 'uv.id', 'p.user_value_id')
        // .join('users AS u', 'p.user_id', 'u.id')
        .where({ user_id })
        // .select('p.id', 'p.project', 'p.user_id')
}

// function getImportantValue(array) {
//     const completedArr = []
//     array.forEach(value => {
//         completedArr.push(
//             db('user_values')
//             .where({ value_id: value.value_id })
//             .where({ user_id: value.user_id })
//         )
//     })

    // return completedArr
        // .join('user_values', 'values.id', 'user_values.value_id')
        // .select('user_values.important')
// }


// function getUserProjects(user_id) {
//     // get projects where user_id matches user_id
//     // 
// }

function addUserValues(value) {
    return db('user_values').insert(value)
}