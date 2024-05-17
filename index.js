import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));


//..........combine file in public...
const __dirname = dirname(fileURLToPath(import.meta.url));
// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, "public")));
// Define a route to serve the registration.html file
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "registration.html"));
});


//............connect database.............
const DB = process.env.DATABASE;
  console.log(DB)



mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });

//............create database schema.............  
const studentSchema = new mongoose.Schema({
  username: String,
  email: String,
  rollNumber: Number,
});
const Student = mongoose.model("Student", studentSchema);


// Route to fetch student data
app.post("/post", async (req, res) => {
  const { username, email, rollNumber } = req.body; // Extract data from request body
  const student = new Student({
    username,
    email,
    rollNumber,
  });
  await student.save();
  //console.log(student);
  res.send("success");
});




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is active at PORT " + PORT);
});




















//password:4l0gm6ploTYAyoQB
//username:kkgupta0106
// connectring string:mongodb+srv://kkgupta0106:4l0gm6ploTYAyoQB@cluster0.jucjasx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// app.use(express.static(__dirname));

// //routing
// app.get('/', (req, res) => {
//     const pathCode = path.join(__dirname, 'registration.html');
//     res.sendFile(pathCode);
// })

// Serve static files from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the registration.html file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'registration.html'));
// });

// const saveData = new Student({
//   name: "shuhani gupta",
//   rollNumber: 12345,
//   address: "reoti",
// });

// saveData
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("ERROR :", err);
//   });
