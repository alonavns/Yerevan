import {
  Response, Controller,
  Get, Post, Put, Delete,
  Params, Body, Query,
} from '@decorators/express'

import APIController from './base.controller'

@Controller('/users')
class UsersController extends APIController {
  public table: string = 'users'

  @Get('/')
  async getUsers(@Response() res: any, @Query() filters: object) {
    this.getAll(res, filters)
  }

  @Get('/:id')
  async getUser(@Response() res: any, @Params('id') id: string) {
    this.getOneById(res, id)
  }

  @Post('/')
  @Put('/')
  async create(@Response() res: any, @Body('data') data: any) {
    const {
      id,
      email,
      first_name,
      last_name,
    } = data

    if (id) {
      const user = await this.getOne({ id })

      if (first_name) user.first_name = first_name
      if (last_name) user.last_name = last_name
      user.date = new Date()

      if (email && email != user.email) {
        const duplicate = await this.getOne({ email })

        if (!duplicate) {
          user.email = email
        } else {
          return this.errorHandler(res, 'Email already exists')
        }
      }

      if (user) {
        this.updateOne(res, user)
      } else {
        this.errorHandler(res, 'No User with provided id')
      }
    } else {
      if (email) {
        const duplicate = await this.getOne({ email })
        data.date = new Date()

        if (!duplicate) {
          this.insertOne(res, data)
        } else {
          this.errorHandler(res, 'Email already exists')
        }
      } else {
        this.errorHandler(res, 'Email is not provided')
      }
    }
  }

  @Delete('/:id')
  async deleteUser(@Response() res: any, @Params('id') id: string) {
    this.deleteOne(res, id)
  }
}

export default UsersController