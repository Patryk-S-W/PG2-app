DROP TABLE IF EXISTS users_have_projects;
DROP TABLE IF EXISTS raports;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

DROP SEQUENCE IF EXISTS users_uid_seq;

DROP TYPE IF EXISTS ROLE;


CREATE TYPE ROLE AS ENUM('student', 'leader', 'supervisor', 'firm');

CREATE SEQUENCE users_uid_seq;

CREATE TABLE users (
	uid INTEGER UNIQUE DEFAULT nextval('users_uid_seq'), --- needs to be int, so we can set project's supervisor, leader and firm as null
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  email_verified BOOLEAN,
  date_created TIMESTAMP,
  last_login TIMESTAMP,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(32),
  lastname VARCHAR(32),
  role ROLE,
  company VARCHAR(255),
  phone VARCHAR(12)
);

CREATE TABLE projects(
	pid SERIAL PRIMARY KEY,
  title VARCHAR(255),
	creator_role ROLE,
  supervisor_id INTEGER,
  leader_id INTEGER,
  firm_id INTEGER,
  pkey VARCHAR(10), --- what's this for?
  --- members TEXT [], --- delete?
  description VARCHAR(255),
  start_time TIMESTAMP WITH TIME ZONE UNIQUE, --- na pewno UNIQUE?
  end_time TIMESTAMP WITH TIME ZONE UNIQUE, --- na pewno UNIQUE?

	CONSTRAINT fk_supervisor
		FOREIGN KEY(supervisor_id)
			REFERENCES users(uid),
	CONSTRAINT fk_leader
		FOREIGN KEY(leader_id)
			REFERENCES users(uid),
	CONSTRAINT fk_firm
		FOREIGN KEY(firm_id)
			REFERENCES users(uid)
);

CREATE TABLE users_have_projects(
	uid INTEGER,
	pid SERIAL,

	CONSTRAINT fk_user
		FOREIGN KEY(uid)
			REFERENCES users(uid),
	CONSTRAINT fk_project
		FOREIGN KEY(pid)
			REFERENCES projects(pid)
);

CREATE TABLE comments(
	cid SERIAL PRIMARY KEY,
	pid SERIAL,
	uid SERIAL,
	time TIMESTAMP WITH TIME ZONE UNIQUE, --- na pewno UNIQUE?
	content VARCHAR(255),

	CONSTRAINT fk_project
		FOREIGN KEY(pid)
			REFERENCES projects(pid),
	CONSTRAINT fk_user
		FOREIGN KEY(uid)
			REFERENCES users(uid)
);

CREATE TABLE raports(
	rid SERIAL PRIMARY KEY,
	pid SERIAL,
	time_submitted TIMESTAMP WITH TIME ZONE UNIQUE, --- na pewno UNIQUE?
	file_path VARCHAR(255), --- ścieżka do pliku na dysku? możliwe, że zrobię to inaczej

	CONSTRAINT fk_project
		FOREIGN KEY(pid)
			REFERENCES projects(pid)
);


--- students
INSERT INTO users VALUES (DEFAULT, 'test1', 'test1@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'student1', 'student', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'test2', 'test2@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'student1', 'student', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'test3', 'test3@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'student1', 'student', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'test4', 'test4@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'student1', 'student', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'test5', 'test5@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'student1', 'student', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'test6', 'test6@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'student1', 'student', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'leader1', 'test7@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'leader1', 'leader', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'leader2', 'test8@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'leader1', 'leader', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'leader3', 'test9@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'leader1', 'leader', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'supervisor1', 'test10@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'supervisor1', 'supervisor', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'supervisor2', 'test11@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'supervisor2', 'supervisor', 'PG', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'firm1', 'test12@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'firm1', 'firm', 'Januszex', '1234567890');
INSERT INTO users VALUES (DEFAULT, 'firm2', 'test13@mail.com', TRUE, NOW(), NOW(), 'test', 'test', 'firm2', 'firm', 'Jakaś firma', '1234567890');

INSERT INTO projects VALUES (DEFAULT, 'project1', 'student', 10, 7, 12, NULL, 'A test project number 1', NOW(), NOW() + interval '1 year');
INSERT INTO projects VALUES (DEFAULT, 'project2', 'leader', NULL, NULL, 13, NULL, 'A test project number 2', NOW(), NOW() + interval '1 year');
INSERT INTO projects VALUES (DEFAULT, 'project3', 'supervisor', NULL, 9, NULL, NULL, 'A test project number 3', NOW(), NOW() + interval '1 year');
INSERT INTO projects VALUES (DEFAULT, 'project4', 'firm', 10, NULL, NULL, NULL, 'A test project number 4', NOW(), NOW() + interval '1 year');

INSERT INTO users_have_projects VALUES (1, 1);
INSERT INTO users_have_projects VALUES (2, 1);
INSERT INTO users_have_projects VALUES (3, 1);
INSERT INTO users_have_projects VALUES (4, 2);
INSERT INTO users_have_projects VALUES (5, 2);
INSERT INTO users_have_projects VALUES (6, 2);
INSERT INTO users_have_projects VALUES (2, 3);
INSERT INTO users_have_projects VALUES (4, 3);
INSERT INTO users_have_projects VALUES (6, 3);
INSERT INTO users_have_projects VALUES (5, 4);
INSERT INTO users_have_projects VALUES (3, 4);
INSERT INTO users_have_projects VALUES (1, 4);

INSERT INTO comments VALUES (DEFAULT, 1, 1, NOW() - interval '3 days 1 hour', 'Hello! There is our raport.');
INSERT INTO comments VALUES (DEFAULT, 1, 7, NOW() - interval '1 day 23 hours', 'You need to add some stuff');
INSERT INTO comments VALUES (DEFAULT, 1, 2, NOW() - interval '1 day 1 hours', 'Ok, done');
INSERT INTO comments VALUES (DEFAULT, 1, 10, NOW() - interval '3 hours', 'I am content with this project');
INSERT INTO comments VALUES (DEFAULT, 1, 12, NOW() - interval '1 hours', 'I, very important firm am also content');
INSERT INTO comments VALUES (DEFAULT, 2, 5, NOW() - interval '1 day 2 hours', 'hello');

INSERT INTO raports VALUES (DEFAULT, 1, NOW() - interval '2 days', 'some/file/path1.txt');
INSERT INTO raports VALUES (DEFAULT, 1, NOW() - interval '1 days', 'some/file/path2.txt');
INSERT INTO raports VALUES (DEFAULT, 2, NOW() - interval '3 days', 'some/file/path3.txt');
INSERT INTO raports VALUES (DEFAULT, 3, NOW() - interval '2 days', 'some/file/path4.txt');


GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO admin;
GRANT USAGE ON SEQUENCE users_uid_seq TO admin;
