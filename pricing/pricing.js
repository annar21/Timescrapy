// Variables
const monthly = document.querySelector(".monthly"),
      yearly = document.querySelector(".yearly"),
      bcgEffect = document.querySelector(".bcg__effect"),
      premiumPrice = document.getElementById("premiumPrice"),
      premiumPlusPrice = document.getElementById("premiumPlusPrice"),
      avatar = document.querySelector('.avatar'),
      cBtns = document.getElementsByClassName("c-btn"),
      transparentBackground = document.getElementById("transparentBackground"),
      alertSuccess = document.querySelector(".alert"),
      alertError = document.querySelector('.alert__err'),
      alertErrText = document.querySelector('.alert__err-text'),
      alertSuccessText = document.querySelector('.alert__text')

let cBtnsNotCurrent 

const premiumText1 = `$1,99<span class="m-y"> /mo</span>`,
      premiumPlusText1 = `$2.99<span class="m-y"> /mo</span>`,
      premiumText2 = `<span class="old-price">$23.99</span><span class="real-price">/ $18.99<span class="m-y"> /year</span>`,
      premiumPlusText2 = `<span class="old-price">$35.99</span><span class="real-price">/ $28.99<span class="m-y"> /year</span>`

const latency = 400

const monthly_premium_plan_id = "price_1PFbjLRtFoOIzy2iWneQLE5Y",
      monthly_premium_plus_plan_id = "price_1PFbk7RtFoOIzy2iDLQJmdwH",
      yearly_premium_plan_id = "price_1PFcIFRtFoOIzy2i5ZfLYWCH",
      yearly_premium_plus_plan_id = "price_1PFcJSRtFoOIzy2ieLUN43t6",
      lifetime_plan_id = "price_1PFbl4RtFoOIzy2i3BHeeCf6"

const premiumMonthlyURL = 'https://buy.stripe.com/test_aEU7wk1oG1TFdMI8ww',
      premiumPlusMonthlyURL = 'https://buy.stripe.com/test_dR617W0kCcyj5gc7st',
      premiumYearlyURL = 'https://buy.stripe.com/test_cN25oc7N4dCn3844gi',
      premiumPlusYearlyURL = 'https://buy.stripe.com/test_cN217Wc3k9m70ZWcMP',
      lifetimeURL = 'https://buy.stripe.com/test_14k6sg3wO55R2404gk',
      donationURL = 'https://donate.stripe.com/test_eVa5ocd7oeGreQMfZ3'

const plansTolowerCase = ['basic', 'premium', 'premium plus', 'lifetime']

let userPlan
let isMonthly = null
// Functions
const upgradeSubscription = payload => fetch('https://timescrapy.com/upgrade-subscription', {
    method: 'POST', 
    body: JSON.stringify(payload),
    headers: {
        'Content-type': 'application/json'
    }
})

const addCurrentButton = () => {
    const t = cBtns[plansTolowerCase.findIndex(el => el === userPlan)]
    t.innerHTML = '<a href="#">Current</a>'
    t.classList.add("current")
}

const removeCurrentButton = () => {
    [...cBtns].forEach(el => {
        if(el.classList.contains("current")) {
            el.classList.remove("current")
            el.innerHTML = `<a href="#">Get Started</a>`
        }
    })
}

const fn = el => {
    transparentBackground.classList.remove("hide")
    const [payload, index] = createPayload(el)
    upgradeSubscription(payload)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.message)
            transparentBackground.classList.add("hide")
            if(data.success) {
                userPlan = plansTolowerCase[index]
                removeCurrentButton()
                if(isMonthly) {
                    bcgEffect.style.left = "calc(0% + 2px)"  
                    premiumPrice.style.right = "0px"
                    premiumPlusPrice.style.right = "0px" 
                    premiumPrice.innerHTML = premiumText1
                    premiumPlusPrice.innerHTML = premiumText1
                    yearly.classList.remove("clicked", "ON1")
                    yearly.classList.add("OFF1")
                    monthly.classList.add("ON1")
                } else {
                    bcgEffect.style.left = "calc(100% - 134px)"
                    premiumPrice.style.right = "-25px"
                    premiumPlusPrice.style.right = "-25px"
                    premiumPrice.innerHTML = premiumText2
                    premiumPlusPrice.innerHTML = premiumText2
                    yearly.classList.add("clicked", "ON1")
                    yearly.classList.remove("OFF1")
                    monthly.classList.remove("ON1")
                    monthly.classList.add("OFF1")
                }

                addCurrentButton()
                cBtnsNotCurrent = Array.from(cBtns).filter(el => !el.classList.contains("current"))
                alertSuccessText.innerText = data.message
                showAlert(alertSuccess)
            } else {
                alertErrText.innerText = data.message
                showAlert(alertError)
            }
        })
        .catch(err => console.log(err))
}

const createPayload = el => {
    const payload = new Object()
    const index = [...cBtns].findIndex(element => element === el)
    if(userPlan !== "basic") {
        if(yearly.classList.contains("clicked")) {
            isMonthly = false
            switch(index) {
                case 0:
                    payload.new_plan_id = "basic"
                    break
                case 1:
                    payload.new_plan_id = yearly_premium_plan_id
                    break
                case 2:
                    payload.new_plan_id = yearly_premium_plus_plan_id
                    break
                case 3:
                    payload.new_plan_id = "lifetime"
                    break
            }
        } else {
            isMonthly = true
            switch(index) {
                case 0:
                    payload.new_plan_id = "basic"
                    break
                case 1:
                    payload.new_plan_id = monthly_premium_plan_id
                    break
                case 2:
                    payload.new_plan_id = monthly_premium_plus_plan_id
                    break
                case 3:
                    payload.new_plan_id = "lifetime"
                    break
            } 
        }
        payload.subscription_url = ""
    } else {
        if(yearly.classList.contains("clicked")) {
            switch(index) {
                case 1:
                    payload.subscription_url = premiumYearlyURL
                    payload.new_plan_id = ""
                    break
                case 2:
                    payload.subscription_url = premiumPlusYearlyURL
                    payload.new_plan_id = ""
                    break
                case 3:
                    payload.new_plan_id = "lifetime"
                    payload.subscription_url = ""
                    break
            }
            
        } else {
            switch(index) {
                case 1:
                    payload.subscription_url = premiumMonthlyURL
                    payload.new_plan_id = ""
                    break
                case 2:
                    payload.subscription_url = premiumPlusMonthlyURL
                    payload.new_plan_id = ""
                    break
                case 3:
                    payload.new_plan_id = "lifetime"
                    payload.subscription_url = ""
                    break
            } 
        }
    }

    console.log(payload)
    for (const key in payload) {
        if (Object.hasOwnProperty.call(object, key)) {
            console.log(payload[key])
            
        }
    }
    return [payload,  index]
}

const showAlert = alert => {
    alert.style.transition = 'all .3s ease'
    alert.style.top = '60px'
    alert.style.opacity = '1'
    alert.style.visibility = 'visible'

    return new Promise(resolve => {
        setTimeout(() => {
            alert.style.transition = 'all .5s linear'
            alert.style.top = '0'
            alert.style.opacity = '0'
            alert.style.visibility = 'hidden'
            resolve()
        }, 1000)
    })
}

const initcBtnsNotCurrent = () => {
    cBtnsNotCurrent = Array.from(cBtns).filter(el => !el.classList.contains("current"))
    document.querySelector('.wrapper').addEventListener("click", event => {
        const targetedElement = event.target
        if(targetedElement.tagName.toLowerCase() === 'a' && targetedElement.parentElement.classList.contains('c-btn') && !targetedElement.parentElement.classList.contains('current')) {
            fn(targetedElement.parentElement)
        } else if(cBtnsNotCurrent.includes(targetedElement)) {
            fn(targetedElement)
        }
    })
}

// Main
fetch('https://timescrapy.com/get-user-info')
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        userPlan = data.plan.toLowerCase()
        avatar.innerHTML = `<img src="${data.profile_pic}">`

        if(userPlan === plansTolowerCase[1] || userPlan === plansTolowerCase[2]) {
            isMonthly = data.plan_is_monthly
            if(!data.plan_is_monthly) { 
                bcgEffect.style.left = "calc(100% - 134px)"
                premiumPrice.style.right = "-25px"
                premiumPlusPrice.style.right = "-25px"
                premiumPrice.innerHTML = premiumText2
                premiumPlusPrice.innerHTML = premiumText2
                yearly.classList.add("clicked", "ON1")
                monthly.classList.add("OFF1")
            }
        }
        addCurrentButton()
        initcBtnsNotCurrent()
    })
    .catch(err => console.log(err))


yearly.addEventListener("click", () => {
    if(!yearly.classList.contains("clicked")) {
        yearly.classList.add("on1")
        monthly.classList.add("off1")
        bcgEffect.style.left = "calc(100% - 134px)"
        premiumPrice.style.right = "-25px"
        premiumPlusPrice.style.right = "-25px"

        setTimeout(() => {
            yearly.classList.remove("on1")
            yearly.classList.remove("OFF1")
            yearly.classList.add("ON1")

            monthly.classList.remove("off1")
            monthly.classList.add("OFF1")
        }, latency)

        premiumPrice.style.opacity = "0"
        premiumPlusPrice.style.opacity = "0"

        setTimeout(() => {
            if(isMonthly !== null) {
                if(isMonthly) removeCurrentButton()
                else addCurrentButton()
            }
            premiumPrice.innerHTML = premiumText2
            premiumPlusPrice.innerHTML = premiumText2
            premiumPrice.style.opacity = "1"
            premiumPlusPrice.style.opacity = "1"
        }, latency / 2)

        yearly.classList.add("clicked")
    } 
})

monthly.addEventListener("click", () => {
    if(yearly.classList.contains("clicked")) {
        yearly.classList.add("off1")
        monthly.classList.add("on1")
        bcgEffect.style.left = "calc(0% + 2px)"  
        premiumPrice.style.right = "0px"
        premiumPlusPrice.style.right = "0px"  

        setTimeout(() => {
            yearly.classList.remove("off1")
            yearly.classList.remove("ON1")
            yearly.classList.add("OFF1")

            monthly.classList.remove("on1")
            monthly.classList.remove("OFF1")
            monthly.classList.add("ON1")
        }, latency)

        premiumPrice.style.opacity = "0"
        premiumPlusPrice.style.opacity = "0"

        setTimeout(() => {
            if(isMonthly !== null) {
                if(isMonthly) addCurrentButton()
                else removeCurrentButton()
            }
            premiumPrice.innerHTML = premiumText1
            premiumPlusPrice.innerHTML = premiumText1
            premiumPrice.style.opacity = "1"
            premiumPlusPrice.style.opacity = "1"
        }, latency / 2)

        yearly.classList.remove("clicked")
    }
})