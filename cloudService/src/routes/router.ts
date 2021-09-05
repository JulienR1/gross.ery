import express, { Request, Response, Router } from "express";
import { QueryParams } from "../models";
import { getAllSaves } from "../storage";
import { readSavedFile } from "../storage/storage";
import { Routes } from "./routes";

const routes = (): Router => {
	const router = express.Router();

	router.get(Routes.READ, (req: Request, res: Response) => {
		const queryParams = req.query as QueryParams;
		const queryKeys = Object.keys(queryParams);

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
		res.sendStatus(200);
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
