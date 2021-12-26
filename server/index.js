const app = require("./routes/routes");
require('dotenv').config();
const port = 3001 || process.env.port;

app.listen(port, () => {
    console.log(`server started on port: ` + port);
})