exports.seed = function (knex) {
    return knex('values').insert([
        { value: "Athleticism and health" },
        { value: "Art and literature" },
        { value: "Creativity, discovering, or inventing" },
        { value: "Independence" },
        { value: "Kindness and generosity" },
        { value: "Living in the moment" },
        { value: "Belonging" },
        { value: "Music" },
        { value: "Community" },
        { value: "Moral principles" },
        { value: "Nature" },
        { value: "Relationships" },
        { value: "Sense of humor" },
        { value: "Professional success" }
    ])
}