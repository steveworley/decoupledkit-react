# Drupal Content Types

##### What are Drupal content types?
A single web site could contain many types of content, such as informational pages, news items, polls, blog posts, real estate listings, etc. In Drupal, each item of content is called a node, and each node belongs to a single content type, which defines various default settings for nodes of that type, such as whether the node is published automatically and whether comments are permitted.
Check more info on Content Types [here](https://www.drupal.org/docs/7/understanding-drupal/content-types)

This DrupalKit offers following 5 content types.

TODO: Content Types & fields - provide purpose of each type within the workflow

1. Basic Page - Use basic pages for your static content, such as an 'About us' page
    ```
    Body | body | Text (formatted, long, with summary)
    ```
2. Client - A collection of user clients for sample data.
    ```
    Country | field_country | Text (plain)
    Email | field_client_email | Email
    First Name | field_first_name | Text (plain)
    Last Name | field_last_name | Text (plain)
    ```
3. Dogs - A content type to display common schema constructs with fields.
    ```
    Description | body | Text (formatted, long, with summary)
    dog picture | field_dog_picture	Image
    History and Background | field_history_and_background | Text (formatted, long, with summary)
    ```
4. Marvel Characters - Marvel character nodes to be used as sample data.
    ```
    Description	| field_description	| Text (formatted, long)
    Image Reference	| field_image_reference | Text (plain)
    Marvel ID | field_marvel_id | Text (plain)
    Nemesis | field_nemesis | Text (plain)
    ```
5. Pokemon - Various characters from the Pokemon game series.
    ```
    Abilities |	field_abilities	| Entity reference	
    Attack | field_attack |	Number (integer)	
    Back Shiny (image sprite) |	field_back_shiny_sprite | Text (plain)
    Defense | field_defense | Number (integer)
    Front Shiny (image sprite) | field_front_shiny_sprite | Text (plain)
    Height | field_height_pokemon | Number (integer)
    HP | field_hp | Number (integer)
    Pokemon ID | field_pokemon_id | Number (integer)
    Special Attack | field_special_attack | Number (integer)
    Special Defense | field_special_defense | Number (integer)
    Speed | field_speed | Number (integer)
    Type | field_type_pokemon_ref | Entity reference
    Weight | field_weight_pokemon | Number (integer)
    ```

