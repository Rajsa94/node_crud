const PDF = require('../models/PDF');
const { NotFoundError } = require('../utils/helper');
const { FileUpload, FileDelete } = require("../utils/upload");
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

class PdfService {
  
  /** Create a new dashboard entry */
  static async create(req) {
    try {
      if (!req.files || !req.files.file) {
        throw new Error('No file uploaded');
      }

      const file = req.files.file;
      const filePath = await FileUpload({
        filePath: file,
        folderName: "PDF",
      });
      console.log(filePath) // Assuming 'file' is the name attribute in your form
      const filePat = path.join(process.cwd(), filePath);
       console.log('Complete file path:', filePat);

      const fileBuffer = fs.readFileSync(path.join(process.cwd(), filePath));
      const pdfData = await pdfParse(fileBuffer);
      console.log(pdfData)

      const newPDF = new PDF({
        name: file.name,
        fileSize: file.size,
        path: filePath,
        data: pdfData.text
      });

      await newPDF.save();

      return { message: 'File uploaded and data saved successfully!', pdfData };
    } catch (error) {
      throw new Error(`Error processing PDF upload: ${error.message}`);
    }
  }

 
}

module.exports = PdfService;
