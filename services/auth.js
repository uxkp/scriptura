import { Account, Avatars, Client, ID, OAuthProvider } from "appwrite";
import { appwriteConfig } from "./config";

class AuthService {
  client = new Client();
  account;
  avatars;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.endpointUrl)
      .setProject(appwriteConfig.projectId);
    this.account = new Account(this.client);
    this.avatars = new Avatars(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
      });
      if (userAccount) {
        return this.loginEmailPassword({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async loginEmailPassword({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async loginGoogleOAuth() {
    try {
      return this.account.createOAuth2Session({
        provider: OAuthProvider.Google,
        success: "https://scriptura-five.vercel.app/",
        failure: "https://scriptura-five.vercel.app/",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async loginGithubOAuth() {
    try {
      return this.account.createOAuth2Session({
        provider: OAuthProvider.Github,
        success: "https://scriptura-five.vercel.app/",
        failure: "https://scriptura-five.vercel.app/",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;
