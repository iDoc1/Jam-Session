# Jam Session
CS 467 Capstone Project  
Created by Nick Bowden and Ian Docherty

## Introduction
The goal of this project was to create a web application that makes finding musicians, groups, and gigs convenient while providing some interactivity and community.  

This app was co-developed by Ian Docherty and Nick Bowden. The development effort was split down the middle, with Ian focusing on the backend and Nick on the frontend. Thus, the majority of the code in the backend/ directory was written by Ian, and that in the frontend/ directory was written by Nick.

The result of this project was a full-stack web application that utilizes Django and React, two of the most popular tools available for building web applications. The final project was hosted on Heroku, but has since been taken down to avoid the costs to host the application.

For a video demoing the live application on Heroku, as well as a discussion on the development efforts, follow this link:

[![App Demo](https://img.youtube.com/vi/eTqZM5ntU-M/0.jpg)](https://www.youtube.com/watch?v=eTqZM5ntU-M&ab_channel=NickB)

## Development Process Overview
This project was developed using Agile practices. Each sprint was 1 week long. All branches merged with main were required to pass the CI/CD pipeline test suite and had to be reviewed by the other team member. Team meetings were held frequently to assess progess, collaborate on any challenges, and reflect on improvements going forward.

Depicted below are some of the artifacts created during the planning stages.  

Database ER Diagram: Created by Ian to visualize the database schema  
![schema](/screenshots/database_schema.png)  

Figma UI Mockup: Below are a few screenshots of the UI mockup created by Nick  
![profile-page](/screenshots/profile_page.png)  
![posts-page](/screenshots/posts_search_page.png)  

This is just a glimpse of the project planning and development process. For a more in depth discussion, see the video link at the top of this README.

## Screenshots
 Shown below are a few screenshots providing a brief overview of the finished project. For a live demo of the app, see the video link in the Introduction section.  

Profile page: This is where users can view and edit their profile information and listen to music samples of other users.  
![profile-final](/screenshots/final_profile_page.png)  

Posts search page: This is where users can search for posts given a genre, instrument, zipcode, and location radius.  
![posts-final](/screenshots/final_posts_page.png)  

Individual post page: This is where users can view the details of an individual post and write comments below the post.  
![final-individual-post](/screenshots/final_individual_post_page.png)  

## Software Listings
Below are the major software frameworks and libraries used to build this project.  

### Frontend
- React using TypeScript
- React-Router for navigation
- Material UI for media player
### Backend
- Django and Python for the API
- Django Rest Framework for the REST API
- Djoser and Django Rest Framework Simple JWT for authentication
- Gunicorn for the WSGI server
- SQLite as the development database
- PostgreSQL as the deployment database (provided by Heroku)
### Web Platform
- Heroku for the cloud application platform
- AWS for the cloud storage for photos and music sample files
### Testing
- GitHub actions for the CI/CD pipeline
- Jest for frontend unit tests
- Selenium for E2E testing
- Python unittest for backend using Django Rest Framework API client