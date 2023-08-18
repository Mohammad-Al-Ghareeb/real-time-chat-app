import { Client, Databases, Account } from "appwrite";

export const PROGECT_ID = "PROGECT_ID";
export const DATABASES_ID = "DATABASES_ID";
export const COLLECTION_ID_MESSAGES = "COLLECTION_ID_MESSAGES";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("PROGECT_ID");

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
