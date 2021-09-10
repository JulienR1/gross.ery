import express, { Request, Response, Router } from "express";
import { addItemToList, createNewList, readSavedFile, removeSavedFile, updateSavedFile } from "../storage";
import { AddBody, UpdateBody, RemoveBody } from "../models";
import { Routes } from "./routes";

const routes = (): Router => {
	const router = express.Router();

	router.get(Routes.READ, async (req: Request, res: Response) => {
		const queryKeys = Object.keys(req.query);

		if (queryKeys.length === 1) {
			const savedList = await readSavedFile(queryKeys[0]);
			return res.send(savedList).status(200);
		}

		return res.sendStatus(200);
	});

	router.put(Routes.NEW, async (req: Request, res: Response) => {
		const generatedId = await createNewList();
		if (generatedId) {
			return res.send(generatedId.toHexString()).status(200);
		}
		return res.sendStatus(500);
	});

	router.post(Routes.ADD, async (req: Request, res: Response) => {
		const { id, itemName } = req.body as AddBody;
		if (id && itemName) {
			await addItemToList(id, itemName);
			return res.sendStatus(200);
		}
		return res.sendStatus(400);
	});

	router.post(Routes.UPDATE, async (req: Request, res: Response) => {
		const { id, itemName, newValues } = req.body as UpdateBody;

		if (id && itemName && newValues) {
			await updateSavedFile(id, itemName, newValues);
			return res.sendStatus(200);
		}
		return res.sendStatus(400);
	});

	router.delete(Routes.REMOVE, async (req: Request, res: Response) => {
		const { id } = req.body as RemoveBody;
		if (id) {
			await removeSavedFile(id);
			return res.sendStatus(200);
		}
		return res.sendStatus(400);
	});

	return router;
};

export default routes;
