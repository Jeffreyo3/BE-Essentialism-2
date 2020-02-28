
exports.up = function (knex) {
    return (

        // Tbl of User's Values
        knex.schema.createTable('user_values', tbl => {
            tbl.boolean('important')
                .notNullable()
                .defaultTo(false);
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
            tbl.primary(['value_id', 'user_id']);
        })
    )
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_values');
};
