export const saveProducts = (productsList) =>
  localStorage.setItem("products", JSON.stringify(productsList));

export const getProducts = () =>
  JSON.parse(localStorage.getItem("products")) || [];

export const addProduct = (code, name, amount, price) => {
  const newProduct = {
    code: code.toUpperCase(),
    name: name.toUpperCase(),
    amount: Number(amount),
    price: Number(price.replace(",", ".")),
  };
  const productList = getProducts();
  saveProducts([...productList, newProduct]);
  return newProduct;
};
