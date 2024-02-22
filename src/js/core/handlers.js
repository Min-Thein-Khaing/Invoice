import { createProduct } from "./product.js";
import {
  addRecordQuantity,
  createRecord,
  deleteRecord,
  subRecordQuantity,
  updateRecord,
  updateRecordList,
} from "./record.js";
import { createForm, inventorySlider, newProductCreateForm, productGroup, productSelect, recordTotal, rowGroup } from "./selectors.js";
import { products } from "./variables.js";

export const createFormHandler = (e) => {
  e.preventDefault();
  // console.log("u click");
  // console.log(productSelect.value);
  // console.log(inputQuantity.valueAsNumber);

  const formData = new FormData(createForm);
  const currentProductId = parseInt(formData.get("productSelect"));

  const currentProduct = products.find((el) => el.id === currentProductId);

  const currentQuantity = parseInt(formData.get("inputQuantity"));
  console.log(currentProduct);
  const isExistedRow = rowGroup.querySelector(
    `[row-product-id='${currentProductId}']`
  );
  if (isExistedRow) {

    // const currentQuantityElement = isExistedRow.querySelector(".row-quantity");
    // const currentPrice = isExistedRow.querySelector(".row-product-price");
    // const currentCost = isExistedRow.querySelector(".row-cost");
    // currentQuantityElement.innerText =
    //   parseInt(currentQuantityElement.innerText) + currentQuantity;
    // currentCost.innerText =
    //   currentPrice.innerText * currentQuantityElement.innerText;
    updateRecord(isExistedRow.getAttribute("row-product-id"),currentQuantity)
  } else {
    rowGroup.append(createRecord(currentProduct, currentQuantity));
  }

  updateRecordList();
  createForm.reset();
};

export const rowGroupHandler = (event) => {
  if (event.target.classList.contains("row-del-btn")) {
    deleteRecord(event);
  } else if (event.target.classList.contains("row-q-add")) {
    // console.log("add");
    // addRecordQuantity(event);
    updateRecord(event.target.closest(".row").getAttribute("row-product-id"), 1)
  } else if (event.target.classList.contains("row-q-sub")) {
    // console.log("sub");
    // subRecordQuantity(event);
    updateRecord(event.target.closest(".row").getAttribute("row-product-id"), -1)
  }
};

export const manageInventoryBtnHandler = (event) => {
    inventorySlider.classList.toggle("-translate-x-full")
}

export const newProductCreateFormHandler = (event) => {
  event.preventDefault()
  const formData = new FormData(newProductCreateForm)
  const newProduct ={
    id :Date.now(),
    name:formData.get("new_product_name"),
    price:formData.get("new_product_price")
  }
  productGroup.append(createProduct(newProduct))
  productSelect.append(new Option(newProduct.name,newProduct.id))
  products.push(newProduct)
  newProductCreateForm.reset()
}
export const printBtnHandler = () => {
  window.print()
}