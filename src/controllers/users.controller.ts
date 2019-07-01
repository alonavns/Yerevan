import axios from 'axios'
import fs from 'fs'
import https from 'https'
import {
  Response, Controller,
  Get, Post, Put, Delete,
  Params, Body, Query,
} from '@decorators/express'

import APIController from './base.controller'

@Controller('/api/users')
class UsersController extends APIController {
  public table: string = 'users'

  @Get('/')
  async getUsers(@Response() res: any, @Query() filters: object) {
    this.getAll(res, filters)
  }

  @Get('/:id')
  async getUser(@Response() res: any, @Params('id') id: string) {
    // this.getOneById(res, id)

    axios.get(`https://reqres.in/api/users/${id}`)
      .then(resp => res.send({
        success: true,
        data: resp.data
      })).catch(err => {
        this.errorHandler(res, 'No Data with provided id')
      })
  }

  @Get('/:id/avatar')
  async getUserAvatar(@Response() res: any, @Params('id') id: string) {
    // this.getOneById(res, id)

    try {
      const { data: { data: { avatar } } } = await axios.get(`https://reqres.in/api/users/${id}`)
      const avatarName = getName(avatar)
      const filePath = `./avatars/${avatarName}`
      const exists = fs.existsSync(filePath)
      if (exists) {
        res.send({
          success: true,
          data: getBase64(filePath)
        })
      } else {
        const file = fs.createWriteStream(`./avatars/${avatarName}`)
        https.get(avatar, resp => {
          resp.pipe(file)
          file.on('finish', () => {
            file.close()
            res.send({
              success: true,
              data: getBase64(filePath)
            })
          })
        })
      }
    } catch (e) {
      this.errorHandler(res, 'No Data with provided id')
    }
  }

  // @Post('/')
  // @Put('/')
  // async create(@Response() res: any, @Body('data') data: any) {
  //   const {
  //     id,
  //     email,
  //     first_name,
  //     last_name,
  //   } = data

  //   if (id) {
  //     const user = await this.getOne({ id })

  //     if (first_name) user.first_name = first_name
  //     if (last_name) user.last_name = last_name
  //     user.date = new Date()

  //     if (email && email != user.email) {
  //       const duplicate = await this.getOne({ email })

  //       if (!duplicate) {
  //         user.email = email
  //       } else {
  //         return this.errorHandler(res, 'Email already exists')
  //       }
  //     }

  //     if (user) {
  //       this.updateOne(res, user)
  //     } else {
  //       this.errorHandler(res, 'No User with provided id')
  //     }
  //   } else {
  //     if (email) {
  //       const duplicate = await this.getOne({ email })
  //       data.date = new Date()

  //       if (!duplicate) {
  //         this.insertOne(res, data)
  //       } else {
  //         this.errorHandler(res, 'Email already exists')
  //       }
  //     } else {
  //       this.errorHandler(res, 'Email is not provided')
  //     }
  //   }
  // }

  @Delete('/:id/avatar')
  async deleteUser(@Response() res: any, @Params('id') id: string) {
    // this.deleteOne(res, id)

    try {
      const { data: { data: { avatar } } } = await axios.get(`https://reqres.in/api/users/${id}`)
      const avatarName = getName(avatar)
      const filePath = `./avatars/${avatarName}`
      fs.exists(filePath, exists => {
        if (exists) {
          fs.unlinkSync(filePath);
          res.send({
            success: true,
            data: filePath
          })
        } else {
          res.send({
            success: false,
            message: 'No images saved with that user id'
          })
        }
      })
    } catch (e) {
      this.errorHandler(res, 'No Data with provided id')
    }
  }
}

function getBase64(filePath: string) {
  const data = fs.readFileSync(filePath)
  return data.toString('base64')
}

function getName(str: string) {
  const ss = str.split('/')
  return ss[ss.length - 1]
}

export default UsersController