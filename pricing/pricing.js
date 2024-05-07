// Variables
const monthly = document.querySelector(".monthly"),
      yearly = document.querySelector(".yearly"),
      bcgEffect = document.querySelector(".bcg__effect"),
      premiumPrice = document.getElementById("premiumPrice"),
      premiumPlusPrice = document.getElementById("premiumPlusPrice");


const premiumText1 = `$1,99<span class="m-y"> /mo</span>`,
      premiumPlusText1 = `$2.99<span class="m-y"> /mo</span>`,
      premiumText2 = `<span class="old-price">$23.99</span><span class="real-price">/ $18.99<span class="m-y"> /year</span>`,
      premiumPlusText2 = `<span class="old-price">$35.99</span><span class="real-price">/ $28.99<span class="m-y"> /year</span>`;

const latency = 400;
// Main
yearly.addEventListener("click", event => {
    if(!yearly.classList.contains("clicked")) {
        yearly.classList.add("on1");
        monthly.classList.add("off1");
        bcgEffect.style.left = "calc(100% - 134px)";
        premiumPrice.style.right = "-25px";
        premiumPlusPrice.style.right = "-25px";

        setTimeout(() => {
            yearly.classList.remove("on1");
            yearly.classList.remove("OFF1");
            yearly.classList.add("ON1");

            monthly.classList.remove("off1");
            monthly.classList.add("OFF1");
        }, latency);

        premiumPrice.style.opacity = "0";
        premiumPlusPrice.style.opacity = "0";

        setTimeout(() => {
            premiumPrice.innerHTML = premiumText2;
            premiumPlusPrice.innerHTML = premiumText2;
            premiumPrice.style.opacity = "1";
            premiumPlusPrice.style.opacity = "1";
        }, latency / 2);

        yearly.classList.add("clicked");
    } 
});

monthly.addEventListener("click", event => {
    if(yearly.classList.contains("clicked")) {
        yearly.classList.add("off1");
        monthly.classList.add("on1");
        bcgEffect.style.left = "calc(0% + 2px)";  
        premiumPrice.style.right = "0px";
        premiumPlusPrice.style.right = "0px";  

        setTimeout(() => {
            yearly.classList.remove("off1");
            yearly.classList.remove("ON1");
            yearly.classList.add("OFF1");

            monthly.classList.remove("on1");
            monthly.classList.remove("OFF1");
            monthly.classList.add("ON1");
        }, latency);

        premiumPrice.style.opacity = "0";
        premiumPlusPrice.style.opacity = "0";

        setTimeout(() => {
            premiumPrice.innerHTML = premiumText1;
            premiumPlusPrice.innerHTML = premiumText1;
            premiumPrice.style.opacity = "1";
            premiumPlusPrice.style.opacity = "1";
        }, latency / 2);

        yearly.classList.remove("clicked");
    }
})