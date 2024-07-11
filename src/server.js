import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from './route/web';
// import connection from "./configs/connectDB";

const app = express();
require(`dotenv`).config();
const port = process.env.PORT || 8080;
//console.log('>>> check port: ', port);

// gui thong tin cua client len server hay goi la cau hinh
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view Engine
configViewEngine(app);

//init Web Route
initWebRoute(app);




app.listen(port, () => {    
  console.log(`Example app listening on http://localhost: ${port}`)
});