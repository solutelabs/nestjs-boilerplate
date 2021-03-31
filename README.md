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

### Project Structure

![structure](https://raw.githubusercontent.com/sambhav-solutelabs/nestjs-boilerplate/feature/NJB-6-refactor/assets/structure.png?token=ARQQ67XLQYTUYJD47DDSTLDAMQVGE)

- Application is divided in 2 parts
  - app - this contains APIs related code
  - core - this contains code related to scaffolding the app.(like logger, guards, validator, etc)
  - even if we don’t add any module in app folder the application will bootstrap as it is loosely coupled.

* Module are plug and play. for ex: add S3 module in app module if u want to have S3 related api’s in your app.
* Module like Auth and user needs to instantiated together as both are dependent on each other.

---

## Commit guidelines

---

### Commitizen

[commitizen](https://github.com/commitizen/cz-cli) is a command line utility that makes it easier to create commit messages following the [conventional commit format](https://conventionalcommits.org) specification.

### Install globally

```bash
npm install -g commitizen
```

Use `git cz` instead of `git commit` to use commitizen.

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

**Configuration file**: [`.czrc`](https://github.com/smarlhens/nest7-boilerplate/blob/master/.czrc).

---

### Commitlint

[commitlint](https://github.com/conventional-changelog/commitlint) checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

In general the pattern mostly looks like this:

```sh
type(scope?): subject  #scope is optional
```

Are you a good `commitizen` ?

---

### branch-name-lint

[branch-name-lint](https://github.com/barzik/branch-name-lint) Validates and lints the git branch name. Create a config file or use the default configuration file. Use it in husky config file to make sure that your branch will not be rejected by some pesky Jenkins branch name conventions. You may use it as part of a CI process or just as an handy npx command.

---

## Basics

---

### Authentication & Authorisation

---

**This application comes with built in support for authorization.**
**It comes with built-in api's like**

- Login
- Forget and Change password
- Send and Verify otp

**Extended support with gaurds for authentication**

- Auth Gaurd
- Role Gaurd
- Webhook Gaurd
- Throttler Guard

### Auth Gaurd

**Use this when you want to make your api secure/ unauthenticated user can't access it**

```
@Query(() => String)
@UseGuards(JwtAuthGuard)
async test() {
    return 'test'
  }
```

### Role Gaurd

**Use this when you want to make your api accessible to a certain set user with specific role**

```
@Query(() => String)
@UseGuards(JwtAuthGuard, RolesGuard)
@Role('role')
async test() {
    return 'test'
  }
```

### Webhook Gaurd

**Use this when you want to secure your webhook created using hasura**

```
@Query(() => String)
@UseGuards(WebhookAuthGuard)
async test() {
    return 'test'
  }
```

### Throttler Guard

**Use this when you want to limit your api to be hit not more than n no of times**

```
@Query(() => String)
@UseGuards(GqlThrottlerGuard)
async test() {
    return 'test'
  }
```

---

### Communication

---

**This application comes with built in services for communication via.**

- Mail (Postmark)
- Message (Twillio)
- Notification (One Signal)

### Mail

**To use, inject the mail service and call the desired method**

```
  // inject email service
  constructor(
    private readonly emailService: EmailService,
  ) {}

  // call method
  await this.emailService.sendInvitation(payload)
```

### Message

**To use, inject the message service and call the desired method**

```
  // inject message service
  constructor(
    private readonly smsService: SmsService,
  ) {}

  // call method
  await this.smsService.sendSms(contactNumber: string, message: string)
```

### Notification

**To use, inject the notification service and call the desired method**

```
  // inject email service
  constructor(
    private readonly onesignalService: OnesignalService,
  ) {}

  // call method
  await this.onesignalService.createNotificatioBaseOnExternalId(payload)
```

---

## Aditional Notes

- Before starting the application start hasura's docker container for connecting to DB.

- To use GqlThrottlerGuard add it to imports array in app.module.ts like this:

```
ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
    })
```

- To use mail, message and notification service add it to providers array for respective modules in which this services are going to be used
