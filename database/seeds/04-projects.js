exports.seed = function (knex) {
    return knex('projects').insert([
        {
            project: "Take out trash",
            notes: null,
            completed: false,
            user_id: 1,
            value_id: 1
        }, {
            project: "Paint the house",
            notes: null,
            completed: false,
            user_id: 1,
            value_id: 2
        }, {
            project: "Go to the museum",
            notes: null,
            completed: true,
            user_id: 1,
            value_id: 7
        }, {
            project: "Go to NY to see family",
            notes: null,
            completed: false,
            user_id: 2,
            value_id: 8
        }, {
            project: "Serve at the homeless shelter",
            notes: null,
            completed: false,
            user_id: 2,
            value_id: 13
        }, {
            project: "Make a card for the wife",
            notes: null,
            completed: true,
            user_id: 22,
            value_id: 10
        },
    ])
}