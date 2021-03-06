const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const cors = require('cors');
require('express-async-errors');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const processors = require('./routes/processorRoutes');
const brands = require('./routes/brandRoutes');
const notebooks = require('./routes/notebookRoutes');
const app = express();

mongoose
  .connect("mongodb://mongo:27017/the_notebook", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Could not connect to MongoDB!", err));

app.use(cors());
app.use(express.json());
app.use('/api/processors', processors);
app.use('/api/brands', brands);
app.use('/api/notebooks', notebooks);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8000;
app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});
