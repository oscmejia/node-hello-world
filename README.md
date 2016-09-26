## Node / Express Demo App

NodeJS / Express / ES6 Demo application of a simple registration form
and an admin page to display registered users.



### What was used in this demo app

- Express
- MongoDB
- Lodash
- Jquery
- Jquery Form Validator (http://www.formvalidator.net/)
- datatables (https://datatables.net/)
- Bootstrap
- Mocha/chai
- babel-node
- nodemon
- request 



### What is NOT done

This is a very simple implementation and does not have all the pieces 
that a real, production ready application, would (need to) have. This is a list of
the most notable missing part that are considered out of scope of this demo 
but defenitly needed for a real application:

- Authentication for the admin page.
- Frontend framework (like ReactJS, Angular, etc): Query is used for simplicity.
- Server side rendering of pages.
- Frontend (UI) tests.
- Formal responses/errors definition for the API.
- Hot code pushes. This example uses `nodemon` to restart the server after code. 
changes, but manual refresh of pages is required at the moment.
- Localization and Internationalization.
- Implementation of logging framework. `console` is been used currently.
- Database migration framework.




### Tests

Simple tests for the api were created and can be executed with a npm command: `npm test`.



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
`mocha tests/index.js`

- npm run link  
`eslint src`

