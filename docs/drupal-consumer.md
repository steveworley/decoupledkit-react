## Headless Lightning Consumers

#### What is a consumer?

This is defined as a client who can consume the API based on the scope it is associated with. Clients allow API users to interact with content. Clients have relationships to one or more roles via scopes and inherit the permissions assigned to those roles. Create a client and provide access permissions to content-types. OAuth2 scopes are implemented as Drupal roles. Create a role for every logical group of permissions you want to make available to a consumer.

#### How to add a consumer?

Go to `/admin/config/services/consumer/add` on the site, give it a name and select the scope of the  ([drupal role](../drupal-roles.md)) for this consumer.

Anonymous access to the API is allowed in the same way that Drupal allows anonymous access to content. Generally, published content is available while unpublished content is not. If your application needs more privileged access (for example, accessing unpublished or creating new content) you will need to authenticate. Authentication involves a client, which is associated with a role, and a user which is assigned the same role as the client. 

Once you have a client and user set up, you can obtain an access token like this:

```
#Example CURL request for keys
curl -X POST -d "grant_type=password&client_id=api_test{CLIENT_ID}&client_secret={SECRET}&username={USERNAME}&password={PASSWORD}" https://{YOURDOMAIN}/oauth/token
```

