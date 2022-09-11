Deployed BE Url:

https://demo-app-node-express.herokuapp.com/api/

1) Register API
    POST - https://demo-app-node-express.herokuapp.com/api/register
    Request Body - 
    {
        "firstName": "test",
        "lastName": "user",
        "email": "test@user.com",
        "password": "123456"
    }

2) Login API
    POST - https://demo-app-node-express.herokuapp.com/api/login
    Request Body -
    {
        "email" : "test@user.com",
        "password" : "123456"
    }

3) Profile Details API
    GET - https://demo-app-node-express.herokuapp.com/api/profile
    Header - 
    Authorization : Bearer <JWT_TOKEN>