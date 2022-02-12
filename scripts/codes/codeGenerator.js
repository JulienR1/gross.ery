const crypto = require("crypto");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const codeCount = process.argv[2];
const env = process.argv[3];

const environments = ["dev", "prod"];

if (codeCount === undefined || !Number.isInteger(parseInt(codeCount))) {
	console.error("Spécifier le nombre de de codes à générer.");
	return;
}

if (env === undefined || !environments.includes(env)) {
	console.error(`Spécifier l'environnement avec lequel travailler [${environments.join(", ")}]`);
	return;
}

const selectedDb = env === "prod" ? process.env.DB_PROD : process.env.DB_DEV;

const withDB = async (process) => {
	const client = new MongoClient(selectedDb);
	try {
		await client.connect();
		const db = client.db("grossery");
		await process(db);
	} finally {
		await client.close();
	}
};

const generateToken = () => {
	return crypto.randomBytes(6).toString("base64").replace("/", "_").replace("+", "-");
};

const tokenExists = async (db, tokenToValidate) => {
	const storedCode = await db.collection("codes").findOne({ code: tokenToValidate });
	return new Boolean(storedCode).valueOf();
};

withDB(async (db) => {
	const availableTokens = [];

	let errorCount = 0;
	let generatedCount = 0;
	do {
		const token = generateToken();
		const tokenIsTaken = await tokenExists(db, token);
		if (tokenIsTaken) {
			errorCount++;
		} else {
			availableTokens.push(token);
			generatedCount++;
		}
	} while (errorCount < 10 && generatedCount < codeCount);

	if (availableTokens.length == codeCount) {
		console.log(`Ajout des codes suivants: [${availableTokens.join(", ")}]`);
		await db.collection("codes").insertMany(availableTokens.map((code) => ({ code })));
	} else {
		console.error(`Impossible de générer ${codeCount} codes.`);
	}
});
