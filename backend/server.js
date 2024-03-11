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
const tesseract = require('node-tesseract-ocr');

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3,
};

const imageUrl = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
const imagePath = './image.png'; // Path to save the downloaded image

axios
  .get(imageUrl, { responseType: 'arraybuffer' })
  .then((response) => {
    fs.writeFileSync(imagePath, Buffer.from(response.data, 'binary'));

    return tesseract.recognize(imagePath, config);
  })
  .then((text) => {
    console.log('Result:', text);
  })
  .catch((error) => {
    console.log(error.message);
  });




const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-c8c9y1bvg50Q6HARolikGPnK",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.9,
      top_p: .2,
      n: 1,
    

    });

    res.json({ message: response.data.choices[0].text });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});



const assetsPath = path.join(__dirname, '..', 'frontend', 'src', 'assets');
app.use(express.static(assetsPath, {
  setHeaders: (res, filePath) => {
    const mimeType = mime.lookup(filePath);
    if (path.extname(filePath) === '.gltf') {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'inline');
    } else {
      res.setHeader('Content-Type', mimeType);
    }
  },
}));



// Handle POST requests to /submit-code
app.post('/submit-code', async (req, res) => {
  const code = req.body.code;
  const languageId = req.body.languageId;
  const stdin = req.body.stdin;
  const expectedOutput = req.body.expectedOutput;
  console.log("Input",stdin);
  console.log("Expected Output",expectedOutput);

  try {
    // Make a POST request to Judge0 API
    const response = await axios.post('https://judge0.p.rapidapi.com/submissions', {
      source_code: code,
      language_id: languageId, // Replace with the language ID of the code you're submitting
      stdin: stdin,
      expected_output: expectedOutput

    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': api,
         'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    });

    const submissionId = response.data.token;

    // Use the submission ID to check the status of the submission or get the results
    // You can make additional API calls to Judge0 endpoints to retrieve the results

    res.status(200).json({ submissionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



// Handle GET requests to /submission/:submissionId
app.get('/submission/:submissionId', async (req, res) => {
    const { submissionId } = req.params;
  
    try {
      // Make a GET request to Judge0 API to retrieve submission results
      const response = await axios.get(`https://judge0.p.rapidapi.com/submissions/${submissionId}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': api,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      });
  
      const submissionResult = response.data;
      
  
      res.status(200).json({ submissionResult });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });




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

    //gene



  
    // Now you can use the Firebase Admin SDK to access Firebase services
    // and perform administrative tasks, such as managing users, database operations, etc.





    //Post request to create competition with competition name start date time and end date time decription assingn a unique id to each competition

    app.post('/create-competition', async (req, res) => {
      const { competitionName, startDate, startTime, endDate, endTime, description } = req.body;
      console.log(competitionName, startDate, startTime, endDate, endTime, description);

      //caluculate remaining time for competition to start in days hours minutes
      const startDateObject = new Date(`${startDate}T${startTime}`);
      const endDateObject = new Date(`${endDate}T${endTime}`);
      const currentDate = new Date();
      
   
     // if current date is greater than start date and lesser than end date then competition is active else not active
      let activetime = false;
      if(currentDate >= startDateObject && currentDate <= endDateObject) {
        activetime = true;
      }
      // if activetime is true then calucalate remaining time to end competition in hours else find remaining time to start competition
      let remainingTimeString = '';
      let remainingTimeStrings = ''
      if(activetime) {
        const remainingTime = endDateObject - currentDate;
        console.log("Remaining time",remainingTime);
        const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
        console.log("Remaining hours",remainingHours);
        const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        remainingTimeString = ` ${remainingHours} hours ${remainingMinutes}minutes`;  
      } else {
        const remainingTime = startDateObject - currentDate;
        const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        remainingTimeString = `${remainingDays} days ${remainingHours} hours ${remainingMinutes} minutes`;
        remainingTimeStrings = `${remainingDays} days`;

      }


      try {
        const competition = await admin.firestore().collection('competitions').add({
          competitionName,
          startDate,
          startTime,
          endDate,
          endTime,
          description,
          remainingTimeString,
          remainingTimeStrings
     
        });
        res.status(200).json({ competitionId: competition.id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });




    


// get request to get upcoming competitions by comparing current date and time with start date and time of competition
app.get('/get-upcoming-competitions', async (req, res) => {
  try {
    const competitions = await admin.firestore().collection('competitions').get();
    const upcomingCompetitions = [];
    const currentDate = new Date();

    competitions.forEach((competition) => {
      const startDate = new Date(competition.data().startDate);
      const startTime = competition.data().startTime.split(':');
      startDate.setHours(startTime[0], startTime[1], 0); // Set the start time on the start date
      const endDate = new Date(competition.data().endDate);
      const endTime = competition.data().endTime.split(':');
      endDate.setHours(endTime[0], endTime[1], 0); // Set the end time on the end date

      if (startDate > currentDate) {
        upcomingCompetitions.push({
          competitionId: competition.id,
          ...competition.data()
        });
      } else if (startDate >= currentDate && startDate.getTime()>currentDate.getTime()) {
        upcomingCompetitions.push({
          competitionId: competition.id,
          ...competition.data()
        });
      }
      
    });

    res.status(200).json({ upcomingCompetitions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


// Get request to get ongoing competitions by comparing current date and time with start date and time of competition
app.get('/get-ongoing-competitions', async (req, res) => {
  try {
    const competitions = await admin.firestore().collection('competitions').get();
    const ongoingCompetitions = [];
    const currentDate = new Date();

    competitions.forEach((competition) => {
      const startDateTime = new Date(`${competition.data().startDate} ${competition.data().startTime}`);
      const endDateTime = new Date(`${competition.data().endDate} ${competition.data().endTime}`);
      if (startDateTime <= currentDate && endDateTime >= currentDate) {
        ongoingCompetitions.push({
          competitionId: competition.id,
          ...competition.data()
        });
      }
    });
    res.status(200).json({ ongoingCompetitions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


   

    app.delete('/delete-competition/:competitionId', async (req, res) => {
      try {
        const { competitionId } = req.params;
        console.log(competitionId)
        await admin.firestore().collection('competitions').doc(competitionId).delete();
        res.status(200).json({ message: 'Competition deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });

    //update current competition by competition id
   app.put('/update-competition/:competitionId', async (req, res) => {
      const { competitionId } = req.params;
      const { competitionName, startDate, startTime, endDate, endTime, description } = req.body;
      try {
        await admin.firestore().collection('competitions').doc(competitionId).update({
          competitionName,
          startDate,
          startTime,
          endDate,
          endTime,
          description
        });
        res.status(200).json({ message: 'Competition updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });


    //get request to get competition by competition id
    app.get('/get-competition/:competitionId', async (req, res) => {
      const { competitionId } = req.params;
      try {
        const competition = await admin.firestore().collection('competitions').doc(competitionId).get();
        res.status(200).json({ competition: { competitionId: competition.id, ...competition.data() } });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });
 



    //edit competition by competition id
    app.post('/edit-competition/:competitionId', async (req, res) => {
      const { competitionId } = req.params;
      const { competitionName, startDate, startTime, endDate, endTime, description } = req.body;
      try {
        await admin.firestore().collection('competitions').doc(competitionId).update({
          competitionName,
          startDate,
          startTime,
          endDate,
          endTime,
          description
        });
        res.status(200).json({ message: 'Competition updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });




    app.post('/create-question/:competitionId', async (req, res) => {
      const { competitionId } = req.params;
      const { questionName ,Tags, problemStatement, inputFormat, outputFormat, constraints, Difficulty, maxMarks } = req.body;
      try {
        const question = await admin.firestore().collection('competitions').doc(competitionId).collection('questions').add({
          questionName,
          Tags,
          problemStatement,
          inputFormat,
          outputFormat,
          constraints,
         Difficulty,
          maxMarks
        });
        res.status(200).json({ questionId: question.id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });


    //generate a put request for above post request to update question by question id
    app.put('/update-question/:competitionId/:questionId', async (req, res) => {
      const { competitionId, questionId } = req.params;
      const { questionName, problemStatement, inputFormat, outputFormat, constraints, Tags, maxMarks } = req.body;
      try {
        await admin.firestore().collection('competitions').doc(competitionId).collection('questions').doc(questionId).update({
          questionName,
          problemStatement,
          inputFormat,
          outputFormat,
          constraints,
          Tags,
          maxMarks
        });
        res.status(200).json({ message: 'Question updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });



    //get request to get question by question id
    app.get('/get-question/:competitionId/:questionId', async (req, res) => {
      const { competitionId, questionId } = req.params;
      try {
        const question = await admin.firestore().collection('competitions').doc(competitionId).collection('questions').doc(questionId).get();
        res.status(200).json({ question: { questionId: question.id, ...question.data() } });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });
    

  //put request to update question by question id
    

    //delete request to delete question by question id
    app.delete('/delete-question/:competitionId/:questionId', async (req, res) => {
      try {
        const { competitionId, questionId } = req.params;
        await admin.firestore().collection('competitions').doc(competitionId).collection('questions').doc(questionId).delete();
        res.status(200).json({ message: 'Question deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });


    //get request to get all questions of a competition by competition id
    app.get('/get-questions/:competitionId', async (req, res) => {
      const { competitionId } = req.params;
      try {
        const questions = await admin.firestore().collection('competitions').doc(competitionId).collection('questions').get();
        const questionsList = [];
        questions.forEach((question) => {
          questionsList.push({
            questionId: question.id,
            ...question.data()
          });
        });
        res.status(200).json({ questionsList });
      } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });







    //this part is used for showing question in practice section

     //get request to get completed competitions by comparing current date and time with end date and time of competition
     app.get('/get-completed-competitions', async (req, res) => {
      try {
        const competitions = await admin.firestore().collection('competitions').get();
        const completedCompetitions = [];
        const currentDate = new Date();
        competitions.forEach((competition) => {
          const startDateTime = new Date(`${competition.data().startDate}T${competition.data().startTime}`);
          const endDateTime = new Date(`${competition.data().endDate}T${competition.data().endTime}`);
          if (endDateTime < currentDate) {
            completedCompetitions.push({
              competitionId: competition.id,
              ...competition.data()
            });
          }
        });
        res.status(200).json({ completedCompetitions });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });



    //get request to get questions of completed competition
    app.get('/get-questions-completed-competition/:competitionId', async (req, res) => {
      const { competitionId } = req.params;
      try {
        const questions = await admin.firestore().collection('competitions').doc(competitionId).collection('questions').get();
        const questionsList = [];
        questions.forEach((question) => {
          questionsList.push({
            questionId: question.id,
            ...question.data()
          });
        });
        res.status(200).json({ questionsList });
      } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });




       
  



    


   
//get request to get all competitions
  
    app.get('/get-competitions', async (req, res) => {
      try {
        const competitions = await admin.firestore().collection('competitions').get();
        const competitionsList = [];
        competitions.forEach((competition) => {
          competitionsList.push({
            competitionId: competition.id,
            ...competition.data()
          });
        });
        res.status(200).json({ competitionsList });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    });
    
  

   

    

  //Participate in competition
  //post request to enroll in competition by competition id and user details from authentication of firebase as of now I dont have a collection called participants in competition collection
 app.post('/enroll-competition/:competitionId/:userId', async (req, res) => {
    const { competitionId, userId } = req.params;
    const { name, email} = req.body;
    try {
      const participant = await admin.firestore().collection('competitions').doc(competitionId).collection('participants').doc(userId).set({
        name,
        email,
        totalScore: 0
      });
      res.status(200).json({ message: 'Enrolled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


  //get request to check if user is enrolled in competition or not by competition id and user id
  app.get('/check-enrolled/:competitionId/:userId', async (req, res) => {
    const { competitionId, userId } = req.params;
    try {
      const participant = await admin.firestore().collection('competitions').doc(competitionId).collection('participants').doc(userId).get();
      if (participant.exists) {
        res.status(200).json({ enrolled: true });
      } else {
        res.status(200).json({ enrolled: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });  
    }
  });


  //post request to create submission by competition id and participant id and question id
  app.post('/create-submission/:competitionId/:questionId/:participantId', async (req, res) => {
    const { competitionId, participantId, questionId } = req.params;
    const { code, languageId,output,time,memory,status} = req.body;
    try {
      const submission = await admin.firestore().collection('competitions').doc(competitionId).collection('participants').doc(participantId).collection('submissions').add({
        questionId,
        code,
        languageId,
        output,
        time,
        memory,
        status,
        score: 0


       
      });
      res.status(200).json({ submissionId: submission.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  //post request to generate score according to time complexity and memory complexity by competition id and participant id and question id
  
  app.post('/create-score/:competitionId/:questionId/:participantId/:submissionId', async (req, res) => {
    const { competitionId, participantId, questionId,submissionId } = req.params;
    const { time} = req.body;
    try {
     const submission = await admin.firestore().collection('competitions').doc(competitionId).collection('participants').doc(participantId).collection('submissions').doc(submissionId).get();
     const status = submission.data().status;
     const question = await admin.firestore().collection('competitions').doc(competitionId).collection('questions').doc(questionId).get();  
     const maxMark = question.data().maxMarks;
     let score =parseInt(submission.data().score)
     console.log("Status",status);
      console.log("Time",time);
      console.log("Max Marks",question.data().maxMarks);
     const currentscore= score; 
      // if score is already equal to maxMark then dont update score else update score according to status and time
      if(score === maxMark) {
        score = maxMark;
      } else {

        if(status === 'Accepted') {
                if(time<1){
                  score = maxMark;
                }
                else if(time<2){
                  score = maxMark- maxMark*0.5;
              } 
              else if(time<3){
                score = maxMark- maxMark*0.3;
            }
            else if(time<4){
              score = maxMark- maxMark*0.5;
            }
         }
        else if(status === 'Wrong Answer') {
          score = 0;
        }
      }
    
  console.log("score after logic",score)
      //update score in submission collection
      if(score>currentscore)
      await admin.firestore().collection('competitions').doc(competitionId).collection('participants').doc(participantId).collection('submissions').doc(submissionId).update({
        score
      });
      //add the obtained score to the scores collection of the participant
      res.status(200).json({ message: 'Score generated successfully',score });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  //I have a doubt when I generate score and add that score to total score for each submission , then the user will able to do the same question again and again and get the score added to total score again and again
  //so I have to add a condition that if the user has already done the question then he should not be able to do it again or 









  //get request to get number in integer of participants in a competition by competition id
  app.get('/get-participants-count/:competitionId', async (req, res) => {
    const { competitionId } = req.params;
    try {
      const participants = await admin.firestore().collection('competitions').doc(competitionId).collection('participants').get();
      res.status(200).json({ participantsCount: participants.size });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  
  
  



  //get request to get total score of a participant in a competition by competition id and participant id by adding all scores of all questions
  app.get('/get-total-score/:competitionId/:participantId', async (req, res) => {
    const { competitionId, participantId } = req.params;
    try {
      const submissions = await admin.firestore().collection('competitions').doc(competitionId).collection('participants').doc(participantId).collection('submissions').get();
      let totalScore = 0;
      //add higest score of each question(unique question id from submission) to total score of participant
      
      const questionIds = [];
      const scores = [];
      submissions.forEach((submission) => {
        const questionId = submission.data().questionId;
        let score =submission.data().score;
        const index = questionIds.indexOf(questionId);
        //if question id is not present in questionIds array then add it to array and add score to scores array
        //else if question id is present in questionIds array then check if score is greater than score in scores array if yes then update score in scores array
        if (index === -1) {
          questionIds.push(questionId);
          scores.push(score);
        } else {
          if (scores[index] < score) {
            scores[index] = score;
          }
        }
      });
      scores.forEach((score) => {
        totalScore = parseInt(totalScore+ score);
      });
      console.log("Total Score",totalScore);



      //update total score in participants collection
      await admin.firestore().collection('competitions').doc(competitionId).collection('participants').doc(participantId).update({
        totalScore
      });

      res.status(200).json({ totalScore });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


  //get request to get leaderboard of a competition by competition id by sorting participants based on their total score
  app.get('/get-leaderboard/:competitionId', async (req, res) => {
    const { competitionId } = req.params;
    try {
      const participants = await admin.firestore().collection('competitions').doc(competitionId).collection('participants').orderBy('totalScore', 'desc').get();
      const leaderboard = [];
      //add rank to each participant
      let rank = 1;
      participants.forEach((participant) => {
        leaderboard.push({
          rank: rank++,
          participantId: participant.id,
          ...participant.data()
        });
      });
      res.status(200).json({ leaderboard });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });



  





  // openai
  // .createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "user", content: "Hello" }],
  // })
  // .then((res) => {
  //   console.log(res.data.choices[0].message.content);
  // })
  // .catch((e) => {
  //   console.log(e);
  // });
  

 //post request to store user profile data in users collection by user id includes profile url, skills ,social links
 app.post('/profile/:uid', async (req, res) => {
  const { uid } = req.params;
  const { profileUrl, skills, socialLinks } = req.body;
  try {
    await admin.firestore().collection('userprofile').doc(uid).set({
      profileUrl,
      skills,
      socialLinks
    });
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }


  //get request to get user profile data from users collection by user id
  app.get('/profile/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
      const userProfile = await admin.firestore().collection('userprofile').doc(uid).get();
      res.status(200).json({ userProfile: userProfile.data() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
  );
  
});






    
  
  
  
  
  
  // Start the server
  app.listen(port, () => {
    
    console.log('Server is running on port 3000');
    console.log('process.env.RAPIDAPI_KEY', api);
  });



