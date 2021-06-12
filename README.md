# Thinkific Integer-as-a-Service Backend

### Author
Angelo Aldecoa, angeloaldecoa@gmail.com, aldecoa.xyz

### Notes
- This is a protected resource server that can be accessed only if you have a valid JWT token issued by Auth0.
- This resource server contains no state so it can be scaled as much as possible. It uses an external MongoDB instance to store data, and it uses JWT tokens to add authorization for endpoints. 
- I initially created my own token auth logic, but found that it was better to use Auth0 to better mimic real-world work 
- Routes are protected using Auth0-issued JWT tokens and Auth0-issued API scopes
- You may not test this API unless if you have a valid Auth0-issued JWT with the right scopes attached
- The assignment instructions are a little weird because the `GET /next` endpoint mutates data before returning data. As a rule, `GET` requests must never mutate any data. I followed the assignment instructions so I knowingly used a `GET` request rather than a more appropriate `PUT` request. 

### Date
- Initial release was on June 11, 2021
- Initially created a server with auth logic, but started converting that into this Auth0-protected resource server on June 10, 2021

### Location of deployed application
- This resource server is being hosted on an Ubuntu machine with NGINX as a reverse proxy
- Link: https://thinkific-integer.aldecoa.xyz/v1

### Time spent
- I spent around 2 hours doing the inital server with self-created auth logic
- I refactored it into this lighter, more secure Auth0-protected resource server in around 1 hour

### Assumptions made
- I assumed that this would be consumed by some client on a browser, so I just decided to use JWT tokens that expire to grant access. This means that this server does not return an API key to grant access (which means it does not use an authorization database). Instead, it uses an Auth0 JWT token issued for the client after users finish signing up or logging in.
- This adds the benefit of having a user log in once and being able to access multiple resource servers without sharing the same key. It is also more secure since stolen keys expire and can be revoked.

### Shortcuts/Compromises made
- It was a foolish choice to implement my own auth logic (which was secure, but not perfectly secure), but I still did it and got it to work. While making the client app, I decided to recreate this as a resource server that leverages Auth0. 
- My initial attempt for the auth logic had one issue. The JWT access tokens did not expire because I wanted them to feel like actual API keys for server-to-server apps. It was a viable solution, but I thought having a client on the browser (client-to-server apps) was more appropriate which is why Auth0 was selected.

### Stretch goals attempted
- This is deployed on a VPS and is served over HTTPS via NGINX as a reverse proxy
- It uses `pm2` to ensure that downtime is minimized and crashes result in resource server restarts 

### Instructions to run assignment locally
Clone this project and run `npm i` to install our dependencies. Use `npm run dev` to run the app on your development machine. You also need to create an application with Auth0 because they will provide you with your authentication and authorization logic. To do that, please consult [their documentation](https://auth0.com/docs/quickstart/backend/nodejs/01-authorization).
Lastly, make sure that you create a `.env` file and enter the following there:

```
NODE_ENV=dev
MONGO_SRV=mongodb://localhost/thinkific
PORT=8001
AUTH0_DOMAIN=<your auth0 application domain>
AUTH0_IDENTIFIER=<your auth0 third-party API identifier>
```

### What did you not include in your solution that you want us to know about?
Every endpoint was implemented and security is maximized, so I do not think I missed anything. If there was something I could improve, it would be in creating tests for this codebase because I was testing everything manually. While doing that, I learned how cumbersome it was to manually test protected endpoints on localhost. A lot of trailing slashes (e.g. "thinkific.com/") led to some issues. Typos in my Auth0 configuration led me to installing a TSL certificate for my localhost server. Finding those typos fixed the issues, but I could prevent this by adding a compilation step where I compare my environment variables to those from my Auth0 configuration. 

### Other information about your submission that you feel it's important that we know if applicable.
It will be really annoying to test this locally (you'll have to set up Auth0), so I suggest just testing it out via the client app. The link is https://thinkific-client.aldecoa.xyz/

### Your feedback on this technical challenge
- I liked this technical challenge, but it might be better to turn the `GET /next` endpoint (that mutates user data) into a `PUT /next` endpoint instead.
- It would be nice to define the API consumer beforehand so we can get an know whether to implement API keys that do not expire (for server-to-server apps) or temporary access tokens that get refreshed in a user's browser.
- Servers are not free so I'm lucky that I had access to a MongoDB instance and a VPS for hosting this Express app. Other candidates might have problems because if they use a free-tier service like Heroku, thier app might "go to sleep" which could make it seem like their server is broken when someone from Thinkific does a demo.