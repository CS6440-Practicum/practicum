# Dexercise Special Instructions

## Prerequisites

Use of this application requires a Google account. In order to receive proper visualizations, a Google account with Google Fit activity data recorded is required. 

The application is set up to use sandbox data for Dexcom, so no Dexcom account is required.

## Access

There are two methods to access the application. Through the live deployment, or by spinning up a local instance.

### Live Deployment

Instructions for accessing the live deployment can be found in the Application Manual at https://github.com/CS6440-Practicum/practicum/blob/master/Final%20Delivery/Manual%20-%20Dexercise.pdf.

### Local Instance

Requirements:

- Git
- Node JS
- Yarn

Steps:

1. Clone this repository
2. Open a terminal in the root of this project
3. Run `yarn install` to install dependencies
4. Run `yarn build` to compile assets
5. Configure the server environment variables by copying `server/.env.example` to a new file called `server/.env`.  You will need OAuth2 app credentials for both Google (you can create this in Google Cloud Platform) and Dexcom (create an app on https://developer.dexcom.com).
  a. For more information about the required environment variables, view the main README.md file in this repository.
7. `cd` into `/server` and run `yarn start` to launch the application
8. Access the application at http://localhost:3000/
