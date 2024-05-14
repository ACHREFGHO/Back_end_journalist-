const fs = require('fs');
const path = require('path');

/*
 function addEvent(title, photos) {
    const eventsFolder = './events';
    const currentDate = new Date();
    const eventInfo = {
        id: 0,
        title: title,
        photos: [], // Initialize an empty array to store the photo filenames
        date: currentDate.toISOString() // Current date and time in ISO format
    };

    // Check if the events folder exists, if not create it
    if (!fs.existsSync(eventsFolder)) {
        fs.mkdirSync(eventsFolder);
    }

    // Get the list of existing events
    const eventFolders = fs.readdirSync(eventsFolder);
    if (eventFolders.length > 0) {
        // Find the maximum ID among existing events
        const maxId = eventFolders.map(folder => parseInt(folder)).reduce((max, current) => Math.max(max, current));
        eventInfo.id = maxId + 1;
    }

    // Create a new folder for the event
    const eventFolder = path.join(eventsFolder, eventInfo.id.toString());
    fs.mkdirSync(eventFolder);

    // Save the event information in a JSON file
    const eventFilePath = path.join(eventFolder, 'info.json');
    eventInfo.photos = photos.map(photo => {
        const photoFileName = path.basename(photo); // Extract the filename from the full path
        const photoFilePath = path.join(eventFolder, photoFileName);
        fs.copyFileSync(photo, photoFilePath);
        return photoFileName; // Store the filename of the copied photo
    });
    fs.writeFileSync(eventFilePath, JSON.stringify(eventInfo, null, 4));

    console.log(`Event "${title}" with ID ${eventInfo.id} added successfully on ${eventInfo.date}.`);
}

*/


// Update addEvent function
// Update addEvent function
/*
function addEvent(title, photos) {
    try {
      const eventsFolder = './events';
      const currentDate = new Date();
      const eventInfo = {
        id: 0,
        title: title,
        photos: [], // Initialize an empty array to store the photo filenames
        date: currentDate.toISOString() // Current date and time in ISO format
      };
  
      // Check if the events folder exists, if not create it
      if (!fs.existsSync(eventsFolder)) {
        fs.mkdirSync(eventsFolder);
      }
  
      // Get the list of existing events
      const eventFolders = fs.readdirSync(eventsFolder);
      if (eventFolders.length > 0) {
        // Find the maximum ID among existing events
        const maxId = eventFolders.map(folder => parseInt(folder)).reduce((max, current) => Math.max(max, current));
        eventInfo.id = maxId + 1;
      }
      // Create a new folder for the event
      const eventFolder = path.join(eventsFolder, eventInfo.id.toString());
      fs.mkdirSync(eventFolder);
  
      // Save the event information in a JSON file
      const eventFilePath = path.join(eventFolder, 'info.json');
      eventInfo.photos = photos.map(photo => {
        const photoFileName = path.basename(photo); // Extract the filename from the full path
        const photoFilePath = path.join(eventFolder, photoFileName);
        fs.copyFileSync(photo, photoFilePath);
        return photoFileName; // Store the filename of the copied photo
        
      });
      fs.writeFileSync(eventFilePath, JSON.stringify(eventInfo, null, 4));
  
      console.log(`Event "${title}" with ID ${eventInfo.id} added successfully on ${eventInfo.date}.`);
    } catch (error) {
      console.error('Error adding event:', error);
      throw error; // Re-throw the error for handling in the route handler
    }
  }

  */
  
  function addEvent(title, photos) {
    try {
      const eventsFolder = './events';
      const currentDate = new Date();
      const eventInfo = {
        id: 0,
        title: title,
        photos: [], // Initialize an empty array to store the photo filenames
        date: currentDate.toISOString() // Current date and time in ISO format
      };
  
      // Check if the events folder exists, if not create it
      if (!fs.existsSync(eventsFolder)) {
        fs.mkdirSync(eventsFolder);
      }
  
      // Get the list of existing events
      const eventFolders = fs.readdirSync(eventsFolder);
      if (eventFolders.length > 0) {
        // Find the maximum ID among existing events
        const maxId = eventFolders.map(folder => parseInt(folder)).reduce((max, current) => Math.max(max, current));
        eventInfo.id = maxId + 1;
      }
      // Create a new folder for the event
      const eventFolder = path.join(eventsFolder, eventInfo.id.toString());
      fs.mkdirSync(eventFolder);
  
      // Save the event information in a JSON file
      const eventFilePath = path.join(eventFolder, 'info.json');
      eventInfo.photos = photos.map(photo => {
        const photoFileName = path.basename(photo.originalname); // Use original filename
        const photoFilePath = path.join(eventFolder, photoFileName);
        fs.copyFileSync(photo.path, photoFilePath);
        return photoFileName; // Store the filename of the copied photo
      });
      fs.writeFileSync(eventFilePath, JSON.stringify(eventInfo, null, 2)); // Using 2 spaces for indentation
  
      console.log(`Event "${title}" with ID ${eventInfo.id} added successfully on ${eventInfo.date}.`);
    } catch (error) {
      console.error('Error adding event:', error);
      throw error; // Re-throw the error for handling in the route handler
    }
  }
  




  
  function getAllEvents() {
    const eventsFolder = './events';

    // Check if the events folder exists
    if (!fs.existsSync(eventsFolder)) {
        console.log('Events folder does not exist.');
        return [];
    }

    // Get the list of event folders and sort them numerically
    const eventFolders = fs.readdirSync(eventsFolder).map(Number).sort((a, b) => a - b);

    // Array to store all events
    const allEvents = [];

    eventFolders.forEach(eventId => {
      const eventFolder = path.join(eventsFolder, eventId.toString());
      const eventInfoPath = path.join(eventFolder, 'info.json');
  
      // Check if the info.json file exists
      if (fs.existsSync(eventInfoPath)) {
          // Read the event information from the JSON file
          const eventInfo = JSON.parse(fs.readFileSync(eventInfoPath, 'utf8'));
  
          // Get list of image files in the event folder
          const imageFiles = fs.readdirSync(eventFolder).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
  
          // Construct array of image URLs
          const imageUrls = imageFiles.map(file => path.join('.', 'events', eventId.toString(), file).replace(/\\/g, '/'));

  
          // Add the event to the array of all events along with images
          allEvents.push({
              eventInfo: eventInfo,
              images: imageUrls
          });
      }
  });

    return allEvents;
}





function getEventById(eventId) {
    const eventsFolder = './events';
    const eventFolder = path.join(eventsFolder, eventId.toString());
    const eventInfoPath = path.join(eventFolder, 'info.json');

    // Check if the info.json file exists
    if (fs.existsSync(eventInfoPath)) {
        // Read the event information from the JSON file
        const eventInfo = JSON.parse(fs.readFileSync(eventInfoPath, 'utf8'));

        // Get list of image files in the event folder
        const imageFiles = fs.readdirSync(eventFolder).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        

        return {
            eventInfo: eventInfo,
        };
    } else {
        console.log(`Event with ID ${eventId} not found.`);
        return null;
    }
}
function deleteEvent(eventId) {
  try {
      const eventsFolder = './events';
      const eventFolder = path.join(eventsFolder, eventId.toString());

      // Check if the event folder exists
      if (!fs.existsSync(eventFolder)) {
          throw new Error('Event not found.');
      }

      // Delete the event folder recursively
      fs.rmSync(eventFolder, { recursive: true });

      console.log(`Event with ID ${eventId} deleted successfully.`);
      return true;
  } catch (error) {
      console.error('Error deleting event:', error);
      throw error; // Re-throw the error for handling in the route handler
  }
}



module.exports = {
    addEvent: addEvent,
    getAllEvents: getAllEvents,
    getEventById: getEventById,
    deleteEvent: deleteEvent
};
