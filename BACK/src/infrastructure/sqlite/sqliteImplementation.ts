import sqlite3 from 'sqlite3';

import { Card } from '../../domain/entity/Card';
import { CardRepository } from '../../domain/ports/CardRepository';
import { ConnectionSingleton } from './connection';
import { UserRepository } from '../../domain/ports/UserRepository';
import { User } from '../../domain/entity/User';

export class SqliteCardRepository implements CardRepository, UserRepository {
  db: sqlite3.Database;

  constructor() {
    this.db = ConnectionSingleton.getInstance();

    this.db.serialize(() => {
      this.db.run(
        'CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, conteudo TEXT, lista TEXT)'
      );

      this.db.run(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)'
      );

      // insert user test
      this.db.run('INSERT INTO users (name, password) VALUES (?, ?)', [
        'letscode',
        'lets@123'
      ]);
    });
  }

  async create(card: Card): Promise<Card> {
    return await new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(
          'INSERT INTO cards (titulo, conteudo, lista) VALUES (?, ?, ?)',
          [card.titulo, card.conteudo, card.lista],
          (err: Error) => {
            if (err) {
              reject(err);
            }

            this.db.get(
              'SELECT last_insert_rowid() as id',
              (err: Error, row: any) => {
                if (err) {
                  reject(err);
                }

                resolve(
                  new Card(row.id, card.titulo, card.conteudo, card.lista)
                );
              }
            );
          }
        );
      });
    });
  }

  async update(cardId: number, card: Card): Promise<boolean | Error> {
    const existCard = await this.getById(cardId);

    if (existCard) {
      return await new Promise((resolve, reject) => {
        this.db.serialize(() => {
          this.db.run(
            'UPDATE cards SET titulo = ?, conteudo = ?, lista = ? WHERE id = ?',
            [card.titulo, card.conteudo, card.lista, cardId],
            (err: Error) => {
              if (err) {
                reject(err);
              }
              resolve(true);
            }
          );
        });
      });
    }

    return new Error('Card not found');
  }

  async delete(cardId: number): Promise<boolean | Error> {
    const existCard = await this.getById(cardId);

    if (existCard) {
      return await new Promise((resolve, reject) => {
        this.db.serialize(() => {
          this.db.run(
            'DELETE FROM cards WHERE id = ?',
            [cardId],
            (err: Error) => {
              if (err) {
                reject(err);
              }

              resolve(true);
            }
          );
        });
      });
    }

    return new Error('Card not found');
  }

  async getAll(): Promise<Card[]> {
    return await new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all('SELECT * FROM cards', (err: Error, rows: any) => {
          if (err) {
            reject(err);
          }

          resolve(rows);
        });
      });
    });
  }

  async authenticate(
    name: string,
    password: string
  ): Promise<User | undefined> {
    return await new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get(
          'SELECT * FROM users WHERE name = ? AND password = ?',
          [name, password],
          (err: Error, row: any) => {
            if (err) {
              reject(err);
            }

            resolve(row);
          }
        );
      });
    });
  }

  async getById(cardId: number): Promise<Card> {
    return await new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get(
          'SELECT * FROM cards WHERE id = ?',
          [cardId],
          (err: Error, row: any) => {
            if (err) {
              reject(err);
            }

            resolve(row);
          }
        );
      });
    });
  }
}
