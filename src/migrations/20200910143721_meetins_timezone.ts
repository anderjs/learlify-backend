import type { Knex } from 'knex'

import config from '../config'

exports.up = function (knex: Knex): unknown {
  return knex.schema.table('meetings', table => {
    table.string('timezone').notNullable().defaultTo(config.default.TZ)
  })
}

exports.down = function (knex: Knex): unknown {
  return knex.schema.table('meetings', table => {
    table.dropColumn('timezone')
  })
}
