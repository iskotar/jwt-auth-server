# Express server with jwt (access and refresh) authentication + MongoDB


## env variables (examples):

### MongoDB connection
MONGO_CONNECTION_STRING=mongodb://admin:wTgeff9@my-app-shard.mongodb.net:27017 //provided by Mongo DB


### JSON Web Token (Access, Refresh)
JWT_ACCESS_KEY=Token_Super_Secret_Key

JWT_ACCESS_EXPIRES_IN=1h

JWT_REFRESH_KEY=Refresh_Token_Super_Secret_Key

JWT_REFRESH_EXPIRES_IN=1d


### SMTP parameters for sending registration link (Google Mail as example)
SMTP_HOST=smtp.gmail.com

SMTP_PORT=587

SMTP_USER=myinfomail@gmail.com

SMTP_PASSWORD=My_Gmail_Password


### Server API URL
API_URL=http://my-server.com/api


### Client URL
CLIENT_URL=http://my-client.com
