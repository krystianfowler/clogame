exports.up = (pgm) => {
  pgm.createTable('User', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    password_hash: {
      type: 'VARCHAR(256)',
      notNull: true,
    },
    email: {
      type: 'VARCHAR(50)',
    },
    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createTable('Planet', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    name: 'VARCHAR(50)',
    user_id: {
      type: 'INT',
      references: 'User',
      onDelete: 'CASCADE',
    },
    metal_mine_level: {
      type: 'INT',
      default: 1,
    },
    ships_count: {
      type: 'INT',
      default: 0,
    },
    defense_count: {
      type: 'INT',
      default: 0,
    },
  })

  pgm.createTable('Timer', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    planet_id: {
      type: 'INT',
      references: 'Planet',
      onDelete: 'CASCADE',
    },
    start_time: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
    },
    end_time: 'TIMESTAMP',
    timer_type: 'VARCHAR(50)', // Can be 'MetalMineUpgrade', 'ShipBuilding', 'DefenseBuilding'
  })

  pgm.createTable('Mission', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    origin_planet_id: {
      type: 'INT',
      references: 'Planet',
      onDelete: 'CASCADE',
    },
    destination_planet_id: {
      type: 'INT',
      references: 'Planet',
      onDelete: 'CASCADE',
    },
    start_time: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
    },
    end_time: 'TIMESTAMP',
    status: {
      type: 'VARCHAR(50)',
      default: 'pending',
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('Mission')
  pgm.dropTable('Timer')
  pgm.dropTable('Planet')
  pgm.dropTable('User')
}
