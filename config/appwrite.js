import { Client, Databases, Account, Storage } from 'node-appwrite';

// Admin Client
const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

const createSessionClient = async (session) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT);

  if (session) {
    Client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export { createAdminClient, createSessionClient };
