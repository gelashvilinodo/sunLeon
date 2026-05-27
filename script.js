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

let currentLang = "en";

const langButtons = document.querySelectorAll(".lang-btn");

function changeLanguage(lang){

    currentLang = lang;

    document
      .querySelectorAll("[data-key]")
      .forEach(element => {

        const key = element.dataset.key;

        if(translations[lang][key]){
          element.textContent =
          translations[lang][key];
        }

      });

}

function updateLanguageButton(){

    langButtons.forEach(btn => {

        btn.classList.remove("show");

        if(
            currentLang === "en" &&
            btn.dataset.lang === "ka"
        ){
            btn.classList.add("show");
        }

        if(
            currentLang === "ka" &&
            btn.dataset.lang === "en"
        ){
            btn.classList.add("show");
        }

    });

}

langButtons.forEach(btn => {

    btn.addEventListener("click",()=>{

        changeLanguage(btn.dataset.lang);

        updateLanguageButton();

    });

});

changeLanguage(currentLang);
updateLanguageButton();