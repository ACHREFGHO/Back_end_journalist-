const fs = require('fs');
const path = require('path');
const multer = require('multer');


const upload = multer({ dest: './articles/' });

function addArticle(title, photo, description, types) {
    const articlesFolder = './articles';
    const currentDate = new Date();
    const photoFileName = photo.originalname; // Use photo.originalname to get the filename

    const articleInfo = {
        id: 0,
        title: title,
        photo: photoFileName, // Save only the photo filename
        description: description,
        types: types, // Include an array of types in the article information
        date: currentDate.toISOString() // Current date and time in ISO format
    };

    // Check if the articles folder exists, if not create it
    if (!fs.existsSync(articlesFolder)) {
        fs.mkdirSync(articlesFolder);
    }

    // Get the list of existing articles
    const articleFiles = fs.readdirSync(articlesFolder);
    if (articleFiles.length > 0) {
        // Find the maximum ID among existing articles
        const maxId = articleFiles.map(file => parseInt(path.parse(file).name)).reduce((max, current) => Math.max(max, current));
        articleInfo.id = maxId + 1;
    }

    const articleFolder = path.join(articlesFolder, `${articleInfo.id}`);
    fs.mkdirSync(articleFolder);
    
    // Move the uploaded photo to the article folder
    const photoFilePath = path.join(articleFolder, photoFileName);
    fs.renameSync(photo.path, photoFilePath);
    
    // Save the article information in a JSON file inside the article folder
    const articleFilePath = path.join(articleFolder, 'info.json');
    fs.writeFileSync(articleFilePath, JSON.stringify(articleInfo, null, 4));

    console.log(`Article "${title}" with ID ${articleInfo.id} added successfully on ${articleInfo.date}.`);
}







function getAllArticles() {
    const articlesFolder = './articles';

    // Check if the articles folder exists
    if (!fs.existsSync(articlesFolder)) {
        console.log('Articles folder does not exist.');
        return [];
    }

    // Get the list of article folders
    const articleFolders = fs.readdirSync(articlesFolder);

    // Initialize an array to store article details
    const articles = [];

    // Loop through each article folder and add its details to the articles array
    articleFolders.forEach(articleId => {
        const articleFolder = path.join(articlesFolder, articleId);
        const articleInfoPath = path.join(articleFolder, 'info.json');

        // Check if the info.json file exists
        if (fs.existsSync(articleInfoPath)) {
            // Read the article information from the JSON file
            const articleInfo = JSON.parse(fs.readFileSync(articleInfoPath, 'utf8'));

            

            // Add the article details to the articles array
            articles.push({
                articleInfo: articleInfo,
        
            });
        }
    });

    return articles;
}

function getArticleById(articleId) {
    const articlesFolder = './articles';
    const articleFolder = path.join(articlesFolder, articleId.toString());
    const articleInfoPath = path.join(articleFolder, 'info.json');

    // Check if the info.json file exists
    if (fs.existsSync(articleInfoPath)) {
        // Read the article information from the JSON file
        const articleInfo = JSON.parse(fs.readFileSync(articleInfoPath, 'utf8'));

        // Get the photo file name from the article info
        const photoFileName = articleInfo.photo;

        // Return just the filename (without the path)
        return {
            articleInfo: articleInfo,
        };
    } else {
        console.log(`Article with ID ${articleId} not found.`);
        return null;
    }
}

function deleteArticle(articleId) {
    try {
        const articlesFolder = './articles';
        const articleFolder = path.join(articlesFolder, articleId.toString());

        // Check if the article folder exists
        if (!fs.existsSync(articleFolder)) {
            throw new Error('Article not found.');
        }

        // Delete the article folder recursively
        fs.rmSync(articleFolder, { recursive: true });

        console.log(`Article with ID ${articleId} deleted successfully.`);
        return true;
    } catch (error) {
        console.error('Error deleting article:', error);
        throw error; // Re-throw the error for handling in the route handler
    }
}



module.exports = {
   addArticle: addArticle,
   getAllArticles: getAllArticles,
   getArticleById : getArticleById,
   deleteArticle : deleteArticle 
};