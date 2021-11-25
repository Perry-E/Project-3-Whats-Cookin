# Project 3 - Startup Week (What’s Cookin)

## What is your application? 

Essentially this app is where users can subscribe to a service where they can select different cuisines and recipes of their preference and follow along step by step with the recipes provided 

Users can also submit their own recipes that can be reviewed (based on a rating system) and can comment on them accordingly

Users will have their own profiles where they can 
Manage their recipes of choice, (what they are planning to cook etc) - Planner
Contribute their own ideas/recipes to the growing list of recipes on the app - My recipes
Settings - TBC (Maybe to update user info)

## Wireframe
https://www.figma.com/file/I0CSCQFktP0fuWOagbMJe6/GA-Project-3?node-id=0%3A1

## What value does your application provide to your audience?
It's an avenue for users to explore different ideas to spice up their meals and share their own versions of recipes 
The individual recipes have clear and concise steps, each recipe also informs users of the estimated time it will take and a checklist of all the ingredients required (Perfect for users that are new to cooking)
 
## What steps have we taken to entice users?
Users can explore available meals submitted to the site, and use the guide function for the meal they have chosen. However to submit their own recipe, and to save their progress on the meal guide they would have to sign up for an account
 

## Technical Requirements
* Have at least 2 related models (with references) and an additional user model with authentication. There should be at least 2 types of users.
* Include all major CRUD functions for at least one of the models
* Manage team contributions and collaboration by using standard Git flow on Github.
* Nicely styled front-end with clean & well-formatted CSS, with or without a framework.
* Deploy your application online, so that it is publically accessible
* User stories that apply to the functionality of your app, crafted as a team.
* Wireframes for the views you planned to create

## Tech used
* MongoDB 
* Express
* React
* Node
 
## General Approach
## Main/Landing page
A quick introduction (What this website is about, how users can make the most out of this app)
A selection of meals that users can quickly access to (Most viewed/Well reviewed)
 
## Sign Up
Requires Name, Email, Password
 
## Log In
Requires Email and Password

## Meals Page
When users click on the meals link on the nav bar or the see more button, they are redirected to the Meals page where they can view different meals, sorted according to Breakfast, Lunch and Dinner
When users have decided and clicked into a recipe then they will be directed to the individual recipe (show page)
 
## Individual Recipe (Show Page)
How long it will take, and rating of the recipe
Shows users the ingredients needed
Step by step guide
The ability to add to their planner (Provided they are logged in)
Ability to view the reviews made by users (And add one if they are logged in)
 
## Profile Page
Individual profile page where the user can access the recipes that they added 
View their own recipes that they contributed to the app
Settings, where they can edit their personal info
 
## Create Recipe Page
Where users can add the relevant information about their recipe that they would like to contribute
View their own recipes that they contributed to the app
Settings, where they can edit their personal info
 
## Meal helper
The first page shows the selected recipe’s ingredients, and the option for users to check off the items when they have it
Pressing next brings them to a step by step guide on how to proceed
When the cooking is done, they can leave a review on the difficulty, how it tastes etc (Not a requirement so they an skip it if they press done)

