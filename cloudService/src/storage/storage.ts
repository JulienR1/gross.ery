import { SavedItem, SavedList } from "../models";
import { executeOnDB } from "./database";
import { ObjectId } from "bson";

const collectionName = "listes";

const readSavedFile = async (id: string): Promise<SavedList | undefined> => {
  if (id) {
    return new Promise(async (resolve) => {
      await executeOnDB(async ({ db }) => {
        const foundDoc = (await db.collection(collectionName).findOne({ _id: new ObjectId(id) })) as SavedList;
        return resolve(foundDoc);
      });
    });
  }
  return undefined;
};

const createNewList = (): Promise<ObjectId> => {
  return new Promise(async (resolve) => {
    await executeOnDB(async ({ db }) => {
      const emptyList: SavedList = { items: [] };
      const insertedDocument = await db.collection(collectionName).insertOne(emptyList);
      return resolve(insertedDocument.insertedId);
    });
  });
};

const addItemToList = (id: string, itemToAdd: SavedItem): Promise<void> => {
  return executeOnDB(async ({ db }) => {
    await db.collection(collectionName).updateOne({ _id: new ObjectId(id) }, { $push: { items: itemToAdd } });
  });
};

const updateSavedFile = async (id: string, oldItem: string, newValues: SavedItem): Promise<void> => {
  if (id && oldItem && newValues) {
    await executeOnDB(async ({ db }) => {
      const foundItem = (await db.collection(collectionName).findOne({ _id: new ObjectId(id) })) as SavedList;

      const itemIndex = foundItem.items.findIndex(({ name }) => name === oldItem);
      if (itemIndex >= 0) {
        const oldData = (await db.collection(collectionName).findOne({ _id: new ObjectId(id) })) as SavedList;

        await db
          .collection(collectionName)
          .updateOne({ _id: new ObjectId(id) }, { $set: { "items.$[itemToModify]": { ...oldData.items[itemIndex], ...newValues } } }, { arrayFilters: [{ "itemToModify.name": oldItem }] });
      }
    });
    return;
  }
  throw new Error("Could not complete update");
};

const removeSavedFile = (id: string): Promise<void> => {
  return executeOnDB(async ({ db }) => {
    await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
  });
};

export { readSavedFile, updateSavedFile, removeSavedFile, createNewList, addItemToList };
