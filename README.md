# Auth Project

This is a project under construction.

## Ambient preparation
- Create a error.log empty file inside /config/dev/logs
- Create a .env file inside /client
- Create a .env file inside /server
- Create a .env file inside /prod
- Update the /config/nginx.conf accordingly to your .env file

### .env file config
#### APP_PATH
Mandatory. Ex.: /auth

#### PORT
Optional. If not set, default is 3000.

## Building and Running in Development
- Go to /config/dev
- To build: docker compose build
- To Run: docker compose up -d --remove-orphans
- To Stop: docker compose down

## Building and Running in Production
- Build both Client and Server apps using: npm run build
- Go to the root directory of the project
- To build the app, run: docker build -f .\config\prod\Dockerfile -t auth-project .
- To run the app, use: docker run -p 80:80 auth-project
