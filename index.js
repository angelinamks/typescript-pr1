class UserService {
  private users: { id: number; name: string; email: string }[] = [];

  addUser(user: { id: number; name: string; email: string }): void {
    this.users.push(user);
  }

  getUserById(id: number): { id: number; name: string; email: string } | undefined {
    return this.users.find(user => user.id === id);
  }

  getAllUsers(): { id: number; name: string; email: string }[] {
    return this.users;
  }
}

class ProductService {
  private products: { id: number; name: string; price: number; available: boolean }[] = [];

  addProduct(product: { id: number; name: string; price: number; available: boolean }): void {
    this.products.push(product);
  }

  getProductById(id: number): { id: number; name: string; price: number; available: boolean } | undefined {
    return this.products.find(product => product.id === id);
  }

  getAllProducts(): { id: number; name: string; price: number; available: boolean }[] {
    return this.products;
  }
}

class OrderService {
  private orders: { id: number; user: { id: number; name: string; email: string }; product: { id: number; name: string; price: number; available: boolean }; quantity: number }[] = [];

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  createOrder(userId: number, productId: number, quantity: number): void {
    const user = this.userService.getUserById(userId);
    const product = this.productService.getProductById(productId);

    if (!user || !product) {
      console.log('Invalid user or product');
      return;
    }

    const order = {
      id: this.orders.length + 1,
      user,
      product,
      quantity,
    };

    this.orders.push(order);
  }

  getAllOrders(): { id: number; user: { id: number; name: string; email: string }; product: { id: number; name: string; price: number; available: boolean }; quantity: number }[] {
    return this.orders;
  }
}

const userService = new UserService();
const productService = new ProductService();
const orderService = new OrderService(userService, productService);

userService.addUser({ id: 1, name: 'Alice', email: 'alice@example.com' });
userService.addUser({ id: 2, name: 'Bob', email: 'bob@example.com' });

productService.addProduct({ id: 1, name: 'Laptop', price: 999.99, available: true });
productService.addProduct({ id: 2, name: 'Mouse', price: 25.99, available: true });
productService.addProduct({ id: 3, name: 'Keyboard', price: 49.99, available: true });

orderService.createOrder(1, 1, 2);
orderService.createOrder(2, 2, 1);
orderService.createOrder(2, 3, 3);

console.log('All Users:');
console.log(userService.getAllUsers());

console.log('All Products:');
console.log(productService.getAllProducts());

console.log('All Orders:');
console.log(orderService.getAllOrders());

function calculateOrderTotal(order: { id: number; user: { id: number; name: string; email: string }; product: { id: number; name: string; price: number; available: boolean }; quantity: number }): number {
  return order.product.price * order.quantity;
}

function printOrderSummary(order: { id: number; user: { id: number; name: string; email: string }; product: { id: number; name: string; price: number; available: boolean }; quantity: number }): void {
  console.log(`Order ID: ${order.id}`);
  console.log(`User: ${order.user.name}`);
  console.log(`Product: ${order.product.name}`);
  console.log(`Quantity: ${order.quantity}`);
  console.log(`Total Price: $${calculateOrderTotal(order).toFixed(2)}`);
}

const orders = orderService.getAllOrders();
for (const order of orders) {
  printOrderSummary(order);
}

function getAvailableProducts(products: { id: number; name: string; price: number; available: boolean }[]): { id: number; name: string; price: number; available: boolean }[] {
  return products.filter(product => product.available);
}

function restockProduct(productService: ProductService, productId: number, price: number): void {
  const product = productService.getProductById(productId);
  if (product) {
    product.available = true;
    product.price = price;
    console.log(`Product ${product.name} has been restocked.`);
  } else {
    console.log('Product not found');
  }
}

restockProduct(productService, 2, 20.99);

function displayAvailableProducts(productService: ProductService): void {
  const availableProducts = getAvailableProducts(productService.getAllProducts());
  console.log('Available Products:');
  for (const product of availableProducts) {
    console.log(`- ${product.name}: $${product.price.toFixed(2)}`);
  }
}

displayAvailableProducts(productService);

console.log('Program execution completed successfully.');
