exports.seed = function (knex) {
    return knex('users').insert([
        { username: "Test User", password: "$2b$11$2t6sH5lzwHsPQZXuW/XiOuxu5jzuahDjBIu5AmSHSkvP5jgKn17mG" },
        { username: "Some User", password: "$2b$11$CJ39DUGgQfCnUizQnE9kE.xg20DT0lg2KsEbxGceCHlaN8qLeUN/e" }
    ])
}