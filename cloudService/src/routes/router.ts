import express, { Request, Response, Router } from "express";

import { AddBody, RemoveBody, SavedItem, UpdateBody, ValidateCodeQuery } from "../models";
import { NewBody, RemoveItemBody } from "../models/savedList";
import {
	addItemToList,
	createNewList,
	isInvitationCodeValid,
	readSavedFile,
	removeItemFromList,
	removeSavedFile,
	updateSavedFile,
} from "../storage";
import { version as serverVersion } from "./../../package.json";
import { Routes } from "./routes";

const routes = (): Router => {
	const router = express.Router();

	router.get(Routes.READ, async (req: Request, res: Response) => {
		const queryKeys = Object.keys(req.query);

		if (queryKeys.length === 1 && queryKeys[0].length === 24) {
			const savedList = await readSavedFile(queryKeys[0]);
			return res.send(savedList).status(200);
		}

		return res.sendStatus(400);
	});

	router.put(Routes.NEW, async (req: Request, res: Response) => {
		const { listName } = req.body as NewBody;

		try {
			const generatedId = await createNewList(listName);
			if (generatedId) {
				return res.send(generatedId.toHexString()).status(200);
			}
		} catch (ex) {
			console.error(ex);
		}
		return res.sendStatus(500);
	});

	router.post(Routes.ADD, async (req: Request, res: Response) => {
		const { id, itemName } = req.body as AddBody;
		if (id && itemName) {
			const itemToAdd: SavedItem = {
				name: itemName,
				checked: false,
			};

			await addItemToList(id, itemToAdd);
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

	router.delete(Routes.REMOVE_ITEM, async (req: Request, res: Response) => {
		const { id, itemName } = req.body as RemoveItemBody;
		if (id && itemName) {
			await removeItemFromList(id, itemName);
			return res.sendStatus(200);
		}
		return res.sendStatus(400);
	});

	router.get(Routes.VERSION, async (req: Request, res: Response) => {
		const versions = {
			server: serverVersion,
			appVersion: process.env.APP_VERSION ?? "",
		};
		res.json({ ...versions }).status(200);
	});

	router.get(Routes.VALIDATE_CODE, async (req: Request, res: Response) => {
		const query = req.query as ValidateCodeQuery;
		const code = Object.keys(query).find((key) => query[key] === "") ?? "";
		const isValid = await isInvitationCodeValid(code);
		res.json({ valid: isValid }).status(isValid ? 200 : 400);
	});

	return router;
};

export default routes;
