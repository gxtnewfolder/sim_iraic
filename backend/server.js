const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'images')));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
