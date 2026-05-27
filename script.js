// console.log("Script initialized.");

const menuBtn=document.getElementById("menu-btn");
const menu=document.querySelector(".menu_container");
menuBtn.addEventListener("click",()=>{
menu.classList.toggle("active");
menuBtn.classList.toggle("active");
});


const translations = {

  en: {
    categories: "Categories",
    new_arrivals: "New Arrivals",
    bestseller: "Bestseller",
    shoulder_bags: "Shoulder Bags",
    outlet: "Outlet",
    sales: "Sales",
  },

  ka: {
    categories: "კატეგორიები",
    new_arrivals: "ახალი კოლექცია",
    bestseller: "ბესტსელერები",
    shoulder_bags: "მხრის ჩანთები",
    outlet: "აუთლეტი",
    sales: "აქციები",
  }

};