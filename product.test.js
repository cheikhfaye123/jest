const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
  resetProducts();
});

describe('Product Management', () => {
  describe('Adding Products', () => {
    test('should add a product', () => {
      addProduct('Test Product', 10);
      const products = getProducts();
      expect(products).toHaveLength(1);
      expect(products[0]).toEqual({ id: 1, name: 'Test Product', price: 10 });
    });

    test('should increment id for each new product', () => {
      addProduct('Product 1', 10);
      addProduct('Product 2', 20);
      const products = getProducts();
      expect(products).toHaveLength(2);
      expect(products[0].id).toBe(1);
      expect(products[1].id).toBe(2);
    });

    test('should throw error if name or price is undefined', () => {
      expect(() => addProduct(undefined, 10)).toThrow('Name and price are required');
      expect(() => addProduct('Test', undefined)).toThrow('Name and price are required');
    });

    test('should throw error if product already exists', () => {
      addProduct('Test Product', 10);
      expect(() => addProduct('Test Product', 20)).toThrow('Product already exists');
    });
  });

  describe('Removing Products', () => {
    test('should remove a product', () => {
      addProduct('Test Product', 10);
      removeProduct(1);
      const products = getProducts();
      expect(products).toHaveLength(0);
    });

    test('should throw error if product does not exist', () => {
      expect(() => removeProduct(1)).toThrow('Product not found');
    });
  });

  describe('Getting a single product', () => {
    test('should get a product by id', () => {
      addProduct('Test Product', 10);
      const product = getProduct(1);
      expect(product).toEqual({ id: 1, name: 'Test Product', price: 10 });
    });

    test('should throw error if product does not exist', () => {
      expect(() => getProduct(1)).toThrow('Product not found');
    });
  });

  describe('Updating Products', () => {
    test('should update a product', () => {
      addProduct('Test Product', 10);
      updateProduct(1, 'Updated Product', 20);
      const product = getProduct(1);
      expect(product).toEqual({ id: 1, name: 'Updated Product', price: 20 });
    });

    test('should throw error if product does not exist', () => {
      expect(() => updateProduct(1, 'Test', 10)).toThrow('Product not found');
    });

    test('should only update the price if name is undefined', () => {
      addProduct('Test Product', 10);
      updateProduct(1, undefined, 20);
      const product = getProduct(1);
      expect(product).toEqual({ id: 1, name: 'Test Product', price: 20 });
    });

    test('should only update the name if price is undefined', () => {
      addProduct('Test Product', 10);
      updateProduct(1, 'Updated Product', undefined);
      const product = getProduct(1);
      expect(product).toEqual({ id: 1, name: 'Updated Product', price: 10 });
    });
  });
});