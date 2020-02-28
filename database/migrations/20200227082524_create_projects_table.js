exports.up = function (knex) {
    return (

        // Tbl of Projects
        knex.schema.createTable('projects', tbl => {
            tbl.increments();
            tbl.string('project')
                .notNullable();
            tbl.string('notes');
            tbl.boolean('completed')
                .notNullable()
                .defaultTo(false);
            tbl.integer('user_id')
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('user_value_id')
                .references('id')
                .inTable('user_values')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })

    );
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('projects');
};
