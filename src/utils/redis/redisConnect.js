const redis = require("redis");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient({
  url: redisUrl,
});

(async () => {
  await client.connect();
})();

client.on("connect", function () {
  console.log("redis connected");
});

module.exports = client;