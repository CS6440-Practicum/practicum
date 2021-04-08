# practicum
CS6440 Intro Health Informatics Practicum

# Running Locally

Include the following environment variables in a file called `.env` in the `server` directory.  You can
copy the `.env.example` file.

| Variable      | Value                                                                                                                                                  |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| FIT_ID        | Google Fit Oauth2 client ID                                                                                                                            |
| FIT_SECRET    | Google Fit Oauth2 client secret                                                                                                                        |
| DEXCOM_ID     | Dexcom Oauth2 client ID                                                                                                                                |
| DEXCOM_SECRET | Dexcom Oauth2 client secret                                                                                                                            |
| APP_BASE_URL  | Base URL where the app is being hosted.  Used to generate callback URLs for Oauth2 authorizations.  Example: http://localhost:3000 for running locally |
