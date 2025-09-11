import { Client, ID, Storage, TablesDB } from "appwrite";
import { appwriteConfig } from "./config";

class DatabaseService {
  client = new Client();
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.endpointUrl)
      .setProject(appwriteConfig.projectId);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  // managing posts
  async createPost({ title, content, imageId, userName, userEmail, category }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.tableId,
        rowId: ID.unique(),
        data: {
          title,
          content,
          imageId,
          userName,
          userEmail,
          category,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(rowId) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.tableId,
        rowId: rowId,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(rowId) {
    try {
      return await this.tablesDB.getRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.tableId,
        rowId: rowId,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts() {
    try {
      return await this.tablesDB.listRows({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.tableId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // managing images
  async uploadImage(file) {
    try {
      return await this.storage.createFile({
        bucketId: appwriteConfig.bucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImage(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: appwriteConfig.bucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getImagePreview(fileId) {
    try {
      return await storage.getFilePreview({
        bucketId: appwriteConfig.bucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DatabaseService();
