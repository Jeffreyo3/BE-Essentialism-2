exports.up = function (knex) {
    return (

        // Tbl of values
        knex.schema.createTable('values', tbl => {
            tbl.increments();
            tbl.string('value')
                .notNullable()
                .unique();
        })

    );
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('values');
};
