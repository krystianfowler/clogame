const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

// Assumes migration files are in the same directory as the script

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'ogame_clone_db',
  password: 'temppass123',
  database: 'ogame_db_admin',
})

client.connect()

const initializeMigrations = async () => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      run_at TIMESTAMPTZ DEFAULT NOW()
    );
  `)
}

const runMigration = async (file) => {
  const sql = fs.readFileSync(file, 'utf-8')

  await client.query('BEGIN')
  await client.query(sql)
  await client.query('INSERT INTO migrations (name) VALUES ($1)', [file])
  await client.query('COMMIT')
}

const main = async () => {
  await initializeMigrations()

  const appliedMigrations = await client.query('SELECT name FROM migrations')
  const appliedMigrationsNames = appliedMigrations.rows.map((row) => row.name)

  const migrationFiles = fs.readdirSync('./')

  // filter out script's filename
  const currentFileName = path.basename(__filename)
  const filteredMigrationFiles = migrationFiles.filter(
    (file) => file !== currentFileName
  )

  for (const file of filteredMigrationFiles) {
    if (!appliedMigrationsNames.includes(file)) {
      console.log(`Applying migration: ${file}`)
      await runMigration(file)
    }
  }

  await client.end()
}

main().catch((err) => {
  console.error('Migration failed:', err)
})
