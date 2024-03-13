//I have defined  x='333' in .env file in same folder as server.js
//I have to console.log the value of api key in server.js file
//console.log(process.env.RAPIDAPI_KEY);
// import { Configuration, OpenAIApi } from "openai";
// import readline from "readline";

const express = require('express');
//Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
// const { GPT } = require('openai');
const axios = require('axios');
//Axios is a popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node.js.
const cors = require('cors');

//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const app = express();
const port = 3000 || process.env.PORT;
app.use(cors());
app.use(express.json());
require('dotenv').config();
const path = require('path');
const mime = require('mime-types');
const api = process.env.x
console.log(api);

const openaiapi = process.env.OPENAI_API_KEY
console.log(openaiapi);

//to test tessaract-ocr package getting text from image
const fs = require('fs');


var generator = require('generate-password');

    //Admin Firebase
    const admin = require('firebase-admin');
    const serviceAccount = require('./pack.json');
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    admin
    .auth()
    .listUsers()
    .then((userRecords) => {
      console.log(userRecords);
      // The Admin SDK is authenticated and the user list was retrieved successfully
      console.log('Firebase Admin SDK is properly set up');
      console.log('Total user:', userRecords.users.length);
    })
    .catch((error) => {
      // There was an error authenticating or retrieving the user list
      console.error('Firebase Admin SDK setup error:', error);
    });
  
  
    const emails = ["code25545@gmail.com", "admin11@gmail.com"]; // Provide the emails of the users to grant admin access
  
  Promise.all(
    emails.map((email) =>
      admin
        .auth()
        .getUserByEmail(email)
        .then((userRecord) => {
          // Add the "admin" custom claim to the user
          const customClaims = {
            admin: true
          };
  
          return admin.auth().setCustomUserClaims(userRecord.uid, customClaims);
        })
        .then(() => {
          const uid = 'y6zzq071ARVhLDWzbSiV4dzIYZK2'; // Replace with the UID of the user you want to check
  
  admin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      const customClaims = userRecord.customClaims;
      if (customClaims && customClaims.admin) {
        console.log('User has admin access');
      } else {
        console.log('User does not have admin access');
      }
    })
    .catch((error) => {
      console.error('Error retrieving user:', error);
    })
        })
        .catch((error) => {
          console.error(`Error granting admin access to ${email}:`, error);
        })
    )
  )
    .then(() => {
      console.log("Admin access granted to all users");
    })
    .catch((error) => {
      console.error("Error granting admin access:", error);
    });


   

    //Firebase post request to verify user is admin or not
    app.post('/admin-status', async (req, res) => {
      const { uid } = req.body;

      try {
        const userRecord = await admin.auth().getUser(uid);
        const customClaims = userRecord.customClaims;
        if (customClaims && customClaims.admin) {
          res.status(200).json({ isAdmin: true });
        } else {
          res.status(200).json({ isAdmin: false });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });



    //CODE FOR CREATING DOCTOR USER IN FIREBASE WITH MAIL AND PASSWORD


    // Endpoint to create a user with a specific role
    app.post('/create-user', async (req, res) => {
      try {
        const { email } = req.body;
    
        // Generate a random password
        const password = generator.generate({
          length: 6,
          numbers: true,
          uppercase: true,
          symbols: false,
        });
    
        // Create the user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
          email,
          password,
        });
    
        // Assign the doctor role to the user
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'doctor' });
    
        // Return the generated password in the response
        res.status(200).json({ success: true, password });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, error: 'Failed to create user' });
      }
    });

    





  
  
  
  // Start the server
  app.listen(port, () => {
    
    console.log('Server is running on port 3000');
    console.log('process.env.RAPIDAPI_KEY', api);
  });



