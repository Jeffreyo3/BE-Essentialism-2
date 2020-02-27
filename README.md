# ESSENTIALISM API

## Endpoints
`https://essentialism-be-api.herokuapp.com/`

#### Server Status
GET: `/` </br>
When active, will respond with: 
```
ESSENTIALISM server is alive
```

# Authentication
Authentication expires in: `3 hours`

#### Register a user

Usernames *MUST* be unique. </br>
Registering an existing user will give a response
{ error: "Username already registered" }</br>
POST: `/api/auth/register`
```
{
    "username": "myuser",
    "password": "verysecretpass"
}
```

#### Login with a registered user
POST: `/api/auth/login`
```
{
    "username": "myuser",
    "password": "verysecretpass"
}
```

# Data
List of values is not protected. </br>
GET: `/api/values` </br>
will return an array of values