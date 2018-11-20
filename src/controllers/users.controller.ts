import {
  Response, Controller,
  Get, Post,
  Params, Body, Query,
} from '@decorators/express';

import APIController from './base.controller';

@Controller('/')
class UsersController extends APIController {
  public table: string = 'users';

  @Get('/users/:id')
  async getUser(@Response() res: any, @Params('id') id: string) {
    this.getOneById(res, id);
  }

  @Post('/users')
  async create(@Response() res: any, @Body('data') data: any) {
    const {
      email,
      first_name,
      last_name
    } = data;

    const userData = {
      email,
      first_name,
      last_name,
      date: new Date()
    };

    if (email) {
      const duplicate = await this.getOne({ email });

      if (!duplicate) {
        this.insertOne(res, userData);
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