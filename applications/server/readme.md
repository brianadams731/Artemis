## Server Initialization
### To install
1. Navigate to the /648CSC/csc648-spring22-04-team02/applications/server/ directory in your terminal
2. execute  npm install
3. Add a .env file to the /648CSC/csc648-spring22-04-team02/applications/server/ directory
4. Refer to the .env example below for the required fields you need to include inside your .env file

### To run
1. Navigate to the /648CSC/csc648-spring22-04-team02/applications/server/ directory in your terminal
2. execute  npm start

### To test
1. Navigate to the /648CSC/csc648-spring22-04-team02/applications/server/ directory in your terminal
2. execute   npm test


## Database setup
1. Install Postgres https://www.postgresql.org/
- make sure to check pgAdmen and command line tools
- it will prompt you to create a password, you will need to remember this
2. Open psql (the command line tool that came with postgres)
- Hit enter a couple times to use the default server, database, login, port, username, then it will ask for your password, make sure to provide the one you used when installing
3. type and execute  CREATE DATABASE artemis;
- ^ the ; is important, do not leave it off
4. Open pgAdmin, log in and verify that the db has been created, you will find it in the left hand menu
PostgreSQL > Databases > artemis
5. Fill out the database url below for example postgres://postgres:abcd@localhost:5432/artemis
user defaults to postgres                                  ^username ^pass ^host   ^port  ^db name
port defaults to 5432

## .env example file

PORT = 8080
DATABASE_URL = postgres://<user>:<password>@localhost:<port>/artemis  
