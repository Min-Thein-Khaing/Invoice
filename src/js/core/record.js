import Swal from "sweetalert2";
import { recordTotal, rowTemplate } from "./selectors.js";

export const createRecord = ({id, name, price }, quantity) => {
  const rowCost = price * quantity;
  const record = rowTemplate.content.cloneNode(true);
  // record.querySelector(".row-no").innerText = 1;
  record.querySelector(".row").setAttribute("row-product-id",id)
  record.querySelector(".row-product-name").innerText = name;
  record.querySelector(".row-product-price").innerText = price;
  record.querySelector(".row-quantity").innerText = quantity;
  record.querySelector(".row-cost").innerText = rowCost;

  return record;
};

export const updateRecordList = () => {
  const allRecord = document.querySelectorAll(".row-cost");
  // let total = 0;
  // allRecord.forEach(({innerText}) => total += parseFloat( innerText) );
  recordTotal.innerText = [...allRecord].reduce(
    (pv, { innerText }) => pv + parseInt(innerText),
    0
  );
};
export const deleteRecord = (event) => {
  const row = event.target.closest(".row");
  // if (confirm("are you sure to delete row?")) {
  //   row.remove();
  //   updateRecordList();
  // }
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    // confirmButtonColor: "#3085d6",
    // cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      row.remove();
      // Swal.fire({
      //   title: "Delete Success",
      //   text: "success",
      //   icon: "success",
      //   confirmButtonText:"Close alert"
      // })
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Record Delete Successfully"
      });
    }
  });
}
 

export const updateRecord = (rowProductId,q) => {
  // const row = event.target.closest(".row");
  const row = document.querySelector(`[row-product-id ='${rowProductId}']`)
  const currentQuantity= row.querySelector(".row-quantity");
  const currentPrice = row.querySelector(".row-product-price")
  const currentCost =row.querySelector(".row-cost")
  currentQuantity.innerText = parseInt(currentQuantity.innerText)+q
  currentCost.innerText = currentPrice.innerText*currentQuantity.innerText 
  updateRecordList()
  
}
export const addRecordQuantity = (event) => {
    const row = event.target.closest(".row");
    const currentQuantity= row.querySelector(".row-quantity");
    const currentPrice = row.querySelector(".row-product-price")
    const currentCost =row.querySelector(".row-cost")
    currentQuantity.innerText = parseInt(currentQuantity.innerText)+1
    currentCost.innerText = currentPrice.innerText*currentQuantity.innerText 
    updateRecordList()

};
export const subRecordQuantity = (event) => {
    const row = event.target.closest(".row");
    const currentQuantity= row.querySelector(".row-quantity");
    const currentPrice = row.querySelector(".row-product-price")
    const currentCost =row.querySelector(".row-cost")
    if(currentQuantity.innerText>1){
        currentQuantity.innerText = parseInt(currentQuantity.innerText)-1
    currentCost.innerText = currentPrice.innerText*currentQuantity.innerText 
    updateRecordList()
    }else{
        deleteRecord(event)
    }

};
