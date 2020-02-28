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
List of values is not protected. </br></br>
GET: `/api/values`</br>
Will return an array of values</br>
```
[
    {
    "id": int,
    "user_value_id": int,
    "value_id": int,
    "value": string,
    "important": boolean,
    "comment": string (can be null)
    }
]
```


# Protected Data
Protected Data requires login credentials </br></br>

#### User's Values
GET: `/api/user/:id/values` </br>
Will return an array of values given a user's ID
```
[
    {
    "id": int,
    "project_id": int,
    "value_id": int,
    "project": string,
    "notes" : string (optional/can be null),
    "completed": boolean,
    "comment": string (optional/can be null)
    }
]
```

POST: `/api/user/:id/values` </br>
Will take in a single Values object and apply it to the user ID specified in the `:id` portion of the endpoint</br>
```
{
    "id": int, (id of the Value)
    "important": boolean,
    "comment": string (optional/can be null)
}
```