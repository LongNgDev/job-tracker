import multer from "multer";
import path from "path";
import fs from "fs";

import crypto from "crypto";
import type { RequestHandler } from "express";

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, uploadDir),
	filename: (_req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase();
		const base = path
			.basename(file.originalname, ext)
			.replace(/[^a-zA-Z0-9-_]/g, "_")
			.slice(0, 80);

		const unique = crypto.randomBytes(8).toString("hex");
		cb(null, `${base}_${unique}${ext}`);
	},
});

const MAX_MB = 5;

export const uploadSingle: RequestHandler = multer({
	storage,
	limits: { fileSize: MAX_MB * 1024 * 1024 },
	fileFilter: (_req, file, cb) => {
		const allowed = new Set([
			"application/pdf",
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"image/png",
			"image/jpeg",
			"image/webp",
		]);
		if (!allowed.has(file.mimetype))
			return cb(new Error("Unsupported file type"));
		cb(null, true);
	},
}).single("file"); // 👈 frontend must send field name "file"
