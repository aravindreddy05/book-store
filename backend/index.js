const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import your user routes
// const bookRoutes = require('./routes/userRoutes'); // Import book routes if available (assuming you have this)

const app = express();
const port = 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the API! You can access /api/login for login functionality and /api/getBooks for book data.');
});

// Use user routes and other routes with the '/api' prefix
app.use('/api', userRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
