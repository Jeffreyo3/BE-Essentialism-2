const db = require('../database/dbConfig');

module.exports = {
    getUserValues,
    getUserProjects,
    addUserValue,
    updateUserValue,
    addUserProject,
    updateUserProject,
    removeUserProject
}

// Values that belong to the user.
// 
function getUserValues(user_id) {
    return db('values as v')
        .join('user_values as uv', 'v.id', 'uv.value_id')
        .join('users as u', 'uv.user_id', 'u.id')
        .where({ user_id })
        .select('uv.user_id as id',  'uv.value_id', 'v.value', 'uv.important', 'uv.comment')
}

function addUserValue(value) {
    return db('user_values').insert(value)
}

function updateUserValue(value, user_id, value_id) {
    return db('user_values')
        .where({value_id})
        .where({user_id})
        .update(value)
}

// Projects that belong to the user.
// 
function getUserProjects(user_id) {
    return db('projects AS p')
        .where({ user_id })
        .select('p.user_id AS id', 'p.id AS project_id', 'p.project', 'p.notes', 'p.completed', 'p.value_id')
}

function addUserProject(project) {
    return db('projects').insert(project)
        .then(ids => {
            const [id] = ids;
            return findProjectById(id);
        });
}

function updateUserProject(project, id) {
    return db('projects')
        .where({id})
        .update(project)
}

function removeUserProject(id) {
    return db('projects')
        .where({id: id})
        .del();
}

function findProjectById(id) {
    return db('projects')
        .where({ id })
        .first();
}
