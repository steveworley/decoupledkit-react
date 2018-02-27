
## Decoupled Kit Application from Acquia

### About 

The Decoupled Kit was built to explore and communicate common workflows when building headless applications with Drupal's API.  This application is intended for multiple reasons, but primarily as an exercise to help developers understand best practices when combining popular architectural pieces with <a href="https://dri.es/how-to-decouple-drupal-in-2018" target="_blank">Decoupled Drupal</a>, <a href="http://graphql.org" target="_blank">GraphQL</a>, and <a href="https://reactjs.org" target="_blank">React</a>. We have also included a <a href="https://github.com/acquia-pso/decoupledkit-drupal" target="_blank">sibling repository</a> to provide all the necessary data schemas, which are used by this React application and the GraphQL server located in sub-folder `__graphql_server/`.

 This application was forked from the [React Slingshot](https://github.com/coryhouse/react-slingshot) application and the full documentation has been moved in `docs\React-Slingshot.md`. This application has included a considerable amount of features to be leveraged as best practices around workflow, structure, testing, and much more. The examples are intentionally basic to provide clarity around the intents of the components.

<hr />

### Installation for React Application 

- Navigate to the repository root 
- Install <a href="https://yarnpkg.com/lang/en/docs/install/">yarn</a> or also use `npm` for dependencies.
- Install packages with `yarn install` or `npm install`
- Rename the file `.env.example` to `.env` in the project root. This file already contains the proper configuration variables to connect to the Drupal website. 
- Stand up the application with `yarn start` or `npm start` and visit `http://localhost:8080`


### Installation for GraphQL Application 
- Navigate to the `__graphql_server/` folder
- Install <a href="https://yarnpkg.com/lang/en/docs/install/">yarn</a> or also use `npm` for dependencies.
- Install packages with `yarn install` or `npm install`
- Complete the "Environment Configuration for the GraphQL Application" instructions listed below
- Stand up the application with `yarn start` or `npm start` and visit `localhost:8082/graphiql` to test queries

#### Environment Configuration for the GraphQL Application

-  Rename the file `.env.example` to `.env` in the  `__graphql_server/` folder
-  Obtain and update the `API_PUBLIC_KEY` and `API_PRIVATE_KEY` from [https://developer.marvel.com](https://developer.marvel.com) website
-  Update the `APOLLO_ENGINE` from [https://engine.apollographql.com](https://engine.apollographql.com)
-  The other variables can stay as supplied in the example unless changes are needed  


### Installation for Headless Drupal website

- The repository is located at [https://github.com/acquia-pso/decoupledkit-drupal](https://github.com/acquia-pso/decoupledkit-drupal) and will provide instructions to setup, in addition to a sample DB to get started. 

*Additional Information*

- The React application will utilize OAuth to validate headers. So if you are running into issues with `cors` or `OAuth2` errors, make sure to confirm file permission noted under "Additional Notes" in the [Drupal Readme](https://github.com/acquia-pso/decoupledkit-drupal).

<br><hr />

### Feature Summary 

**Drupal CRUD** <br>
This page addresses workflows when dealing directly with JSON API endpoints served from a Headless Lightning Drupal instance. These tasks are broken out by core CRUD (Create, Read, Update, Delete) tasks for rich text and images fields. This application does not propose to replace Drupal strengths around content authoring, but rather seeks to understand workflows around interacting with API content.

**GraphQL Client (Single)**  <br>
This page addresses architecture scenarios when interacting with a GraphQL server which is exposing content that originates from Drupals JSON API (single source). These components interacts with data that is served via GraphQL queries to retrieve and compare data sets. This page also helps to compare benefits of using GraphQL as a middle orchestration layer, opposed to dealing directly with standard JSON API structures.

**GraphQL Client (Multiple)**  <br>
This page builds upon the previous example by synthesizing non-Drupal and Drupal API data with GraphQL by combining multiple sources. GraphQL serves the combination of data points into proper structures to for retrieval of data, as well as GraphQL mutations. This component also addresses scenarios around caching and performance by using the Apollo Client layer.

**API Data Failover** <br>
Architectures which lean on external sources as the primary data streams can offer challenges. This page demonstrates methods to tackle these scenarios with API failure with techniques of browser cache, local indexed databases, and local storage.

**API Data Mock** <br>
This component illustrates utilizing techniques to mock API data endpoints when developing locally. Mock data endpoints are typically included within local build scripts to help emulate data models, while addressing issues around rate limits, changing real data, and similar challenges.



### Architecture Summary 


TODO 


### Configuration Summary 

Here is a quick summary of elements included within this application stack, but make sure to review the documentation for proper explanation and context. 

[React](https://facebook.github.io/react/) //  [Redux](http://redux.js.org) //  [React Router](https://github.com/reactjs/react-router) //   [Babel](http://babeljs.io) //   [Webpack](https://webpack.js.org) //   [Browsersync](https://www.browsersync.io/) //  [Jest](https://facebook.github.io/jest/) //  [TrackJS](https://trackjs.com/) // [ESLint](http://eslint.org/) //   [SASS](http://sass-lang.com/) // [PostCSS](https://github.com/postcss/postcss)  // [Editor Config](http://editorconfig.org) // [NPM Build Scripts](https://docs.npmjs.com/misc/scripts)





