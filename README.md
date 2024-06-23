# FileManager-App

## Getting Started

1. Clone the repository with `git clone "repository link"`
2. Go to the folder where you cloned your repository
3. Run `docker-compose build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose up`
5. You have to be standing in the folder containing the: `docker-compose.yml`

NOTE: In the folder whose location is: `filemanager-app/src/cloud`, inside the cloud folder will be created the folders for each user registered in the application. The name of the main folder refers to the user's username. 

## Description

This repository is a FileManager created in NextJS 14.

- Login, registration, email verification and password retrieval system
- Auth system via JWT with public and private routes
- Email sending with NodeMailer
- Statistics of available space in your home folder
- Folder creation
- File uploading
- Folder and file deletion
- Navigating through folders
- And much more

## Technologies used

1. NextJS 14
2. Docker
3. MongoDB
4. Tailwind CSS
5. Typescript

## Libraries used

1. ReduxJS - Redux Toolkit
2. Axios
3. Bcryptjs
4. Jose -> JWT
5. Mongoose

## Portfolio Link

Cooming soon...

[`https://www.diegolibonati.com.ar/#/project/109`](https://www.diegolibonati.com.ar/#/project/109)

## Video

Cooming soon..

## Documentation APP

### **Version**

```
APP VERSION: 1.0.0
README UPDATED: 23/06/2024
AUTHOR: Diego Libonati
```

### **Env Keys**

NOTE: You must create the .env inside the folder filemanager-app

1. `WATCHPACK_POLLING`: If set to True fixes the hot reloading problem
2. `NEXT_PUBLIC_API_URL`: This is the link to the application if you are in development leave it as localhost
3. `MONGODB_URI`: This is the connection URI to the mongo database
4. `SECRET_KEY_AUTH`: This environment variable is a random string for signing JWT tokens.
5. `EMAIL`: Here you will enter your email
6. `EMAIL_PASS`: Here you will enter the application password generated for your email or email company.

```
# React
WATCHPACK_POLLING=true

# Frontend Envs
NEXT_PUBLIC_API_URL=http://localhost:3000

# Backend Envs
MONGODB_URI=mongodb://root:pass@host.docker.internal:27017/filemanager?authSource=admin
SECRET_KEY_AUTH=MO1GlDj3f88CzE294KePeWiT9GLG3qIoE9inxNYBadkBwfCUo1
EMAIL=YOUREMAIL@gmail.com
EMAIL_PASS=Your password application
```

### **FileManger Endpoints API**

NOTE: All the endpoints except the AUTH endpoints, must have a header with the name `Authorization` whose value of this key is the TOKEN generated by `JWT` when we log in the APP. We can get it from the cookies.

-----

- **Endpoint Name**: Alive
- **Endpoint Route**: /api/v1/alive
- **Endpoint Method**: GET
- **Endpoint Fn**: This endpoint returns the version, author and name of the api.

-----

- **Endpoint Name**: Login
- **Endpoint Route**: /api/v1/auth/login
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint used to log in to an existing account. Receives a username and password body

-----

- **Endpoint Name**: LogOut
- **Endpoint Route**: /api/v1/auth/logout
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint for logging out of the application

-----

- **Endpoint Name**: Register
- **Endpoint Route**: /api/v1/auth/register
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint used to register in the application to log in and access the account. You receive a username, email and password body.

-----

- **Endpoint Name**: Reset Password
- **Endpoint Route**: /api/v1/auth/reset
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint that serves to reset the password of a specific account by parameter we will have the id of the hashed user and the username. And for body we will send the new password through the key: password

-----

- **Endpoint Name**: Send Email Reset Password
- **Endpoint Route**: /api/v1/auth/send_email_reset
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint used to send an email to reset the password of an account. Send a body with the email to send the email.

-----

- **Endpoint Name**: Verify Email
- **Endpoint Route**: /api/v1/auth/verify
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to verify the email address of our account. By parameters it will send the id of the hashed user and the username of the account to be verified.

-----

- **Endpoint Name**: Get Categories
- **Endpoint Route**: /api/v1/filemanager/categories
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to obtain all the categories of the application.

-----

- **Endpoint Name**: Get Categories Files
- **Endpoint Route**: /api/v1/filemanager/categories/files
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to obtain the files of a specific category. It receives by parameters the id of the category to check.

-----

- **Endpoint Name**: Get All Folders
- **Endpoint Route**: /api/v1/filemanager/folders
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to obtain all the folders of the application.

-----

- **Endpoint Name**: Get Recent Upload File
- **Endpoint Route**: /api/v1/filemanager/recent_upload
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint that serves to obtain the most recent file uploaded to our account.

-----

- **Endpoint Name**: Get Space Used
- **Endpoint Route**: /api/v1/filemanager/space_used
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint that serves to obtain information about the available, used and limited space in our account that varies depending on the plan.

-----

- **Endpoint Name**: Upload File
- **Endpoint Route**: /api/v1/filemanager/upload
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint used to upload a file. We must pass through the body a formData with the file and the path to upload (the path has to be existing).

-----

- **Endpoint Name**: Get Content of Folder
- **Endpoint Route**: /api/v1/filemanager
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to get all files and folders from a specific path sent by parameter.

-----

- **Endpoint Name**: Create Folder
- **Endpoint Route**: /api/v1/filemanager
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint which is used to create a specific folder by passing the path to where the folder should be created as a parameter.

-----

- **Endpoint Name**: Delete Folder Or File
- **Endpoint Route**: /api/v1/filemanager
- **Endpoint Method**: DELETE
- **Endpoint Fn**: Endpoint used to delete a folder or file. By parameter we will pass the path to delete and the type to delete if it is a folder or file.

-----

- **Endpoint Name**: Change Plan
- **Endpoint Route**: /api/v1/user/change_plan
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to change the plan of an account by passing by parameter the plan to change. 0 free and 1 paid.

-----

- **Endpoint Name**: Send Email To Verify
- **Endpoint Route**: /api/v1/user/send_email_to_verify
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to forward mail for account verification

-----

- **Endpoint Name**: Get User Info
- **Endpoint Route**: /api/v1/user/user_info
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to obtain information about the active user, i.e., logged in.

-----