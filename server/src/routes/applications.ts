import { Router, type Request, type Response } from "express";
import { pool } from "../database/db.js";

const router: Router = Router();

// Health check
router.get("/health", (_req: Request, res: Response) => {
	return res.status(200).json({ status: "OK" });
});

// CRUD

// CREATE
router.post("/", async (req: Request, res: Response) => {
	try {
		const {
			job_ads_id,
			status,
			stage,
			last_follow_up_at,
			next_follow_up_at,
			applied_at,
			notes,
		} = req.body;

		const result = await pool.query(
			"INSERT INTO applications(job_ads_id, status, stage, last_follow_up_at, next_follow_up_at, applied_at, notes) VALUES ($1,$2,$3,$4,$5,$6,$7)",
			[
				job_ads_id,
				status,
				stage,
				last_follow_up_at,
				next_follow_up_at,
				applied_at,
				notes,
			]
		);

		return res.status(200).json(result.rows[0]);
	} catch (e: any) {
		return res.status(500).json(e.message);
	}
});

// RETRIEVE
// Retrieve all
router.get("/", async (_req: Request, res: Response) => {
	try {
		const result = await pool.query(
			"SELECT * FROM application ORDER BY updated_at DESC"
		);

		if (result.rowCount === 0) return res.status(404).json("Not Found");

		return res.status(200).json(result.rows);
	} catch (e: any) {
		return res.status(500).json(e.message);
	}
});

// Retrieve by id
router.get("/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await pool.query(
			"SELECT * FROM application WHERE id = $1 ORDER BY updated_at DESC",
			[id]
		);

		if (result.rowCount === 0) return res.status(404).json("Not Found");

		return res.status(200).json(result.rows);
	} catch (e: any) {
		return res.status(500).json(e.message);
	}
});

// UPDATE
router.patch("/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const allowedList = new Set([
			"status",
			"stage",
			"last_follow_up_at",
			"next_follow_up_at",
			"applied_at",
			"notes",
		]);

		const entries = Object.entries(req.body).filter(
			([key, value]) => allowedList.has(key) && value != undefined
		);

		if (entries.length === 0)
			return res.status(400).json({ error: "No valid fields to update" });

		const sets: string[] = [];
		const params: any[] = [];

		for (const [key, value] of entries) {
			params.push(value);
			sets.push(`${key} = $${params.length}`);
		}

		sets.push("updated_at = NOW()");

		params.push(id);

		const sql = `UPDATED application SET ${sets.join(", ")} WHERE id = $${
			params.length
		} RETURNING *`;

		const result = await pool.query(sql, params);

		if (result.rowCount === 0)
			return res.status(404).json({ error: "Not found" });

		return res.json(result.rows[0]);
	} catch (e: any) {
		return res.status(500).json(e.message);
	}
});

export default router;
