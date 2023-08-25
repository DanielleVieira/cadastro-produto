import * as productService from "./services/productService.js";
import * as productValidate from "./utils/productValidate.js";
import { tableRowComponent } from "./components/tableRowComponent.js";
import { tableEmptyRowComponent } from "./components/tableEmptyRowComponent.js";

const $registerForm = document.getElementById("product-register-form");
const $codeControl = document.getElementById("code-control");
const $nameControl = document.getElementById("name-control");
const $amountControl = document.getElementById("amount-control");
const $priceControl = document.getElementById("price-control");
const $productList = document.getElementById("product-table-body");

const productList = () => {
  $productList.innerHTML =
    productService
      .getProducts()
      .map((product) => {
        return tableRowComponent(
          product.code,
          product.name,
          product.amount,
          product.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          (product.amount * product.price).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      })
      .join("") || tableEmptyRowComponent();
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
  checkForm();
  if ($registerForm.checkValidity()) {
    productService.addProduct(
      $codeControl.value,
      $nameControl.value,
      $amountControl.value,
      $priceControl.value
    );
  } else {
    e.preventDefault();
    e.stopPropagation();
  }
};

$registerForm.addEventListener("submit", handleSubmit);
