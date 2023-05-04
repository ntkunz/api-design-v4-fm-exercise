import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
// const app = require('./server') //non typescript version
import app from "./server"; //typescript version

app.listen(config.port, () => {
	//log to console
	console.log(`hello on http://localhost:${config.port}`);
});
