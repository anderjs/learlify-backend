import type { Knex } from 'knex'

exports.up = function (knex: Knex): unknown {
  const user = {
    id: 0,
    firstName: 'Demo',
    lastName: 'AptisGo',
    email: 'aptisgo@noreply',
    password: '$2b$10$ZRPHs7FcGLuVC88neUxXK.47IUnGuaKRH0qswzNt1e9VMSGSaHb1K',
    roleId: 3,
    imageUrl: null,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  return knex('users').insert(user)
}

exports.down = function (knex: Knex): unknown {
  return knex('users').where('email', 'aptisgo@noreply').del()
}
