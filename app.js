import * as productService from "./services/productService.js";
import * as productValidate from "./utils/productValidate.js";

const $registerForm = document.getElementById("product-register-form");
const $codeControl = document.getElementById("code-control");
const $nameControl = document.getElementById("name-control");
const $amountControl = document.getElementById("amount-control");
const $priceControl = document.getElementById("price-control");
const $productList = document.getElementById("product-table-body");

const productList = () => {
  $productList.innerHTML = "";
  productService.getProducts().map((product) => {
    const $newRow = document.createElement("tr", {
      id: product.code,
      scope: "row",
    });
    $newRow.innerHTML = `
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${product.amount}</td>
        <td>${product.price.toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
        })}</td>
        <td>${(product.amount * product.price).toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
        })}</td>
    `;
    $productList.appendChild($newRow);
  });
};
productList();

//Form

const checkForm = () => {
  productValidate.checkPrice($priceControl);
  productValidate.checkAmount($amountControl);
  productValidate.checkName($nameControl);
  productValidate.checkCode($codeControl);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  checkForm();
  if (
    $codeControl.checkValidity() &&
    $nameControl.checkValidity() &&
    $amountControl.checkValidity() &&
    $priceControl.checkValidity()
  ) {
    productService.addProduct(
      $codeControl.value,
      $nameControl.value,
      Number($amountControl.value),
      Number($priceControl.value.replace(",", "."))
    );
    productList();
  }
};

$registerForm.addEventListener("submit", handleSubmit);
