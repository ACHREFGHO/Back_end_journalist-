const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads'); // Set the destination folder for uploaded files
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname); // Use the original file name
  }
});

const upload = multer({ storage: storage });

module.exports = upload;