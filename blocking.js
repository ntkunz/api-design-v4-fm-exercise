// blocking
const me = "scott";
//js won't go to next line until this is done

//making things async prevent blocking

//if doing anything intensive on the cpu, use async

// below is non-blocking because of async
const fs = require("fs/promises");
const path = require("path");
const read = async () => {
	const result = fs.readFile(path.join(__dirname, "package.json"), "utf8");
	return result;
};
read().then((f) => console.log(f));
console.log("not blocked");

//another option is a child process
//child process is a separate process that runs in the background
//same as web workin in the browser
//limited number of child processes available
