CREATE TABLE User (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password_hash VARCHAR(256) NOT NULL,
	email VARCHAR(50),
	created_at TIMESTAMP DEFAULT current_timestamp,
	updated_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE Planet (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	user_id INT REFERENCES User(id),
	metal_mine_level INT DEFAULT 1,
	ships_count INT DEFAULT 0,
	defense_count INT DEFAULT 0
);

CREATE TABLE Timer (
	id SERIAL PRIMARY KEY,
	planet_id INT REFERENCES Planet(id),
	start_time TIMESTAMP DEFAULT current_timestamp,
	end_time TIMESTAMP,
	timer_type VARCHAR(50) -- Can be 'MetalMineUpgrade', 'ShipBuilding', 'DefenseBuilding'
);

CREATE TABLE Mission (
	id SERIAL PRIMARY KEY,
	origin_planet_id INT REFERENCES Planet(id),
	destination_planet_id INT REFERENCES Planet(id),
	start_time TIMESTAMP DEFAULT current_timestamp,
	end_time TIMESTAMP,
	status VARCHAR(50) DEFAULT 'pending'
);



