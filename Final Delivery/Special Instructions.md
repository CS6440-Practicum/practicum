# Dexercise Special Instructions

## Prerequisites

Use of this application requires a Google account. In order to receive proper visualizations, a google account with activity data recorded is required. 

The application is set up to use sandbox data for Dexcom, so no Dexcom account is required.

## Access

There are two methods to access the application. Through the live deployment, or by spinning up a local instance.

### Live Deployment

Instructions for accessing the live deployment can be found in the [Application Manual](https://github.com/CS6440-Practicum/practicum/blob/master/Final%20Delivery/Application%20Manual.md).

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
5. `cd` into `/server` and run `yarn start` to launch the application
6. Access the application at http://localhost:3000/
