"use strict";

export default class Product {
  constructor(sku, name, price, quantity, _subtotal) {
    this.sku = sku;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.subtotal = price * quantity;
  }
}
