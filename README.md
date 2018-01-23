
## React Starter Application for Acquia PS

### About 

This is a starter application built as a baseline for creating React applications which rely heavily on API data from external sources. This application was forked from the [React Slingshot](https://github.com/coryhouse/react-slingshot) application and the full documentation has been moved in `docs\React-Slingshot.md`. This application has included a considerable amount of features to be leveraged as best practices around workflow, structure, testing, and much more. The examples are intentionally basic to provide clarity around the intents of the components.

### Installation 

- Install <a href="https://yarnpkg.com/lang/en/docs/install/">yarn</a> or also use `npm` for dependencies.
- Install packages with `yarn install` or `npm install`
- Stand up the application with `yarn start` or `npm start` and visit `http://localhost:8080`


### Configuration Summary 

Here is a quick summary of elements included within this application stack, but make sure to review the documentation for proper explanation and context. 

[React](https://facebook.github.io/react/) //  [Redux](http://redux.js.org) //  [React Router](https://github.com/reactjs/react-router) //   [Babel](http://babeljs.io) //   [Webpack](https://webpack.js.org) //   [Browsersync](https://www.browsersync.io/) //  [Jest](https://facebook.github.io/jest/) //  [TrackJS](https://trackjs.com/) // [ESLint](http://eslint.org/) //   [SASS](http://sass-lang.com/) // [PostCSS](https://github.com/postcss/postcss)  // [Editor Config](http://editorconfig.org) // [NPM Build Scripts](https://docs.npmjs.com/misc/scripts)


### Architecture Summary 

**`package.json`** - includes all the proper packages references, along with the references for each of the build and testing npm scripts. Both local and production builds are separated by running either `yarn start` or `yarn build`. These build scripts are also used in tandem with the webpack config files in the root named as `webpack.config.*.js`.

**Components** - the sample application is a collection of components located in `src/components/*.js`. The reasoning for this organization is to demonstrate React functionality around `state`, `props`, `redux` and how these relate on both the component and application level. 

**Routing** - this application uses the React Router module to set the paths. We have broken out the application in a separate route (/app) from the homepage, to illustrate how this is accomplished. You can find the code in `src/components/App.js`.

**Redux** - most of the components will illustrate simple and real-world examples of managing state with Redux. This is being used in the API, GraphQL, and key:pair form values being stored with the standard workflow (/actions /containers /reducers) with `connect(mapStateToProps, MapDispatchToProps)`. Make sure to use the [Redux DevTools Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to properly track the component states.

**Styles** - this application imports the Foundation framework for the baseline styles. SASS is compiled using the	PostCSS module, which allows for JS-level imports (ie. `import '../styles/graphql.scss';`). The styles are broken out by component in `src/styles/*.scss`. 

### Components 

**Sample Application** - `src/components/SampleApp.js` this component acts as the core files in which the other components will nest. Within this file you will see the various modular pieces included for render, ie. `<TimeTracker />`

**Time Tracker** - `src/components/timeTracker.js` this component was built to illustrate some common workflow functions within the `React.Component` class. The functions `componentDidMount()` and `componentWillUnmount()` are included to update and clear the time interval as an easy example. 

**Search** - `src/components/SearchApp.js` this component was constructed to illustrate the binding of input fields as controlled components, in addition to matching and updated `props` and `state`. This component serves as the simpler example of property tracking before diving into Redux examples.

**Increment Redux** - `src/components/IncrementApp.js` this component utilizes a basic example of the Redux workflow with the tracking an integer. This component has namespace files (increment*) for each of the workflow matching in `\actions`, `\reducers` to store and retrieve the state of the store. This component is targeted as the simplest Redux example to build upon. 

**User Redux** - `src/components/UserAppForm.js` `src/components/UserApp.js` this component builds upon the prior examples by combining controlled fields, storing state with redux, and displaying on the `render()` level. This component is intentionally broken out in 2 files to illustrate child components and how to designate the passing of those values. As with the other components, the associated redux files are located and namespace in `\actions` and `\reducers`. 

**StarWars API  pt. 1** - `src/components/StarWarsApp.js` this component utilizes an external Star Wars API to illustrate the use of `promises` and `fetch` within a state-aware redux workflow. The associated redux files are located and namespace in `\actions` and `\reducers`, but also includes a `src/api/starwarsAPI.js` file which is called from the `loadStarWars()` load function.

**StarWars API  pt. 2** - `src/components/StarWarsExternalApp.js` the purpose of this component is to illustrate the accessing of stored state data from a sibling component (pt 1). It uses the data pulled from the redux functions which are then passed to `super(props, store)`, and manipulates in an alternative way as a pure render component.  

**GraphQL Client** - `src/components/GraphqlClientApp.js` this (optional) component uses an external GraphQL server to pull data for display within the application. The component pulls various sample data which is filtered by button / input choices to illustrate query calls to the server. As with the prior components, it uses a combination of redux (same namespace locations) along with promises and typical API methods. 

### Setting up the GraphQL server 

The final component requires a GraphQL server to pull data from, so we have included a sample application in [this repository](https://github.com/acquia-pso/javascript-ps-starter-graphql). If you used the [PS JavaScript Generator](https://www.npmjs.com/package/generator-js-acquia-ps) to build this application and chose 'yes' for GraphQL server, then this application will already be available root folder under the directory `/__graphql_server`.


<br />

------------------------------------

**Visual References**

<img src="https://content.screencast.com/users/BedimStudios/folders/Jing/media/77b2b73e-9b64-4cef-b1c4-571080b40176/00002805.png" />
  
<img src="https://content.screencast.com/users/BedimStudios/folders/Jing/media/dd01df46-01b9-46df-b32a-8068ae1a6b61/00002807.png" />
        
<img src="https://content.screencast.com/users/BedimStudios/folders/Jing/media/a8b5d7d2-35ad-44af-977f-bdc556fd0c17/00002806.png" />

<img src="https://content.screencast.com/users/BedimStudios/folders/Jing/media/230b782c-a6ef-4533-afa3-16801d1f3723/00002808.png" />
    






