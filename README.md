# Social Media Messaging App - Node.js Backend

![App Logo](./assets/Images/SocialCode.png)

This is the backend component of our Social Media Messaging App(SocialCode) built with Node.js. It provides the server-side logic and APIs for our application.

## Table of Contents
1. Installation
2. Usage
3. API Endpoints
4. Database
5. Authentication
6. Contributing
7. License

### 1. Installation

To get started with the development or deployment of this backend, follow these steps:

Clone the repository:
git clone https://github.com/yourusername/social-media-backend.git

Install dependencies:
cd social-media-backend
npm install


Configure environment variables:
Create an environment.js file in the config directory with the following environment variables:

PORT=8000
DATABASE_URI=mongodb://localhost:27017/social_media_db
JWT_SECRET=your_secret_key

Replace your_secret_key with your actual secret key for JWT authentication.

Start the server:
npm start

The server should now be running on http://localhost:8000.

### Usage
This backend provides the necessary APIs for the social media messaging app. You can integrate it with the frontend or test the APIs using tools like Postman or curl.

### API Endpoints
Here are the main API endpoints provided by this backend:

POST /user/register: Register a new user.
![Register User](./assets/Images/Register%20user.png)

POST /user/login: Authenticate and log in a user.
![Login User](./assets/Images/Login%20user.png)

GET /user/profile: Get the user's profile information.

PUT /user/profile: Update the user's profile.

POST /post/create: create new post only when user is logged in
![Create Post](./assets/Images/Create%20post.png)

DELETE /post/destroy/postId : delete a post having id as postId only when user is logged in
![Delete Post](./assets/Images/Delete%20%20post.png)

POST /comment/create: create new comment when user is logged in
![Create Comment](./assets/Images/Create%20comment.png)

DELETE /post/destroy/commentId : delete a comment having id as commentId only when user is logged in
![Delete Comment](./assets/Images/Delete%20%20comment.png)

Get /like/toggle: toggle to like or dislike a post/comment only when user is logged in
![Toggle Like](./assets/Images/Toggle%20Like.png)


Database
This backend uses MongoDB as its database. You can set up a local MongoDB instance or use a cloud-based solution like MongoDB Atlas.

Authentication
User authentication is implemented using JSON Web Tokens (JWT). Make sure to keep your JWT secret key secure.

Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow our contribution guidelines.

License
This project is licensed under the MIT License.




