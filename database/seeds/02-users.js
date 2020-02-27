exports.seed = function (knex) {
    return knex('users').insert([
        { username: "Test User", password: "abcdefg" },
        { username: "Some User", password: "1234567" }
    ])
}