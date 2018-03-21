todo
# Drupal

This Drupal Kit offers 5 diffrent types of content.

    Basic Page,  Client, Dogs, Marvel Characters, Pokemon

More about Content Types [here](drupal-contenttypes.md)
* api settings - http://local.decoupledkit.com/admin/access/settings
Allows you to configure certain settings for the API, including token expiration and the location of your keys.
    | Field | Description | Default Value |
    | ------------ | ------------ | ------------ |
    | Access Token Expiration Time | The default value, in seconds, to be used as expiration time when creating new tokens | 545400 |
    | Refresh Token Expiration Time | The default value, in seconds, to be used as expiration time when creating new tokens | 1209600 |
    | Public Key | The path to the public key file. This should match the key present in the Drupal docroot | todo |
    | Private Key | The path to the private key file. This should match the key present in the Drupal docroot | todo |
    Check the 'Enable the implicit grant?' box while setting this.

* [Clients](drupal-consumer.md) - http://local.decoupledkit.com/admin/config/services/consumer
Clients allow API users to interact with content. Clients have relationships to one or more roles via scopes and inherit the permissions assigned to those roles.

* [Roles](drupal-roles.md) - http://local.decoupledkit.com/admin/access/roles
Roles are groups of permissions and can be assigned to regular users, API users, and clients (via scopes).

* [Tokens](drupal-tokens.md) - http://local.decoupledkit.com/admin/access/tokens
Tokens are granted when an API user successfully authenticates with a client
Lists all the Access Tokens and Refresh Tokens for each and every user including the Scope.

* [JSON API](drupal-jsonapi.md) - cover structures and basis uses http://local.decoupledkit.com/api-docs
todo.
The [JSON API module](https://www.drupal.org/project/jsonapi) is a fully compliant implementation of the [JSON API Specification](http://jsonapi.org/).
Drupal's datastructures, i.e. entity types, bundles, and fields, are incredibly well suited to the JSON API.

