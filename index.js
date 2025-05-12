import express from "express";
import mongoose from "mongoose";
//mongodb+srv://hfaidhbacem2017:<db_password>@cluster0.87wzldm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const PORT = 3000;
import productRoutes from './routes/productRoutes.js'

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://hfaidhbacem2017:4AQlFIsENHIgaFQz@cluster0.87wzldm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('data base is connected'))
.catch(err => console.log('error to connect ',err))

app.get("/hello", (req, res) => {
  res.send("hello gomycode");
});

app.get("/", (req, res) => {
  res.send("hello gomycode +++++");
});

app.use('/api/products',productRoutes)

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`server running successfuly on port ${PORT}`);
  } else {
    console.log("faield to run server");
  }
});
