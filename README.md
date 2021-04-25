# practicum
CS6440 Intro Health Informatics Practicum

# Running Locally

Include the following environment variables in a file called `.env` in the `server` directory.  You can
copy the `.env.example` file.

| Variable      | Value                                                                                                                                                  |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| FIT_ID        | Google Fit OAuth2 client ID                                                                                                                            |
| FIT_SECRET    | Google Fit OAuth2 client secret                                                                                                                        |
| DEXCOM_ID     | Dexcom OAuth2 client ID                                                                                                                                |
| DEXCOM_SECRET | Dexcom OAuth2 client secret                                                                                                                            |
| APP_BASE_URL  | Base URL where the app is being hosted.  Do not include a trailing `/`.  Used to generate callback URLs for OAuth2 authorizations.  Example: http://localhost:3000 for running locally |
| DEXCOM_API_BASE | Base URL for Dexcom API requests.  Do not include a trailing `/`.  Used to switch between sandbox and production Dexcom environments.  Example: https://sandbox-api.dexcom.com
