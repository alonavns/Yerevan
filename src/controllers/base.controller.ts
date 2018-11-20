import {
  Response,
  Params, Body,
} from '@decorators/express';

import config from '../config';

class APIController {
  public db: any;
  public table: string = 'table';

  constructor() {
    this.db = config.db;
  }

  async getOneById(@Response() res: any, id: string) {
    const items = await this.db
      .where({ id })
      .select()
      .from(this.table).
      timeout(1000);

    if (items.length > 0) {
      res.send({
        success: true,
        data: items[0]
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'No Data with provided id',
      });
    }
  }

  async getOne(filter: object) {
    const items = await this.db
      .where(filter)
      .select()
      .from(this.table).
      timeout(1000);

    if (items.length > 0) {
      return items[0];
    }

    return null;
  }

  async insertOne(@Response() res: any, data: any) {
    const result = await this.db('users')
      .insert(data);

    const items = await this.db
      .where(data)
      .select()
      .from(this.table).
      timeout(1000);

    res.send({
      success: true,
      data: items[0],
    });
  }
}

export default APIController;