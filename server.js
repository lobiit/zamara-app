const corsAnywhere = require('cors-anywhere');

const host = '0.0.0.0';
const port = 8082; // Change the port number here

corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
}).listen(port, host, () => {
    console.log(`Running CORS Anywhere on ${host}:${port}`);
});
