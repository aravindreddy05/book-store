const db = require('../databaseconnection');

const userController = {
  // Existing methods...

  loginUser: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required.');
    }

    // Query the database to find the user by email
    db.query('SELECT * FROM `USER` WHERE Email = ?', [email], (err, results) => {
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
  },
   
/*registerUser: (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Name, email, and password are required.');
  }

  // Check if the user already exists
  db.query('SELECT * FROM `USER` WHERE Email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error checking for existing user:', err.message);
      return res.status(500).send('Error during registration.');
    }

    if (results.length > 0) {
      return res.status(400).send('Email is already registered.');
    }

   

        // Insert the new user into the database
        const query = 'INSERT INTO `USER` (Name, Email, Password) VALUES (?, ?, ?)';
        db.query(query, [name, email, hashedPassword], (err, results) => {
          if (err) {
            console.error('Error inserting user into database:', err.message);
            return res.status(500).send('Error during registration.');
          }

          res.status(201).json({ message: 'User registered successfully!' });
        });
      });
    }
  };*/
};

module.exports = userController;
