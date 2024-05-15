'use strict'

export default class Cart {
  constructor(_id, _items, _total) {
    this.id = Math.random().toString(12).substring(6)
    this.items = []
    this.total = 0
  }
}