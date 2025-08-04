# Iglesia Digitalizada

Proyecto creado en colaboración con la iglesia "Santo Toribio" para ser evaluado en el ramo "Ingeniería de software 2 (2022)"

## Getting dependencies installed

You will require the next dependencies to run this project:

- Node Js v22.15.x
- pnpm v10.11.0
- MongoDB
- Python v3.x.x

### Installing pnpm

```bash
npm install --global pnpm@latest-10
```

### Installing all project dependencies

for installing the rest of dependencies located in the `package.json` file, you will use the following command:

```bash
pnpm i
```

## Getting the development server running

To run the development server, you will use the following command:

```bash
pnpm dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the development server.

## Getting the production server running

To compile the development server, you will use the following command:

```bash
pnpm build
```

Once finished compiling, you will use the following command to run the production server:

```bash
pnpm start
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the production server.
Keep in mind that everytime you update a file here, you must re-compile the production server to apply changes

## Initializing and populating the DB

There is a file called `import.py` that uses Python 3.10,
You will need to install these dependencies to run this file.

- pymongo

Use `pnpm py:setup` command to install them.

Once that's finished, you want to inspect the file `./seeds/import.py`

Line `92` is the function that python uses to connect to MongoDB, you may adjust the DB URL or 'CONNECTION_STRING' as you wish. Also the line `101` is where python chooses the collection to populate, you may adjust that to your usage.

In line `106` is calling this function called `createSuperUser()` that creates the super admin user and inserts it into the db.
You may remove the `#` to enable this function.
The default credentials are:

- Email: `123@123.com`
- Password: `123`

To execute this file you may use the following command: `pnpm db:seed`

## .env.example

- `SECRET_JWT_SEED` is the JWT seed that is used to generate the user token.
- `SECRET_JWT_SEED_EXPIRATION_TIME` is the time that the user token is going to expire after. you may use the following format: `<Number><s:m:h:d:mo:y>` example: `5m` equals to `5 minutes`.
- `SERVER_PORT` is the port where this server is going to bind.
- `DB_ADDRESS` is the MongoDB database URL, this has to contain the collection name in order to work as the following: `mongodb://localhost:27017/<collection name>`
- `HOW_MANY_HASHES` is the quantity of bcrypt hashes that are going to be when user is authenticating.
- `ALLOWED_CORS_ORIGINS` is from where the api will accept queries
- `NODE_ENV` is the type of environment that will be used, can be `development` or `production`

## Learn More

This project uses:

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://mongoosejs.com/)
