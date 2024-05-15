const total = async (cart) => cart.total = cart.items.reduce((acc, product) => acc + product.subtotal, 0);

const add = async (cart, product) => {
  cart.items.push(product);
  return await total(cart)
}

const remove = async (cart, product, amount = 1) => {
  if (amount === product.quantity || amount > product.quantity) {
    product.quantity -= product.quantity;
    product.subtotal -= product.price;
    cart.items = cart.items.filter((el) => el !== product);
    await total(cart)
  }

  if (amount && product.quantity > 1) {
    product.quantity -= 1;
    product.subtotal -= product.price;
    await total(cart)
  }
};

const clear = async (cart) => {
  console.log("the cart was cleared!\n");
  cart.items = [];
  await total(cart);
};

export { add, remove, clear };
