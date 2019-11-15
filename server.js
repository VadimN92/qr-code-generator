const express = require("express");
const QRCode = require("qrcode");
const util = require("util");
const app = express();
const PORT = 3000;

const getDataURL = util.promisify(QRCode.toDataURL); // toDataURL use callback but for my case useful will be promise so util.promisify make promise from callback

app.get("/api/qrcode", async (request, response) => {
	const text = decodeURIComponent(request.query.text);

	const dataURL = await getDataURL(text); // data:image/png;base64,<data>
	const base64 = dataURL.slice(22); // remove metadate
	response.writeHead(200, {"Content-Type": "image/png",});
	response.end(Buffer.from(base64, "base64")); // create array of bits and send it
});

app.listen(PORT, () => {
	console.log("Server run on ", PORT)
});
