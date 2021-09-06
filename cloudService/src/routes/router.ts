import express, { Request, Response, Router } from "express";
import { generateUniqueCode, getAllSaves, readSavedFile, saveNewFile } from "../storage";
import { SavedList } from "../models";
import { Routes } from "./routes";

const routes = (): Router => {
	const router = express.Router();

	router.get(Routes.READ, (req: Request, res: Response) => {
		const queryKeys = Object.keys(req.query);

		if (queryKeys.length === 1) {
			const readFile = readSavedFile(`${queryKeys[0]}.json`);
			if (readFile) {
				return res.send(readFile).status(200);
			}
			return res.sendStatus(400);
		}
		return res.send(getAllSaves()).status(200);
	});

	router.put(Routes.NEW, (req: Request, res: Response) => {
		const code = generateUniqueCode();
		if (code) {
			const newSavedList: SavedList = { code, items: [] };
			saveNewFile(`${code}.json`, newSavedList);
			return res.send(code).status(200);
		}
		return res.sendStatus(500);
	});

	router.post(Routes.ADD, (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	router.delete(Routes.REMOVE, (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	return router;
};

export default routes;
