const db = require('../databaseconnection');  // Use your regular mysql2 connection

exports.getOrderDetails = async (req, res) => {
    const userId = req.params.userId;

    try {
        const query = `
            SELECT 
                o.Order_ID,
                o.User_ID,
                o.Order_Date,
                od.Order_Detail_ID,
                od.Book_ID,
                od.Quantity,
                od.Price,
                (od.Quantity * od.Price) AS Total_Item_Price,
                o.Total_Amount
            FROM 
                \`Order\` o
            JOIN 
                ORDER_DETAIL od
                ON o.Order_ID = od.Order_ID
            WHERE 
                o.User_ID = ?
            ORDER BY 
                o.Order_ID;
        `;

        // Manually wrap the db.query() callback in a Promise
        const rows = await new Promise((resolve, reject) => {
            db.query(query, [userId], (err, results) => {
                if (err) {
                    reject(err);  // Reject the promise if there's an error
                } else {
                    resolve(results);  // Resolve the promise with the results
                }
            });
        });

        // Check if there are results
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'No orders found for this user' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error });
    }
};
