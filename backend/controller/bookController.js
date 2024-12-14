const db = require('../databaseconnection'); // Assuming you have a database connection file

const bookController = {
  getAllBooks: (req, res) => {
    db.query('SELECT * FROM BOOK', (err, results) => {
      if (err) {
        console.error('Error fetching books:', err.message);
        return res.status(500).send('Error fetching books.');
      }
      res.json(results);
    });
  },

getBookDetail: (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM BOOK WHERE Book_ID = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching book:', err.message);
      return res.status(500).send('Error fetching book.');
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(results[0]);  // Send back the first (and only) book object
  });
}
};

module.exports = bookController;
