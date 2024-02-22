
import Swal from "sweetalert2";
import "./input.css"
import Invoice from "./src/js/Invoice.js"




const invoice = new Invoice();
invoice.init();

// Swal.fire("Min Ga Lar Par");
// Swal.fire({
//   title: "Welcome to ThaiLand",
//   icon : "success",
//   text : "sa war dee ka"
// })

// Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   // confirmButtonColor: "#3085d6",
//   // cancelButtonColor: "#d33",
//   confirmButtonText: "Confirm",
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success"
//     });
//   }
// });