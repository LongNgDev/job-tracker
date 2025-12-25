import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
