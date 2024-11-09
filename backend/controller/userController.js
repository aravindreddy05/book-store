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
  }
};

module.exports = userController;
