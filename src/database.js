import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    this.#load();
  }

  async #load() {
    try {
      const data = await fs.readFile(databasePath);
      this.#database = JSON.parse(data);
    } catch (error) {
      this.#persist();
    }
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}