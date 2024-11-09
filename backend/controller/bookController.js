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
  }
};

module.exports = bookController;
