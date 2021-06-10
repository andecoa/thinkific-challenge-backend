# Thinkific Backend

By Angelo Aldecoa, angeloaldecoa@gmail.com

## Documentation

This is a simple Express server that supports the following routes:

The following are for email authentication
- POST "/auth/login":  {email, password} - get a JWT
- POST "/auth/register":  {email, password} - create a user and get a JWT

The following are protected routes accessible only if you have a valid JWT
- GET "/current": {JWT} - read the user's number
- PUT "/current": {JWT, newInteger} - set a new non-negative number for the user's number
- GET "next": {JWT} - read the user's (updated) number after incrementing it by 1

### Caveats (what is out of scope)
- I didn't bother with JWT access token expiration and refresh tokens because API keys grant permanent access
- Access token revocation logic was not implemented to save time (but this can be done by storing tokens in an authentication database as if they were sessions). For this we assume that the user logs out in the accompanying frontend app
- Why I chose JWT over doing sessions was to "pretend" as if there was a discrete auth server and discrete resource servers (that take in a valid JWT and its valid decrypted user data)


## Running locally and instructions
- Run everything with `npm run dev`
- Ensure you have a mongodb installed and running
- You may generate a new `ACCESS_TOKEN_SECRET` by running the following in a node.js shell
```
require('crypto').randombytes(64).tostring('hex')
```
- Place these environmental variables in a `.env` file (which is ignored by `.gitignore`)
```
NODE_ENV=dev
MONGO_SRV=mongodb://localhost:27017/thinkific
PORT=8001
ACCESS_TOKEN_SECRET=b5006e8b1a2c66605b87831e990c777381907dc7ecb2595ca7d6d04b763ea65d0caefc0564c1f3c4d9ff64ee9100a728b22ed5bc39f7a461cab680f35a8a3561
```