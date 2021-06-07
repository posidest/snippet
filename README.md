# snippet
![splash](https://github.com/posidest/snippet/blob/main/frontend/public/snippet-splash-update.png)

## Table of contents
* [About](#about)
* [Motivation](#motivation)
* [Technologies](#technologies)
* [Features](#features)
* [Installation](#installation)


## About
snippet is a tumblr clone for artists and designers to collect visual inspiration.

## Motivation
I've always found tumblr to be a great site for collecting and curating imagery. I like the overall layout, design, and user interface, and wanted to try to build something similar. 
snippet is specifically geared towards artists and designers, with the goal of giving them a place to stash images for inspiration, photo reference, etc. in order to circumvent the need to look through a bunch of bookmarked tabs.

## Technologies
### Back End
snippet uses an Express.js back end with Sequelize as an ORM to manage a PostGresQL database.

### Front End
snippet uses React.js and Redux.js with vanilla CSS for styling. 

### Other
snippet uses AWS S3 for image storage.

## Features

### User Authorization
- A user can sign up securely with the option of uploading an avatar.   
- A user can login securely as well as logout easily.

### Blogs  
- Upon sign up, a blog is created for each user with the provided blog name chosen by the user.
- Users can repost other people's content to their blog, as well as post their own content to their blog.
- Blogs are a place to curate images, words, and links, to save as inspiration, self expression, or just for fun.

### Posts
- A user can post images, words, or links, all with optional captions.
- A user can repost another user's post, preserving the original caption.
- A user can like a post, and likes on posts are displayed.

### Dashboard
- Users can follow blogs, and posts from the blogs they follow will be displayed on their dashboard. 
- Posts on the dashboard will show the original owner of each post, with the option to follow their blog. 
- Other blogs to follow are displayed on a side bar, so you can find new blogs to follow.


