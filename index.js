const express = require('express');
const eventManager = require('./eventmanager');
const articlemanager = require('./articlemanager')
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());


const title2 = "New Article";
const photo2 = './photos/Bg.jpg'; // Replace with actual path
const description2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";
const type = ["News","Sport"]


/*// Define event title and photo paths
const title = "Birthday Party";
const photos = [
    './photos/bb.jpg',
    './photos/bg.jpg'
];


const type = ["News","Sport"]

articlemanager.addArticle(title2, photo2, description2,type);

// Call the addEvent function
eventManager.addEvent(title, photos);
eventManager.getAllEvents();
articlemanager.getAllArticles();
*/
/////////////////////////////////////////////////// Event /////////////////////////////////////////////////////////////////////////////////////////
/*
// Route to add a new event
app.post('/Addevent', (req, res) => {
    const { title, photos } = req.body;
    eventManager.addEvent(title, photos);
    res.sendStatus(201); // Respond with 201 Created status
});
*/



// Route to get all events
app.get('/Getevent', (req, res) => {
    // Get all events
    const events = eventManager.getAllEvents();
    
    // Sort the events by date and time
    const sortedEvents = events.sort((a, b) => new Date(b.eventInfo.date) - new Date(a.eventInfo.date));
  
    // Respond with JSON containing sorted events
    res.json(sortedEvents);
  });


  
app.get('/Getevent/:eventId', (req, res) => {
    const eventId = parseInt(req.params.eventId);
    const event = eventManager.getEventById(eventId);
    if (event) {
        res.json(event); // Respond with JSON containing the event
    } else {
        res.status(404).json({ error: `Event with ID ${eventId} not found` });
    }
});


/////////////////////////////////////////////////// Article /////////////////////////////////////////////////////////////////////////////////////////
// Route to add a new article
app.post('/Addartilce', (req, res) => {
    const { title, photo, description, types } = req.body;
    articlemanager.addArticle(title, photo, description, types);
    res.sendStatus(201); // Respond with 201 Created status
});


// Route to get all articles
app.get('/Getarticle', (req, res) => {
    // Get all articles
    const articles = articlemanager.getAllArticles();
  
    // Sort the articles by date and time
    const sortedArticles = articles.sort((a, b) => new Date(b.articleInfo.date) - new Date(a.articleInfo.date));
  
    // Respond with JSON containing sorted articles
    res.json(sortedArticles);
  });
  
app.use('/articles', express.static('articles'));

app.use('/events', express.static('events'));




app.get('/Getarticle/:articleId', (req, res) => {
    const articleId = parseInt(req.params.articleId);
    const event = articlemanager.getArticleById(articleId);
    if (event) {
        res.json(event); // Respond with JSON containing the event
    } else {
        res.status(404).json({ error: `Event with ID ${articleId} not found` });
    }
});


app.post('/upload', multer({ dest: './temp' }).single('photo'), (req, res) => {
  const title = req.body.title;
  const photo = req.file;
  const description = req.body.description;
  const types = req.body.types.split(',');
  articlemanager.addArticle(title, photo, description, types);

  res.send('Article uploaded successfully!');
});


// Update route handler for adding events
/*app.post('/addevent', multer({ dest: './temp' }).array('photos', 20), (req, res) => {
    try {
        const title = req.body.title;
        const photos = req.files.map(file => file.path);

        // Validate required fields
        if (!title || !photos) {
            throw new Error('Required fields are missing.');
        }

        eventManager.addEvent(title, photos);

        res.send('Event added successfully!');
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).send('Error adding event: ' + error.message);
    }
});

*/

app.post('/addevent', multer({ dest: './temp' }).array('photos', 20), (req, res) => {
    try {
      const title = req.body.title;
      const photos = req.files; // Use req.files directly to get the file objects
  
      // Validate required fields
      if (!title || !photos) {
        throw new Error('Required fields are missing.');
      }
  
      eventManager.addEvent(title, photos);
  
      res.send('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      res.status(500).send('Error adding event: ' + error.message);
    }
  });

  app.delete('/delevent/:id', (req, res) => {
    try {
        const eventId = parseInt(req.params.id);

        // Validate event ID
        if (isNaN(eventId)) {
            throw new Error('Invalid event ID.');
        }

        eventManager.deleteEvent(eventId);

        res.send('Event deleted successfully!');
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Error deleting event: ' + error.message);
    }
});



app.delete('/delarticle/:id', (req, res) => {
    try {
        const articleId = parseInt(req.params.id);

        // Validate article ID
        if (isNaN(articleId)) {
            throw new Error('Invalid article ID.');
        }

        articlemanager.deleteArticle(articleId);

        res.send('Article deleted successfully!');
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).send('Error deleting article: ' + error.message);
    }
});




app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://51.75.133.118:${PORT}`);
});


