
### Overview

This component addresses technical requirements and patterned workflows around interacting directly with the JSON API module in Drupal. The code samples target the "Dogs" content type, but can be replicated for other content types and fields. This application does not intend to suggest replacing the editorial experience in Drupal, but to provide examples of JSON API interactions for functionality which is more utility in nature. 

### 'Dogs' content fields in Drupal

```
Title  |  Text (plain)
Description (Body)  |  Text (formatted, long, with summary)
History and Background  |  Text (formatted, long, with summary)
Dog Picture  |  Image	
```

### Application structure and scaffolding

#### `src/components/App.js`

```
# The container is initially referenced using the ES6 `import` statement
import DrupalCrudPage from '../containers/DrupalCrudPage';`
```

```
# The route is then added to the primary menu
<NavLink to="/drupalcrud" activeStyle={activeStyle}>Drupal CRUD</NavLink> 
```

```
# The container is targeted for the route using the React Router module
<Route path="/drupalcrud" component={DrupalCrudPage} />
```

#### `src/containers/DrupalCrudPage.js`

```
# Redux binding is imported for the container
import {connect} from 'react-redux';
```

```
# The Drupal CRUD component is then imported 
import DrupalCrudApp from '../components/DrupalCrudApp';
# Then rendered within the container as a component 
render() { ....
 <DrupalCrudApp /> 
```

```
# The component is then connected to the Redux store
export default connect()(DrupalCrudPage); 
```

#### `src/components/DrupalCrudApp.js`

This Drupal CRUD component file is the primary point of execution, as well as the key UI render piece of the structure. The core functionality revolves around the execution of the referenced API functions in `../actions/drupalAPIActions` in this file, which is stored in Redux and passed down to the inner components. The 'Node' list component and 'Node form' components are referenced and eventually rendered by receiving `props` and `state` from this component.


#### `src/components/Node.js`

The Node component is used to list the various nodes which were previously pulled form the Redux object and passed down to this level. This component uses `react-quill` for the WYSIWYG fields and `react-dropzone` to handle image uploads. 

#### `src/components/NewNodeForm.js`






when you should use this and when you shouldn't -- with GraphQL 
- scenario // with each one // 
- talk to Chris // stub MVP -- stakeholders in the beginning --> Urban is 


### External References & Resources 

- [The React + Redux Container Pattern](http://www.thegreatcodeadventure.com/the-react-plus-redux-container-pattern/)