import path from "path";
import fs from "fs";
import { Filename, Registry, SavedList } from "../models";

const storageDir = () => process.env.STORAGE_DIR as string;
const registryName = () => process.env.REGISTRY_NAME as string;

const getFilepath = (filename: Filename) => path.join(process.cwd(), storageDir(), filename);

const writeToRegistry = (content: Registry) => {
	const registryPath = path.join(process.cwd(), storageDir(), registryName());
	fs.writeFileSync(registryPath, JSON.stringify(content));
};

const openStorage = (): string => {
	const storagePath = path.join(process.cwd(), storageDir());
	if (!fs.existsSync(storagePath)) {
		fs.mkdirSync(storagePath);
	}

	return storagePath;
};

const getAllSaves = () => {
	const storagePath = openStorage();
	const registryPath = path.join(storagePath, registryName());

	if (!fs.existsSync(registryPath)) {
		const emptyRegistry: Registry = { files: [] };
		writeToRegistry(emptyRegistry);
		return emptyRegistry;
	}

	const registryData = fs.readFileSync(registryPath, "utf8");
	const registry = JSON.parse(registryData) as Registry;
	return registry;
};

const validateSavedFile = (filename: Filename, ignoreRegistry = false): boolean => {
	if (!filename.endsWith(".json")) {
		throw new Error("Invalid filename, needs to have the '.json' extension.");
	}

	if (ignoreRegistry) {
		return true;
	}

	// TODO: cache the read files in memory when reading in getAllSaves() instead of loading it twice
	if (getAllSaves().files.includes(filename)) {
		return fs.existsSync(getFilepath(filename));
	}
	return false;
};

const readSavedFile = (saveFile: Filename): SavedList | undefined => {
	if (validateSavedFile(saveFile)) {
		const savedData = fs.readFileSync(getFilepath(saveFile), "utf8");
		return JSON.parse(savedData);
	}
	return undefined;
};

const saveNewFile = (file: Filename, content: SavedList): void => {
	validateSavedFile(file, true);

	const filepath = getFilepath(file);
	fs.writeFileSync(filepath, JSON.stringify(content));

	const registry = getAllSaves();
	registry.files.push(file);
	writeToRegistry(registry);
};

const updateSavedFile = (filename: Filename, content: SavedList): void => {
	if (validateSavedFile(filename)) {
		const filepath = getFilepath(filename);
		fs.writeFileSync(filepath, JSON.stringify(content));
		return;
	}
	throw new Error(`Could not complete update of '${filename}'.`);
};

const removeSavedFile = (filename: Filename): void => {
	if (validateSavedFile(filename)) {
		const registry = getAllSaves();
		const fileIndex = registry.files.findIndex((savedFileName) => savedFileName === filename);
		registry.files.splice(fileIndex, 1);
		writeToRegistry(registry);
		return;
	}
	throw new Error(`Could not complete removal of '${filename}'.`);
};

export { getAllSaves, readSavedFile, saveNewFile, updateSavedFile, removeSavedFile };
