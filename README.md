# Tech stack used:
 - React JS with materialUI and bootstrap on frontend
 - Node JS on backend
 - MongoDB as database

## System Requirements

System should have Node and mongoDB.

# Steps to run:

## Backend:

Go to `/server` directory and runs the server in the development mode.
- Install dependencies:
### `npm install`

- Start MongoDB server:
### `sudo systemctl start mongodb`

- Run server:

### `npm start`

Open [http://localhost:8000](http://localhost:8000).

## Frontend:

Go to `/web` directory and runs the server in the development mode.
- Install dependencies:
### `npm install`

### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Statement:
- Designed Login-Signup functionality to create inbillo user
- Added algorithm for bank account balancing for all inBillo user
- Added algorithm to manage and log all financial operations made by inBillo users
- Created schema user and transaction to maintain user data and transaction data
- Created schema and algorithm to ensures proper bank account balance, which is performed after each financial period ends (i.e. at the end of the day).