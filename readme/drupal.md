todo
# Drupal

This Drupal Kit offers 5 diffrent types of content

    Basic Page,  Client, Dogs, Marvel Characters, Pokemon

More about Content Types [here](drupal-contenttypes.md)
* api settings - http://local.decoupledkit.com/admin/access/settings
### API Settings

| Field | Description | Default Value |
| ------------ | ------------ | ------------ |
| Access Token Expiration Time | The default value, in seconds, to be used as expiration time when creating new tokens | 545400 |
| Refresh Token Expiration Time | The default value, in seconds, to be used as expiration time when creating new tokens | 1209600 |
| Public Key | The path to the public key file. This should match the key present in the Drupal docroot | todo |
| Private Key | The path to the private key file. This should match the key present in the Drupal docroot | todo |
Check the 'Enable the implicit grant?' box

* Clients - http://local.decoupledkit.com/admin/config/services/consumer
    Create a client and provide access permissions to content-types. A client can be a 'creator' or 'reviewer' for each content-type

* Roles - http://local.decoupledkit.com/admin/access/roles
A role defines a group of users that have certain privileges. These privileges are defined on the Permissions page(/admin/people/permissions). Here, you can define the names and the display sort order of the roles on your site. It is recommended to order roles from least permissive (for example, Anonymous user) to most permissive (for example, Administrator user). Users who are not logged in have the Anonymous user role. Users who are logged in have the Authenticated user role, plus any other roles granted to their user account.

* Tokens - http://local.decoupledkit.com/admin/access/tokens
Lists all the Access Tokens and Refresh Tokens for each and every user including the Scope. 

* JSON API - cover structures and basis uses http://local.decoupledkit.com/api-docs
todo.

Example of resource object
 
```
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      // ... this article's attributes
    },
    "relationships": {
      // ... this article's relationships
    }
  }
}
```

