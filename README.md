# ESSENTIALISM API

## Endpoints
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
