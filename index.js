const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3001;
require('./db/db');
const dashboardRoutes = require("./routes/dashbord")
const PdfRoutes = require("./routes/pdf")
const { HttpCode } = require('./utils/types');
const fileUpload = require("express-fileupload");



app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

app.use('/dashboard',dashboardRoutes);
app.use('/pdf-upload',PdfRoutes);

const errorHandler = (error, req, res, next) => {
    res.status(error?.errorcode || HttpCode.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: error?.original?.sqlMessage || error.message,
    });
  };
  
  app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})