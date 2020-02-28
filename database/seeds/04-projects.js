exports.seed = function (knex) {
    return knex('projects').insert([
        {
            project: "Take out trash",
            completed: false,
            user_id: 1,
            user_value_id: 1
        }, {
            project: "Paint the house",
            completed: false,
            user_id: 1,
            user_value_id: 2
        }, {
            project: "Go to the museum",
            completed: true,
            user_id: 1,
            user_value_id: 7
        }, {
            project: "Go to NY to see family",
            completed: false,
            user_id: 2,
            user_value_id: 10
        }, {
            project: "Serve at the homeless shelter",
            completed: false,
            user_id: 2,
            user_value_id: 5
        }, {
            project: "Make a card for the wife",
            completed: true,
            user_id: 2,
            user_value_id: 10
        },
    ])
}