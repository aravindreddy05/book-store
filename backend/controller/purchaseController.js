const db = require('../databaseconnection'); 


const createPurchase = async (req, res) => {
    const { userId, totalAmount, orderDate, items } = req.body; 


    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const orderQuery = `
            INSERT INTO \`Order\` (User_ID, Total_Amount, Order_Date) 
            VALUES (?, ?, ?);
        `;
        const [orderResult] = await connection.execute(orderQuery, [userId, totalAmount, orderDate]);


        const orderId = orderResult.insertId;

        const orderDetailQueries = items.map(item => {
            const { bookId, quantity, price } = item;
            return `
                INSERT INTO \`Order_Detail\` (Order_ID, Book_ID, Quantity, Price) 
                VALUES (${orderId}, ${bookId}, ${quantity}, ${price});
            `;
        });


        for (let query of orderDetailQueries) {
            await connection.execute(query);
        }


        await connection.commit();


        res.status(201).json({ message: 'Purchase successful', orderId });
    } catch (error) {

        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    } finally {
        connection.release();
    }
};

module.exports = {
    createPurchase
};
