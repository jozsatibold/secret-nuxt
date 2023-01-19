# secret-server

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## ENV variables

Create a _.env_ file in the source folder with the next parameters
```dotenv
DB_HOST=<MONGO_DB_HOST_WITH_USERNAME_AND_PASSWORD>
ENCRYPT_KEY=<32_CHARACTER_LONG_RANDOM_STRING_WITHOUT_SPECIAL_CHARACTERS>
VIEW_LIMIT=<SIMPLE_NUMBER-DEFAULT_VALUE_IS_5>
```
