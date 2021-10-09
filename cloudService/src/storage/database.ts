import { Db, MongoClient } from "mongodb";

const connectToDB = async (): Promise<MongoClient> => {
	const client = new MongoClient(process.env.DB_URL as string);
	return await client.connect();
};

const getDB = async (): Promise<{ client: MongoClient; db: Db }> => {
	const client = await connectToDB();
	const db = await client.db(process.env.DB_NAME as string);
	return { client, db };
};

const executeOnDB = async (
	commands: ({ client, db }: { client: MongoClient; db: Db }) => Promise<void>
): Promise<void> => {
	const { client, db } = await getDB();
	await commands({ client, db });
	await client.close();
};

export { executeOnDB };
