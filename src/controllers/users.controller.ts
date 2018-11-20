import {
  Response, Controller,
  Get, Post,
  Params, Body, Query,
} from '@decorators/express';

import config from '../config';

@Controller('/')
class UsersController {
  public db: any;

  constructor(db: any) {
    this.db = config.db;
  }

  @Get('/users/:id')
  async getData(@Response() res: any, @Params('id') id: string) {
    const users = await this.db
      .where({ id })
      .select()
      .from('users').
      timeout(1000);
    if (users.length > 0) {
      res.send({
        success: true,
        data: users[0]
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'No User with provided id',
      });
    }
  }

  @Post('/users')
  async create(@Response() res: any, @Body('data') data: any) {
    const {
      email,
      first_name,
      last_name
    } = data;
    if (email) {
      const duplicates = await this.db
        .where({ email })
        .select('id')
        .from('users').
        timeout(1000);

      if (duplicates.length === 0) {
        data.date = new Date();
        const result = await this.db('users')
          .insert(data);
        const user = await this.db
          .where({ email })
          .select()
          .from('users').
          timeout(1000);
        res.send({
          success: true,
          data: user[0],
        });
      } else {
        res.status(404).send({
          success: false,
          message: 'Email already exists',
        });
      }
    } else {
      res.status(404).send({
        success: false,
        message: 'Email is not provided',
      });
    }
  }
}

export default UsersController;