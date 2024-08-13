const path  = require('path');
const fs = require('fs')
const fsDelete = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
// const mime = require('mime-types');
const { UploadedFile } = require('express-fileupload');

const getPageAndOffset = (pageIndex, pageSize) => {
  const page = parseInt(pageIndex);
  const limit = parseInt(pageSize);
  const offset = (page - 1) * limit;
  return [limit, offset];
};



const FileUpload = async (params) => {
  return new Promise((resolve, reject) => {
    const file = params.filePath;

    if (!file || !file.name || !file.mv || typeof file.mv !== 'function') {
      reject(new Error('Invalid file provided'));
      return;
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = uuidv4() + `.${fileExtension}`;
    const uploadPath = path.join(process.cwd(), 'uploads', params.folderName, fileName);
    const uploadsDir = path.join(process.cwd(), 'uploads', params.folderName);

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    file.mv(uploadPath, async function (errFile) {
      if (errFile) {
        console.error('Error uploading file:', errFile);
        reject(new Error('Error uploading file'));
      } else {
        console.log('File uploaded successfully:', file.name);
        const relativePath = path.join('uploads', params.folderName, fileName);
        resolve(relativePath);
      }
    });
  });
};





const FileDelete = async (filePath)=> {
  try {
    const serverFilePath = path.join(process.cwd(), 'uploads', filePath);
    await fsDelete.unlink(serverFilePath);
    console.log(`File deleted successfully: ${serverFilePath}`);
  } catch (error) {
    console.error(`Error deleting file (${filePath}): ${error.message}`);
  }
};

  module.exports = { getPageAndOffset,FileUpload,FileDelete };
