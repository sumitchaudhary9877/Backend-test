// index.js
const fastify = require('fastify')();
const db = require('./database');

fastify.get('/api/usercount', async (request, reply) => {
    try {
      const totalUsers = await getUserCount();
      reply.send({ totalUsers });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Internal server error' });
    }
  });
  
  async function getUserCount() {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS totalUsers FROM user_list', (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(results[0].totalUsers);
        }
      });
    });
  }
  
fastify.listen(6776, (err) => {
  if (err) throw err;
  console.log('Server listening on port 6776');
});
