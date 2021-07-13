# Yet another todo backend

This backend is only some kind of playground to test and show the implementation of libraries and good practices. The corresponding front-end is here: https://github.com/StartMeUp/todo-front

In this project:

- Express project coded in typescript + MongoDB
- NODE_ENV management at script launch
- code decoupled and split in various folders for better maintainability: services > controllers > routes
- route testing with Jest and Supertest
- signup emails sent through AWS SES
- custom error management and authentification through middleware
- request schema validation with Zod through middleware (beautiful library !)
