const db = require('../databaseconnection'); // Assuming you have a database connection file

// Insert a new book
exports.createBook = async (req, res) => {
    const { Title, Author, Category, Quantity, Price, Description, image_url, Big_Desp } = req.body;

    // Basic validation for missing fields
    if (!Title || !Author || !Category || !Quantity || !Price || !Description || !image_url || !Big_Desp) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate Quantity and Price (e.g., they should be positive numbers)
    if (Quantity <= 0 || Price <= 0) {
        return res.status(400).json({ message: 'Quantity and Price must be positive values.' });
    }

    try {
        // Step 1: Get the last inserted Book_ID (max Book_ID)
        const [rows] = await db.promise().query('SELECT MAX(Book_ID) AS lastBookID FROM BOOK');
        const lastBookID = rows[0].lastBookID || 0;  // If no books exist, start from 0

        // Step 2: Insert the new book with the next Book_ID
        const newBookID = lastBookID + 1; // The new Book_ID is the lastBookID + 1

        // Insert the new book into the BOOK table
        const [result] = await db.promise().query(
            'INSERT INTO BOOK (Book_ID, Title, Author, Category, Quantity, Price, Description, image_url, BigDesp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [newBookID, Title, Author, Category, Quantity, Price, Description, image_url, Big_Desp]
        );

        // Optionally, log the Book_ID into the BOOK_HISTORY table
        // await db.promise().query(
        //     'INSERT INTO BOOK_HISTORY (Book_ID, Action) VALUES (?, ?)',
        //     [newBookID, 'Book Created']
        // );

        // Return the success response with the new Book_ID
        res.status(201).json({
            message: 'Book created successfully and logged in history.',
            bookId: newBookID, // Return the new Book_ID
        });
    } catch (error) {
        // Log error for debugging purposes
        console.error('Error creating book:', error);

        // Return a generic error message to the client (without revealing sensitive details)
        res.status(500).json({
            message: 'Error creating book. Please try again later.',
        });
    }
};


// Read all books
exports.getAllBooks = async (req, res) => {
    try {
        const [books] = await db.query('SELECT * FROM Books');
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error); // Log error for debugging
        res.status(500).json({ message: 'Error fetching books', error });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { Title, Author, Category, Quantity, Price, Description, image_url, Big_Desp } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE Books SET Title = ?, Author = ?, Category = ?, Quantity = ?, Price = ?, Description = ?, image_url = ?, Big_Desp = ? WHERE Book_ID = ?',
            [Title, Author, Category, Quantity, Price, Description, image_url, Big_Desp, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Error updating book:', error); // Log error for debugging
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
        console.error('Error deleting book:', error); // Log error for debugging
        res.status(500).json({ message: 'Error deleting book', error });
    }
};
