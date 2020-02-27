
exports.up = function (knex) {
    return (

        // Tbl of User's Values
        knex.schema.createTable('user_values', tbl => {
            tbl.increments();
            tbl.boolean('important');
            tbl.string('comment');
            tbl.integer('value_id')
                .references('id')
                .inTable('values')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('user_id')
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
    )
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_values');
};
