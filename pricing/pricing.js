// Variables
const monthly = document.querySelector(".monthly"),
      yearly = document.querySelector(".yearly"),
      bcgEffect = document.querySelector(".bcg__effect");



yearly.addEventListener("click", event => {
    if(!yearly.classList.contains("clicked")) {
        yearly.classList.add("on1");
        monthly.classList.add("off1");
        bcgEffect.style.left = "calc(100% - 134px)";

        setTimeout(() => {
            yearly.classList.remove("on1");
            yearly.classList.remove("OFF1");
            yearly.classList.add("ON1");

            monthly.classList.remove("off1");
            monthly.classList.add("OFF1");
        }, 600);
        yearly.classList.add("clicked");
    } 
});

monthly.addEventListener("click", event => {
    if(yearly.classList.contains("clicked")) {
        yearly.classList.add("off1");
        monthly.classList.add("on1");
        bcgEffect.style.left = "calc(0% + 2px)";    

        setTimeout(() => {
            yearly.classList.remove("off1");
            yearly.classList.remove("ON1");
            yearly.classList.add("OFF1");

            monthly.classList.remove("on1");
            monthly.classList.remove("OFF1");
            monthly.classList.add("ON1");
        }, 600);
        yearly.classList.remove("clicked");
    }
})