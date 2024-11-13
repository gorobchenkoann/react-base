// Enums
enum OrderStatus {
  CREATED = 'Создан',
  PAID = 'Оплачен',
  DELIVERY = 'Доставка',
  COMPLETED = 'Завершён',
}
//-- Enums

// Helpers
const getProductsInfo = (products: ICartProduct[]) => {
  products.forEach((cartProduct: ICartProduct) => {
    const prod = cartProduct.product;
    console.log(`${prod.name} - ${prod.cost} - ${cartProduct.quantity}шт. - ${prod.cost * cartProduct.quantity}р.`);
  });
}

function addState<T>(state: T[], item: T) {
  state.push(item);
}
//-- Helpers

// Interfaces
interface IOrder {
  id: number,
  products: ICartProduct[],
  sum: number,
  date: Date,
  status: OrderStatus,
  changeStatus(status: OrderStatus): void,
  getInfo(): void,
}

interface IProduct {
  id: number,
  cost: number,
  inStock: boolean,
  name: string,
  description: string,
  changeInStockStatus: (status: boolean) => void,
}

interface ICartProduct {
  product: IProduct,
  quantity: number,
}

interface ICart {
  id: number,
  products: ICartProduct[],
  cost: number,
  addProduct: (product: IProduct, quantity: number) => void,
}
//-- Interfaces

// Types
type ProductParams = {
  id: number,
  cost: number,
  inStock: boolean,
  name: string,
  description: string
}

type TNullable<T> = T | null | undefined;
//-- Types

// --State

//Classes
class Product implements IProduct {
  cost: number;
  description: string;
  id: number;
  inStock: boolean;
  name: string;

  constructor(params: ProductParams) {
    this.id = params.id;
    this.cost = params.cost;
    this.inStock = params.inStock;
    this.name = params.name;
    this.description = params.description;
  }

  changeInStockStatus(status: boolean) {
    this.inStock = status;
  }
}

class CartProduct implements ICartProduct {
  product: IProduct;
  quantity: number;

  constructor(product: IProduct, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}

class Order implements IOrder {
  id: number;
  products: ICartProduct[];
  sum: number;
  date: Date;
  status: OrderStatus;

  constructor(id: number, cart: ICart) {
    this.id = id;
    this.products = cart.products;
    this.sum = cart.cost;
    this.date = new Date();
    this.status = OrderStatus.CREATED;
  }

  changeStatus(status: OrderStatus) {
    this.status = status;
  }

  getInfo(): void {
    console.log(`№ заказа: ${this.id}. Сумма заказа: ${this.sum}. Статус заказа: ${this.status}. Заказ создан ${this.date.toLocaleDateString()}`);
    console.log('Состав заказа:');
    getProductsInfo(this.products);
  }
}

class Cart implements ICart {
  id: number;
  cost: number;
  products: ICartProduct[];

  constructor(id: number) {
    this.id = id;
    this.products = [];
    this.cost = 0;
  }

  addProduct(product: IProduct, quantity: number) {
    const cartProduct = new CartProduct(product, quantity);
    if (!cartProduct.product.inStock) {
      console.log(`Товара ${cartProduct.product.name} нет в наличии.`);
    } else {
      this.products.push(cartProduct);
      this.cost = this.cost + cartProduct.product.cost * cartProduct.quantity;
      console.log(`Товар ${cartProduct.product.name} добавлен в корзину.`);
    }
  }

  removeProduct(id: number) {
    const hasProduct = this.products.some((cartProduct: ICartProduct) => cartProduct.product.id === id);
    if (!hasProduct) {
      console.log(`Товар с id ${id} не найден.`);
      return;
    }

    this.products = this.products.filter((cartProduct: ICartProduct) => cartProduct.product.id !== id);
    console.log(`Товар удалён из корзины.`)
  }

  getInfo() {
    if (!this.products.length) {
      console.log('Корзина пуста.');
    } else {
      console.log('Состав корзины:');
      getProductsInfo(this.products);
      console.log(`Итого: ${this.cost}р.`);
    }
  }
}

class ProductManager {
  private products: IProduct[];

  constructor() {
    this.products = [];
  }

  getProduct(id: number): TNullable<IProduct> {
    return this.products.find((prod: IProduct) => prod.id === id);
  }

  getProductInfo(id: number) {
    const product = this.getProduct(id);

    if (!product) {
      console.log(`Товар с id ${id} не найден.`);
    } else {
      console.log(`Наименование: ${product.name}`);
      console.log(`Описание: ${product.description}`);
      console.log(`Стоимость: ${product.cost}`);
      console.log(`Наличие: ${product.inStock ? 'в наличии' : 'нет в наличии'}`);
    }
  }

  addProduct(params: ProductParams) {
    this.products.push(new Product(params));
  }

  removeProduct(id: number) {
    this.products = this.products.filter((prod: IProduct) => prod.id !== id);
  }

  changeProductStatus(id: number, status: boolean) {
    const product = this.getProduct(id);

    if (product) {
      product.changeInStockStatus(status);
    }
  }
}

class OrderManager {
  readonly orderId: number;
  private orders: IOrder[];
  private productManager;

  constructor() {
    this.orderId = 0;
    this.orders = [];
    this.productManager = new ProductManager();
  }

  createOrder(cart: ICart) {
    this.orders.push(new Order(this.orderId + 1, cart));
  }

  getOrderInfo(id: number) {
    const order = this.orders.find((order: IOrder) => order.id === id);

    if (!order) {
      console.log(`Заказ с id ${id} не найден.`);
    } else {
      order.getInfo();
    }
  }

  changeStatus(id: number, status: OrderStatus) {
    const order = this.orders.find((order: IOrder) => order.id === id);

    if (order) {
      order.changeStatus(status);
      console.log(`Статус заказа №${id} изменён на ${status}`);
    }
  }
}
//-- Classes

const CART_ID = 0;

// Добавялем продукты в state
const productManager = new ProductManager();
const orderManager = new OrderManager();

productManager.addProduct(new Product({id: 1, name: 'Стол', description: 'Описание стола', cost: 3000, inStock: true}));
productManager.addProduct(new Product({id: 2, name: 'Стул', description: 'Описание стула', cost: 2000, inStock: true}));
productManager.addProduct(new Product({id: 3, name: 'Диван', description: 'Описание дивана', cost: 15000, inStock: false}));
productManager.addProduct(new Product({id: 4, name: 'Шкаф', description: 'Описание шкафа', cost: 10000, inStock: true}));
productManager.addProduct(new Product({id: 5, name: 'Кресло', description: 'Описание кресла', cost: 6000, inStock: true}));

// Создаем корзину
const cart = new Cart(CART_ID + 1);

const pr1 = productManager.getProduct(3); //Пробуем добавить товар не в наличии
if (pr1) {
  cart.addProduct(pr1, 1);
}

const pr2 = productManager.getProduct(1); //Добавляем продукт в корзину
if (pr2) {
  cart.addProduct(pr2, 3);
}

const pr3 = productManager.getProduct(5); //Добавляем продукт в корзину
if (pr3) {
  cart.addProduct(pr3, 1);
}
cart.getInfo(); // Выводим информацию о корзине

orderManager.createOrder(cart); //Создаем заказ
orderManager.getOrderInfo(1); //Выводим информацию о заказе
orderManager.changeStatus(1, OrderStatus.DELIVERY); // Меняем статус заказа
orderManager.getOrderInfo(1); //Выводим информацию о заказе после изменения статуса


