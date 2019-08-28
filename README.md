# Point Challenge

_See PDF for challenge instructions_

## API

### Creating a user

Make a `POST` request to `/api/sign-up` with a JSON payload including `email` and `password`:

```sh
curl -X POST \
  http://localhost:3000/api/sign-up \
  -d '{ "email": "example@example.com", "password": "s3cr3t" }' \
  -H 'Content-Type: application/json'
```

The response will be a JSON string with a `token` key. Use this `token` to interact with the GraphQL API.

### Logging in

Identical to creating a user except use the `/api/login` endpoint.

### GraphQL

Use the `token` generated when authenticating as a Bearer token in the Authorization header to make requests to `/api/graphql`

```sh
curl -X POST \
  http://localhost:3000/api/graphql \
  -d '{ viewer { uid } }' \
  -H 'Authorization: Bearer ${token}' \
  -H 'Content-Type: application/json' \
```

## Development

1. Install [ZEIT Now](https://zeit.co/docs): `npm i -g now`
2. Install dependencies: `npm i`
3. Populate `.env` with Environment Variables (see below)
4. Run `now dev` to run locally

### Environment Variables

- `NODE_ENV`: (optional) set to "development" to get some extra debugging output
- `FIREBASE_API_KEY`: value for `apiKey` listed in snippet on [Firebase project settings](https://console.firebase.google.com/project/point-challenge/settings/general/web:NTVjODZmM2EtZDU4NC00YWM2LWE0ZjAtMWMxMGRiZTQ2YjNi)
- `FIREBASE_MESSAGING_SENDER_ID`: value for `messagingSenderId` listed in snippet on [Firebase project settings](https://console.firebase.google.com/project/point-challenge/settings/general/web:NTVjODZmM2EtZDU4NC00YWM2LWE0ZjAtMWMxMGRiZTQ2YjNi)
- `FIREBASE_APP_ID`: value for `appId` listed in snippet on [Firebase project settings](https://console.firebase.google.com/project/point-challenge/settings/general/web:NTVjODZmM2EtZDU4NC00YWM2LWE0ZjAtMWMxMGRiZTQ2YjNi)
- `FIREBASE_ADMIN_JSON`: result of `JSON.stringify` with the values downloaded from "Generate new private key" on [Firebase Admin SDK](https://console.firebase.google.com/project/point-challenge/settings/serviceaccounts/adminsdk)

_These are all set in ZEIT Now for you (see: `now.json`)_
