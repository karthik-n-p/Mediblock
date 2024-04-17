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

const logger = require('winston');

const mongoose = require('mongoose');

const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');

//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const app = express();
const port = 3000 || process.env.PORT;
app.use(cors());
app.use(express.json());
require('dotenv').config();


const api = process.env.x
console.log(api);


mongoose.connect(process.env.MONGODB_URI,)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));


const openaiapi = process.env.OPENAI_API_KEY
console.log(openaiapi);

//to test tessaract-ocr package getting text from image

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



    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    
    app.post('/upload/:uid', upload.single('file'), async (req, res) => {
      const { uid } = req.params;
    
      try {
        const file = req.file;
        
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        const formData = new FormData();
        formData.append('file', file.buffer, { filename: file.originalname });
        const pinataMetadata = JSON.stringify({ name: file.originalname });
        formData.append('pinataMetadata', pinataMetadata);
        const pinataOptions = JSON.stringify({ cidVersion: 1 });
        formData.append('pinataOptions', pinataOptions);
    
        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${process.env.PINATA_JWT}`,
            },
          }
        );
    
        console.log('File uploaded to Pinata:', response.data.IpfsHash);
    
        const patient = await Patient.findOne({ uid });
    
        if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
        }
    
        const newFile = {
          filename: file.originalname,
          fileSize: file.size,
          ipfsHash: response.data.IpfsHash,
        };
    
        patient.files.push(newFile);
        await patient.save();
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error uploading file to Pinata:', error);
        res.status(500).json({ error: 'Failed to upload file to Pinata' });
      }
    });
    

const Patient = require('./models/patient');


app.get('/files/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    // Search for patient with the same uid
    const patient = await Patient.findOne({ uid });

    // If the patient does not exist, return an error
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Extract the IPFS hashes of the patient's files from MongoDB
 // Extract the IPFS hashes of the patient's files from MongoDB
const patientIPFSHashes = patient.files.flatMap(innerArray => innerArray.map(file => file.ipfsHash));

    console.log('Patient IPFS hashes:', patientIPFSHashes);

    // Fetch all pinned files from Pinata
    const response = await axios.get(
      'https://api.pinata.cloud/data/pinList?status=pinned',
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`, // Replace with your Pinata JWT
        },
      }
    );
    console.log('response', response.data.rows);

    // Filter the pinned files to only include those with IPFS hashes present in both MongoDB and the retrieved list
    const patientFiles = response.data.rows.filter(file => patientIPFSHashes.includes(file.ipfs_pin_hash));

    console.log('Patient files:', patientFiles);

    // Send the filtered files as the response
    res.status(200).json(patientFiles);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});



















    app.post('/create-user/:uid', async (req, res) => {
      try {
        const { email } = req.body;
        const { name } = req.body;
        const { uid } = req.params;
    
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
          displayName: name,
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






    const Doctor = require('./models/doctors');
const Clinic = require('./models/clinic');
   
    // Endpoint to save doctor details in MongoDB

    app.post('/save-doctor/:id', async (req, res) => {
      try {
        const { name, specialization, availability } = req.body;
        const { id } = req.params;
        console.log("id",id);

        let  numberofAppointments = 0;
        let  numberofofflineAppointments = 0;
        let  numberofonlineAppointments = 0;
        
        // Find the clinic document with the clinic ID
        const clinic = await Clinic
        .findOne ({ id: id });

        if (!clinic) {
          return res.status(404).json({ success: false, error: 'Clinic not found' });
        }


    
        // Create a new Doctor document
        const doctor = new Doctor({
          name,
          specialization,
          availability,
          clinicId: id,
          ClinicName: clinic.name,
          role: 'doctor',
          numberofAppointments,
          numberofofflineAppointments,
          numberofonlineAppointments,

        });

        // save the doctor details inside the colection Doctors if the doctor is created in mongodb database console log the message

        await doctor.save();

        if (doctor){
          console.log("doctor created in mongodb database");
        }
        
    
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error saving doctor details:', error);
        res.status(500).json({ success: false, error: 'Failed to save doctor details' });
      }
    }
    );



    // Endpoint to fetch all doctors from MongoDB

    app.get('/doctors', async (req, res) => {
      try {
        const doctors = await Doctor.find({});
        res.status(200).json(doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors' });
      }
    }
    );


    // Endpoint to save patient details in MongoDB
    app.post('/save-patient/:doctorName', async (req, res) => {
      
    
      try {
        const { doctorName } = req.params;
      const { patientName, bookedSlot } = req.body;

      console.log("doctorName",patientName, "bookedSlot",bookedSlot);
        // Find the doctor document with the doctor name

        const doctor = await Doctor.findOne({ name: doctorName });


        
    
        if (!doctor) {
          console.log("doctor not found");
          return res.status(404).json({ success: false, error: 'Doctor not found' });
         
        }
    
        // Update the doctor's document to save patient details
        doctor.appointments.push({ name: patientName, bookedSlot: bookedSlot, status: 'booked'});
  
        await doctor.save();
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error saving patient details:', error);
        res.status(500).json({ success: false, error: 'Failed to save patient details' });
      }
    });


    // Endpoint to fetch patients for a specific doctor from MongoDB

    app.get('/patients/:doctorName', async (req, res) => {
      try {
        const { doctorName } = req.params;
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        res.status(200).json(doctor.appointments);
      } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
      }
    }
    );



    // endpoint to save patient details in MongoDB

    app.post('/create-patient', async (req, res) => {
      try {
        const { username, email, uid } = req.body;
    
        // Create a new Patient document if the patient does not exist
        const patient = await Patient
        .findOne({ uid });

        if (patient) {

          console.log("patient already exists");
          return res.status(400).json({ success: false, error: 'Patient already exists' });
        }

        const newPatient = new Patient({
          name: username,
          email,
          uid,
        });

        await newPatient.save();


    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ success: false, error: 'Failed to create patient' });
      }
    }
    );


    //end point to share patient details with doctor

    app.post('/share', async (req, res) => {
      const {  patientname, fileId } = req.body;
      console.log("patientname",patientname, "fileId",fileId);
      try {
       

    
        // Find the doctor document with the doctor ID
        const doctor = await Doctor.findOne({ name: fileId });
    
        if (!doctor) {
          console.log("Doctor not found");
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }
    
        // Find the patient document with the patient name
        const patient = await Patient.findOne({ name: patientname });
    
        if (!patient) {
          console.log("Patient not found");
          return res.status(404).json({ success: false, error: 'Patient not found' });
        }
     // Extract file information from the patient's files array
     const sharedFiles = patient.files.map(file => ({
      filename: file[0].filename,
      fileSize: file[0].fileSize,
      ipfsHash: file[0].ipfsHash,
    }));

    // Push the extracted file information to the doctor's sharedDocuments array
    doctor.sharedDocuments.push({ patientId: patientname, files: sharedFiles });
    await doctor.save();


        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error sharing documents:', error);
        res.status(500).json({ success: false, error: 'Failed to share documents' });
      }
    });


    // Endpoint to fetch shared documents for a specific doctor from MongoDB

    app.get('/shared-documents/:doctorName', async (req, res) => {
      try {
        const { doctorName } = req.params;
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        res.status(200).json(doctor.sharedDocuments);
      } catch (error) {
        console.error('Error fetching shared documents:', error);
        res.status(500).json({ error: 'Failed to fetch shared documents' });
      }

    }

    );

    // Endpoint to fetch shared documents for a specific patient from MongoDB
    









    //end point to create slot for doctor
    app.post('/create-slot', async (req, res) => {
      try {
        const { doctorName, date, startTime, endTime } = req.body;
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne({ name: doctorName });
    
        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }
        console.log('Doctor:', doctor); 
        // Check if the date already exists in the doctor's availability array
        const existingDate = doctor.availability.find(slot => slot.date.toString() === new Date(date).toString());  
        if (existingDate) {
          // Check if the time slot already exists in the existing date
          const existingSlot = existingDate.timeSlots.find(slot => slot.startTime === startTime && slot.endTime === endTime);
          if (existingSlot) {
            return res.status(400).json({ success: false, error: 'Slot already exists' });
          }

          //if the date is from past then return the error
          if (new Date(date) < new Date()) {
            return res.status(400).json({ success: false, error: 'Cannot create slot for past date' });
          }

          // Add the new time slot to the existing date after checking the time slot is not clashed with existing time slot
          if(existingDate.timeSlots.length > 0){
            for (let i = 0; i < existingDate.timeSlots.length; i++) {
              if((startTime >= existingDate.timeSlots[i].startTime && startTime <= existingDate.timeSlots[i].endTime) || (endTime >= existingDate.timeSlots[i].startTime && endTime <= existingDate.timeSlots[i].endTime)){
                return res.status(400).json({ success: false, error: 'Slot already exists' });
              }

  
            }
          }
          existingDate.timeSlots.push({ startTime, endTime, availability: true });
        } else {
           //if the date is from past then return the error
           if (new Date(date) < new Date()) {
            return res.status(400).json({ success: false, error: 'Cannot create slot for past date' });
          }
          // Create a new date with the new time slot
          doctor.availability.push({ date: new Date(date), timeSlots: [{ startTime, endTime, availability: true }] });
        }
    
        await doctor.save();
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error creating slot:', error);
        res.status(500).json({ success: false, error: 'Failed to create slot' });
      }
    });


    // Endpoint to fetch available slots for a specific doctor from MongoDB

    app.get('/slots/:doctorName', async (req, res) => {
      try {
        const { doctorName } = req.params;
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        res.status(200).json(doctor.availability);
      } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ error: 'Failed to fetch slots' });
      }
    }
    );


    // Endpoint to remove a slot for a specific doctor from MongoDB 

    app.post('/remove-slot', async (req, res) => {
      try {
        const { doctorName, date, startTime, endTime } = req.body;
    
        // Find the doctor document with the doctor name
        const doctor = await Doctor.findOne
        ({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        // Find the date with the specified date
        const existingDate = doctor.availability.find(slot => slot.date.toString() === new Date(date).toString());

        if (!existingDate) {
          return res.status(404).json({ success: false, error: 'Date not found' });
        }

        // Find the time slot with the specified start and end times
        const existingSlot = existingDate.timeSlots.find(slot => slot.startTime === startTime && slot.endTime === endTime);

        if (!existingSlot) {
          return res.status(404).json({ success: false, error: 'Slot not found' });
        }

        // Remove the time slot from the date
        existingDate.timeSlots = existingDate.timeSlots.filter(slot => slot.startTime !== startTime && slot.endTime !== endTime);

        await doctor.save();

        res.status(200).json({ success: true });

      } catch (error) {
        console.error('Error removing slot:', error);
        res.status(500).json({ success: false, error: 'Failed to remove slot' });
      }

    }
    );



    // Endpoint to book a slot for a specific doctor from MongoDB

    app.post('/book-slot', async (req, res) => {

      try {

        const { doctorName, date, startTime, endTime, patientName, mode ,meetingLink } = req.body;

        // Find the doctor document with the doctor name

        const doctor = await Doctor.findOne({ name: doctorName });

        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        // Find the date with the specified date

        const existingDate = doctor.availability.find(slot => slot.date.toString() === new Date(date).toString());

        if (!existingDate) {

          return res.status(404).json({ success: false, error: 'Date not found' });

        }


        // Find the time slot with the specified start and end times


        const existingSlot = existingDate.timeSlots.find(slot => slot.startTime === startTime && slot.endTime === endTime);

        if (!existingSlot) {
            
            return res.status(404).json({ success: false, error: 'Slot not found' });
  
          }

          // Check if the slot is already booked

          if (!existingSlot.availability) {
            return res.status(400).json({ success: false, error: 'Slot already booked' });
          }

          // Update the slot to mark it as booked

          existingSlot.availability = false;

          //upate the number of appointments for the doctor

          doctor.numberofAppointments = doctor. numberofAppointments + 1;



          const patient = await Patient
          .findOne({ name: patientName });

          console.log("patient",patient);

          if (!patient) {
            return res.status(404).json({ success: false, error: 'Patient not found' });
          }

          // Update the doctor's document to save patient details 

          //if mode is online then save the meeting link else save the mode as offline 

          if(mode === 'online'){
           //set meeting link with unique id for each meeting
           const meetingLink = generator.generate({
            length: 6,
            numbers: true,
            uppercase: true,
            symbols: false,
          });
          //upate the number of online appointments for the doctor
          doctor.numberofonlineAppointments = doctor. numberofonlineAppointments + 1;

          doctor.appointment.push({ patientName, bookedSlot: { date, startTime, endTime }, status: 'booked', mode: 'online', meetingLink });
          patient.appointments.push({ doctorName, bookedSlot: { date, startTime, endTime }, status: 'booked', mode: 'online', meetingLink });

          }
          else{
            //upate the number of offline appointments for the doctor
            doctor.numberofofflineAppointments = doctor. numberofofflineAppointments + 1;
            doctor.appointment.push({ patientName, bookedSlot: { date, startTime, endTime }, status: 'booked', mode: 'offline' });
            patient.appointments.push({ doctorName, bookedSlot: { date, startTime, endTime }, status: 'booked', mode: 'offline' });

          }

          await doctor.save();

          await patient.save();


          //upate the patient details in the patient collection

       

         



          res.status(200).json({ success: true });


      } catch (error) {

        console.error('Error booking slot:', error);

        res.status(500).json({ success: false, error: 'Failed to book slot' });

      }

      

    }
      
      );

      // Endpoint to fetch booked slots for a specific doctor from MongoDB

      app.get('/booked-slots/:doctorName', async (req, res) => {

        try {
            
            const { doctorName } = req.params;
  
            // Find the doctor document with the doctor name
  
            const doctor = await Doctor.findOne
            ({ name: doctorName });

            if (!doctor) {
              return res.status(404).json({ success: false, error: 'Doctor not found' });
            }

            res.status(200).json(doctor.appointment);

        } catch (error) {
            
              console.error('Error fetching booked slots:', error);
  
              res.status(500).json({ error: 'Failed to fetch booked slots' });
  
          }

      }
        
        );


        // Endpoint to fetch booked slots for a specific patient from MongoDB

        app.get('/booked-slots-patient/:patientName', async (req, res) => {

          try {
              
              const { patientName } = req.params;
    
              // Find the patient document with the patient name
    
              const patient = await Patient.findOne
              ({ name: patientName });

              if (!patient) {
                return res.status(404).json({ success: false, error: 'Patient not found' });
              }

              res.status(200).json(patient.appointments);

          } catch (error) {
              
                console.error('Error fetching booked slots:', error);
    
                res.status(500).json({ error: 'Failed to fetch booked slots' });
    
            }

        }
            
            );





        // Endpoint to cancel a booked slot for a specific doctor from MongoDB

        app.post('/cancel-slot', async (req, res) => {

          try {

            const { doctorName, date, startTime, endTime, patientName } = req.body;


            // Find the doctor document with the doctor name

            const doctor = await Doctor.findOne
            ({ name: doctorName });

            if (!doctor) {
              return res.status(404).json({ success: false, error: 'Doctor not found' });
            }

            // Find the date with the specified date

            const existingDate = doctor.availability.find(slot => slot.date.toString() === new Date(date).toString());

            if (!existingDate) {
              return res.status(404).json({ success: false, error: 'Date not found' });
            }


            // Find the time slot with the specified start and end times

            const existingSlot = existingDate.timeSlots.find(slot => slot.startTime === startTime && slot.endTime === endTime);

            if (!existingSlot) {
              return res.status(404).json({ success: false, error: 'Slot not found' });
            }

            // Check if the slot is already booked

            if (existingSlot.availability) {
              return res.status(400).json({ success: false, error: 'Slot is not booked' });
            }

            // Update the slot to mark it as available

            existingSlot.availability = true;

            // Find the patient document with the patient name

            const patient = await Patient
            .findOne({ name: patientName });

            if (!patient) {
              return res.status(404).json({ success: false, error: 'Patient not found' });
            }

            // Remove the appointment from the doctor's document

            doctor.appointment = doctor.appointment.filter(appointment => appointment.patientName !== patientName);

            // Remove the appointment from the patient's document

            patient.appointments = patient.appointments.filter(appointment => appointment.doctorName !== doctorName);

            await doctor.save();


            await patient.save();

            res.status(200).json({ success: true });

          } catch (error) {

            console.error('Error canceling slot:', error);

            res.status(500).json({ success: false, error: 'Failed to cancel slot' });

          }

        }



        );


        //end point to save clinic details in MongoDB

   

        app.post('/save-clinic/:id', async (req, res) => {
          try {
            const { name, location } = req.body;
            const { id } = req.params;
            let totalAppointments = 0;
            let totalOnlineAppointments = 0;
            let totalOfflineAppointments = 0;

        
            // Create a new Clinic document
            const clinic = new Clinic({
              name,
              location,
              id,
              totalAppointments,
              totalOnlineAppointments,
              totalOfflineAppointments,

            });
        
            await clinic.save();
        
            res.status(200).json({ success: true });
          } catch (error) {
            console.error('Error saving clinic details:', error);
            res.status(500).json({ success: false, error: 'Failed to save clinic details' });
          }
        }
        );


        // Endpoint to fetch the clinic details from MongoDB

        app.get('/clinics/:uid', async (req, res) => {
          try {
            uid = req.params.uid;
            const clinic = await Clinic.findOne({id: uid });

            if (!clinic) {
              return res.status(404).json({ success: false, error: 'Clinic not found' });
            }

            res.status(200).json(clinic);
          
          } catch (error) {
            console.error('Error fetching clinics:', error);
            res.status(500).json({ error: 'Failed to fetch clinics' });
          }
        }


        );


        //end point to fetch doctors for a specific clinic from MongoDB

        app.get('/doctors/:clinicId', async (req, res) => {

          try {

            const { clinicId } = req.params;

            // Find the doctor document with the clinic ID

            const doctors = await Doctor.find({ clinicId });

            if (!doctors) {
              return res.status(404).json({ success: false, error: 'Doctors not found' });
            }

            res.status(200).json(doctors);

          } catch (error) {
              
              console.error('Error fetching doctors:', error);
  
              res.status(500).json({ error: 'Failed to fetch doctors' });
  
            }



        }

      );


        

















  
  
  
  // Start the server
  app.listen(port, () => {
    
    console.log('Server is running on port 3000');
    console.log('process.env.RAPIDAPI_KEY', api);
  });



