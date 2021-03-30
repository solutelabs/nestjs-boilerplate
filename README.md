# NestJs Boilerplate(0.0.1)

## Getting Started

---

### Project Setup

```bash
cd workspace

git clone https://github.com/sambhav-solutelabs/nestjs-boilerplate your_project_name
```

```bash
cd your_project_name

node setup.js
```

---

### Project Configuration

#### Before starting the application configure few variables in the .env file

```bash
#ENVIRONMENTS
PORT=

#DATABASE ENVs
POSTGRES_TYPE=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
DATABASE_URL=

#JWT
JWT_SECRET=
JWT_EXPIRES_IN_DAYS=

WEBHOOK_SECRET=

#password length
MIN_PASSWORD_LENGTH=
MAX_PASSWORD_LENGTH=

RESET_PASSWORD_SLUG=
INVITE_SLUG=

ENVIRONMENT=
```

---

### Running the app

#### Docker

#### Build image

```bash
$ sudo docker build -t app-name .
```

#### Run image

```bash
$ sudo docker run app-name -p host_port:container_port
```

---

#### Local machine

#### Install dependencies

```bash
$ npm install
```

#### Run app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

---
