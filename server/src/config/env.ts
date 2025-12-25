import dotenv from "dotenv";

dotenv.config();

const get = (key: string, fallback?: string) => {
	const value = process.env[key];
	if (value === undefined) {
		if (fallback !== undefined) return fallback;
		throw new Error(`Missing env: ${key}`);
	}

	return value;
};

export const env = {
	port: Number(get("PORT", "3000")),
};
