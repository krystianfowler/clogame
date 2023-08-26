exports.up = (pgm) => {
  pgm.createTable('User', {
    id: 'id',
    username: { type: 'varchar(50)', unique: true, notNull: true },
    password_hash: { type: 'varchar(256)', notNull: true },
    email: 'varchar(50)',
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  })

  pgm.createTable('Galaxy', {
    id: 'id',
    name: { type: 'varchar(50)', unique: true, notNull: true },
  })

  pgm.createTable('Planet', {
    id: 'id',
    name: 'varchar(50)',
    galaxy_id: {
      type: 'integer',
      references: 'Galaxy',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'integer',
      references: 'User',
      onDelete: 'SET NULL',
    },
  })

  pgm.createTable('Building', {
    id: 'id',
    name: { type: 'varchar(50)', unique: true, notNull: true },
  })

  pgm.createTable('Planet_Building', {
    planet_id: {
      type: 'integer',
      references: 'Planet',
      onDelete: 'CASCADE',
      notNull: true,
    },
    building_id: {
      type: 'integer',
      references: 'Building',
      onDelete: 'CASCADE',
      notNull: true,
    },
    level: { type: 'integer', notNull: true },
  })
  pgm.addConstraint('Planet_Building', 'unique_planet_building', {
    unique: ['planet_id', 'building_id'],
  })

  pgm.createTable('Alliance', {
    id: 'id',
    name: { type: 'varchar(50)', unique: true, notNull: true },
  })

  pgm.createTable('User_Alliance', {
    user_id: {
      type: 'integer',
      references: 'User',
      onDelete: 'CASCADE',
      notNull: true,
    },
    alliance_id: {
      type: 'integer',
      references: 'Alliance',
      onDelete: 'CASCADE',
      notNull: true,
    },
  })
  pgm.addConstraint('User_Alliance', 'unique_user_alliance', {
    unique: ['user_id', 'alliance_id'],
  })

  pgm.createTable('Research', {
    id: 'id',
    name: { type: 'varchar(50)', unique: true, notNull: true },
  })

  pgm.createTable('User_Research', {
    user_id: {
      type: 'integer',
      references: 'User',
      onDelete: 'CASCADE',
      notNull: true,
    },
    research_id: {
      type: 'integer',
      references: 'Research',
      onDelete: 'CASCADE',
      notNull: true,
    },
    level: { type: 'integer', notNull: true },
    galaxy_id: {
      type: 'integer',
      references: 'Galaxy',
      onDelete: 'CASCADE',
      notNull: true,
    },
  })
  pgm.addConstraint('User_Research', 'unique_user_research', {
    unique: ['user_id', 'research_id', 'galaxy_id'],
  })
}

exports.down = (pgm) => {
  pgm.dropTable('User_Research')
  pgm.dropTable('Research')
  pgm.dropTable('User_Alliance')
  pgm.dropTable('Alliance')
  pgm.dropTable('Planet_Building')
  pgm.dropTable('Building')
  pgm.dropTable('Planet')
  pgm.dropTable('Galaxy')
  pgm.dropTable('User')
}
