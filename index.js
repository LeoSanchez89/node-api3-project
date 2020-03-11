// code away!
const server = require("./server.js");

const PORT = 4001
server.listen(PORT, () => {
	console.log(`\n* Server Running on http://localhost:${PORT} *\n`);
});
