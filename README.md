## This was a group project for my CSC648 class
### Things I did
 - Majority of the server side logic including sessions, CRUD operations with tickets, users and workspaces, rewrites of log in and registration, db architecture etc.
 - All of the Artemis application logic and rendering (everything past the log in screen)
 - Auth
 - All of the team website
 - All of the error tracker code
 - Most of the frontend and backend tests
 - Application scaffolding (configs, project structure, migrations etc)
 - Setup and managed project hosted on a VM (hosted on GCP)
 - After project submission altered project to be hosted on Heroku

 ### Things I did not do
  - The landing page (HTML and CSS)
  - The log in/log out (HTML and CSS)

### Things I would like to improve
 - Optimize excessive rerendering in workspaces. This includes dividing access to the global cache up between
 the boards themselves instead of being passed as props, and memoizing state and callbacks being passed as props from extremely dynamic components.

 - Modernizing the UI. More whitespace, clearer visual hierarchies and intentional use of accent colors would help
 this application both in terms of ease of use and modern feel.