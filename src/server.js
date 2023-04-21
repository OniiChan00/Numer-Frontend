const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors());
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const port = process.env.PORT || 5000;


//root of equation
const BisectionAPI = require("./api/BisectionAPI");
const FalsePositionAPI = require("./api/FalsePositionAPI");
const OnePointAPI = require("./api/OnePointAPI");
const NewtonRaphsonAPI = require("./api/NewtonRaphsonAPI");
const SecantAPI = require("./api/SecantAPI");

app.use("/", BisectionAPI);
app.use("/", FalsePositionAPI);
app.use("/", OnePointAPI);
app.use("/", NewtonRaphsonAPI);
app.use("/", SecantAPI);


//linear equation
const CramerAPI = require("./api/CramerAPI");
const Ludecompose = require("./api/LUDecomposeAPI");
const JacobiAPI = require("./api/JacobiAPI");

app.use("/", Ludecompose);
app.use("/", CramerAPI);
app.use("/", JacobiAPI);



const swaggerOptions = {
    swaggerDefinition: {
        
      info: {
        title: "Library API",
        version: '1.0.0',
      },
      host: ["localhost:5000"],
    },


    apis: 
    ["src/api/*.js"],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));




app.listen(port, () => console.log("Backend server live on " + port));

module.exports = app;
