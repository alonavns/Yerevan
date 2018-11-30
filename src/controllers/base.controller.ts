import {
  Response,
} from '@decorators/express'

import config from '../config'

class APIController {
  public db: any
  public table: string = 'table'

  constructor() {
    this.db = config.db
  }

  async getAll(@Response() res: any, filters: object) {
    const items = await this.db
      .where(filters || {})
      .select()
      .from(this.table).
      timeout(1000)

    res.send({
      success: true,
      data: items
    })
  }

  async getOneById(@Response() res: any, id: string) {
    const item = await this.getOne({ id })

    if (item) {
      res.send({
        success: true,
        data: item
      })
    } else {
      this.errorHandler(res, 'No Data with provided id')
    }
  }

  async getOne(filter: object) {
    const items = await this.db
      .where(filter)
      .select()
      .from(this.table).
      timeout(1000)

    if (items.length > 0) {
      return items[0]
    }

    return null
  }

  async insertOne(@Response() res: any, data: any) {
    const result = await this.db('users')
      .insert(data)

    const item = await this.getOne(data)

    res.send({
      success: true,
      data: item,
    })
  }

  async updateOne(@Response() res: any, data: any) {
    const { id } = data
    const result = await this.db('users')
      .where({ id })
      .update(data)

    this.getOneById(res, id)
  }

  async deleteOne(@Response() res: any, id: string) {
    const result = await this.db('users')
      .where({ id })
      .del()

    if (result) {
      res.send({
        success: true,
        data: result
      })
    } else {
      this.errorHandler(res, 'No Data with provided id')
    }
  }

  errorHandler(@Response() res: any, message: string) {
    res.status(403).send({
      success: false,
      message,
    })
  }
}

export default APIController