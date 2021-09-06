import express, { Request, Response, Router } from "express";
import { generateUniqueCode, getAllSaves, readSavedFile, saveNewFile, updateSavedFile } from "../storage";
import { SavedList, AddBody, UpdateBody, SavedItem } from "../models";
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
		const { code, itemName } = req.body as AddBody;
		if (code && itemName) {
			const savedFile = readSavedFile(`${code}.json`);
			if (savedFile) {
				savedFile.items.push({ name: itemName, checked: false });
				updateSavedFile(`${code}.json`, savedFile);
				return res.sendStatus(200);
			}
		}
		return res.sendStatus(400);
	});

	router.post(Routes.UPDATE, (req: Request, res: Response) => {
		const body = req.body as UpdateBody;
		const { code, itemName, newItem } = body;

		if (code && itemName && newItem) {
			const savedFile = readSavedFile(`${code}.json`);
			if (savedFile) {
				const itemToUpdateIndex = savedFile.items.findIndex((item) => item.name === itemName);

				if (itemToUpdateIndex >= 0) {
					const sanitizedNewItem: SavedItem = {
						name: newItem.name || savedFile.items[itemToUpdateIndex].name,
						checked: newItem.checked || savedFile.items[itemToUpdateIndex].checked,
					};

					savedFile.items[itemToUpdateIndex] = sanitizedNewItem;
					updateSavedFile(`${code}.json`, savedFile);
					return res.sendStatus(200);
				}
			}
		}
		res.sendStatus(400);
	});

	router.delete(Routes.REMOVE, (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	return router;
};

export default routes;
