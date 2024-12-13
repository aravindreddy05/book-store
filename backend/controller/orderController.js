const db=require('../databaseconnection')
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
                Order_Detail od
                ON o.Order_ID = od.Order_ID
            WHERE 
                o.User_ID = ?
            ORDER BY 
                o.Order_ID;
        `;
        
        const [rows] = await db.query(query, [userId]); 
        
        if (rows.length > 0) {
            res.status(200).json(rows);  
        } else {
            res.status(404).json({ message: 'No orders found for this user' });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error });
    }
};
