const db = require('../databaseconnection'); // Assuming you have a database connection file


// Insert a new book
exports.createBook = async (req, res) => {
    const { Title, Author, Category, Quantity, Price, Description,Image_Url } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Books (Title, Author, Category, Quantity, Price, Description,image_url) VALUES (?, ?, ?, ?, ?, ?,?)',
            [Title, Author, Category, Quantity, Price, Description]
        );
        res.status(201).json({ message: 'Book created successfully', bookId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
};

// Read all books
exports.getAllBooks = async (req, res) => {
    try {
        const [books] = await db.query('SELECT * FROM Books');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { Title, Author, Category, Quantity, Price, Description } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE Books SET Title = ?, Author = ?, Category = ?, Quantity = ?, Price = ?, Description = ? WHERE Book_ID = ?',
            [Title, Author, Category, Quantity, Price, Description, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Books WHERE Book_ID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};
/*
const adminController = {
    // Existing methods...
  
    loginAdmin: (req, res) => {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).send('Email and password are required.');
      }
  
      // Query the database to find the user by email
      db.query('SELECT * FROM `admin` WHERE Email = ?', [email], (err, results) => {
        if (err) {
          console.error('Error fetching user:', err.message);
          return res.status(500).send('Error during login.');
        }
  
        if (results.length === 0) {
          return res.status(401).send('Invalid email or password.');
        }
  
        const user = results[0];
  
        // Compare the provided password with the stored password (plain text comparison)
        if (password === user.Password) {
          res.status(200).json({
            message: 'Login successful!',
            user: { id: user.User_ID, name: user.Name, email: user.Email }
          });
        } else {
          res.status(401).send('Invalid email or password.');
        }
      });
    }
}
    module.exports = {adminController};
    */