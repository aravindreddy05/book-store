const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const adminRoutes=require('./routes/adminRoutes');
// const purchaseRoutes=require('./routes/purchaseRoutes')
const purchaseRoutes=require('./routes/purchaseRoutes')
const getBookDetails=require('./routes/bookDetails')

const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API! You can access /api/login for login functionality and /api/getBooks for book data.');
});


app.use('/api', userRoutes);
app.use('/admin',adminRoutes);
app.use('/purchase',purchaseRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
