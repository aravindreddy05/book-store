const db = require('../databaseconnection'); 

// Controller function to get all book details
const getBookDetails = async (req, res) => {
  try {
    // Execute the SQL query to fetch all books from the BOOK table
    const [rows] = await db.execute('SELECT * FROM BOOK b');

    // If there are no rows (books), send a 404 response
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }

    // Send the result back as JSON
    res.status(200).json({ books: rows });
  } catch (error) {
    // If there is an error with the database query
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getBookDetails,  // Export the controller function
};
