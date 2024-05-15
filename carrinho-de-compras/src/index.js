import Product from "./model/product.js";
import Cart from "./model/cart.js";
import { add, remove, clear } from "./services/HandleCart.js";

const cart = new Cart
const apple = new Product("1", "apple", 2.29, 3);
const banana = new Product("2", "banana", 2.15, 6);
const avocado = new Product("3", "avocado", 7.88, 2);

await add(cart, apple);
await add(cart, banana);
await add(cart, avocado);
console.log(cart);
console.log('______________________________________\n');

await remove(cart, avocado, 1)
console.log(cart);
console.log('______________________________________\n');

await clear(cart)
console.log(cart);