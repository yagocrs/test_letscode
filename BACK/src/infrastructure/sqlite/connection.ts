import sqlite3 from 'sqlite3';

export class ConnectionSingleton {
  private static instance: sqlite3.Database;

  private constructor() {}

  public static getInstance(): sqlite3.Database {
    if (!ConnectionSingleton.instance) {
      ConnectionSingleton.instance = new sqlite3.Database(':memory:');
    }

    return ConnectionSingleton.instance;
  }
}
