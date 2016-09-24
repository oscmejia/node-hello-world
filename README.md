## Node / Express Demo App

NodeJs / Express / ES6 Demo application of a simple registration form.

### NPM commands

- npm run dev
`nodemon -w src --exec \"babel-node src --presets es2015,stage-0\"`

- npm run build
`babel src -s -D -d dist --presets es2015,stage-0`

- npm run start
`node dist`

- npm run prestart
`npm run -s build`

- npm run test
`eslint src`

