const conn = require('../../../config/database')

const dashboardModel = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 
                    (SELECT COUNT(*) FROM adminlogin) AS totalAdmins,
                    (SELECT COUNT(*) FROM customerlogin) AS totalCustomers`;
        conn.query(sql, (err, results) => {
        if (err) {
            reject(err);
        } else {
            resolve(results[0]);
        }
        });
    });
}
module.exports = dashboardModel;