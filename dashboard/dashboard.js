// [[date:int, weekday:int]]

// Variables
const months = [
    "January",
    "February", 
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
],
weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]


const options = document.getElementsByClassName("option"),
      durationSpan = document.getElementById("duration"),
      triangle = document.getElementById("triangle"),
      optionsContainer = document.getElementById("optionsContainer"),
      previousBtn = document.getElementById("previous"),
      nextBtn = document.getElementById("next"),
      monthYearSpan = document.getElementById("month-year"),
      weekdaySpan = document.getElementById("Weekday"),
      monthSpan = document.getElementById("Month"),
      dateSpan = document.getElementById("Date"),
      calendarBody = document.querySelector(".calendar__body"),
      addGuestsBtn = document.getElementById("add-btn"),
      f = document.querySelector('.f'),
      form = document.querySelector('.search-form'),
      closeBtn = document.querySelector('.close'),
      hubspotBtn = document.querySelector('.toHubspot'),
      calendlyBtn = document.querySelector('.toCalendly'),
      backgroundEffect = document.querySelector('.background-effect'),
      formWrapper = document.querySelector('.form-wrapper')
      
let addUserBtn = document.getElementById("add-btn-form"),
    calendlyInp = document.getElementById('c-url'),
    emailInp = document.getElementById('email'),
    hubspotInp = document.getElementById('h-url')


  
const weekdaysTemplate = `<div class="calendar__item weekday">mon</div>
                          <div class="calendar__item weekday">tue</div>
                          <div class="calendar__item weekday">wed</div>
                          <div class="calendar__item weekday">thu</div>
                          <div class="calendar__item weekday">fri</div>
                          <div class="calendar__item weekday">sat</div>
                          <div class="calendar__item weekday">sun</div>`


const calendlyForm = `<div class="search-form__container" id="formContainer">
                        <div class="i"><input type="text" id="c-url" placeholder="Enter Calendly URL or Nickname"></div>
                        <div class="i"><input type="email" id="email" placeholder="Enter Email"></div>
                        <div class="i"><button id="add-btn-form" class="blue">Add</button></div>
                      </div>`,
      hubspotForm = `<div class="search-form__container" id="formContainer">
                        <div class="i"><input type="text" id="h-url" placeholder="Enter Hubspot URL or Nickname"></div>
                        <div class="i h"><button id="add-btn-form" class="orange">Add</button></div>
                      </div>`

let currentDate = new Date()

let offsetX, offsetY, isDragging = false
// Here I should change the logic of time__item.onclick, but I will do it with fetch
const timeItems = document.getElementsByClassName("time__item")


// Functions
const guestTemplate = (name, imgUrl) => `<div class="guest"><div class="guest__avatar"><img src="${imgUrl}"></div><div class="guest__name">${name}</div></div>`

function initCalendar() {
    // getDays()
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(err => console.log(err))

    let daysDivsTag = weekdaysTemplate,
        dayCounter = 1,
        i = 0

    const t = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(),
          firstIndex = t === 0 ? 6 : t - 1,
          lastIndex = firstIndex + new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    
    while(i<=41) {
        if(i < firstIndex || i > lastIndex - 1) {
            daysDivsTag += `<div class="calendar__item day"></div>`
        } else {
            daysDivsTag += `<div class="calendar__item day filled${dayCounter === currentDate.getDate() ? " current" : ""}">${dayCounter}</div>`
            dayCounter++
        }
        i++
    }
    

    monthYearSpan.innerText = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    calendarBody.innerHTML = daysDivsTag

    dayDivs = document.getElementsByClassName("filled")
    // clicking on a day div
    for(const dayDiv of dayDivs) {
        dayDiv.addEventListener("click", event => {
            for(const t of dayDivs) {
                t.classList.remove("current")
            }
            dayDiv.classList.add("current")
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayDiv.innerText)
            changeWeekdayDate()
        })
    }

    changeWeekdayDate()
}

function changeWeekdayDate() {
    weekdaySpan.innerText = weekDays[currentDate.getDay()]
    monthSpan.innerText = months[currentDate.getMonth()]
    dateSpan.innerText = `${currentDate.getDate()}`
}

// https://timescrapy.com/load-calendar
// const getDays = (calendly_urls=['aregakdev'], hubspot_urls=[], year=currentDate.getFullYear(), month=currentDate.getMonth()) => fetch('https://timescrapy.com/load-calendar', {
//     body: JSON.stringify({
//         'calendly_urls': calendly_urls,
//         'hubspot_urls': hubspot_urls,
//         'year': year,
//         'month': month
//         }),
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     method: 'POST'
// })

function startDrag(e) {
    // e.preventDefault()
    isDragging = true
    offsetX = e.clientX - formWrapper.getBoundingClientRect().left
    offsetY = e.clientY - formWrapper.getBoundingClientRect().top

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', stopDrag)
}

function drag(e) {
    // e.preventDefault()
    if(!isDragging) return
    formWrapper.style.left = e.clientX - offsetX + 'px'
    formWrapper.style.top = e.clientY - offsetY + 'px'
}

function stopDrag(e) {
    // e.preventDefault()
    isDragging = false
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', stopDrag)
}

function addUser(e) {
    e.preventDefault()
    if(!calendlyBtn.classList.contains("off")) {
        fetch('https://timescrapy.com/add-calendly-profile', {
            method: 'POST',
            body: JSON.stringify({
                'calendly_url': calendlyInp.value,
                'email': emailInp.value
               })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
}

// Main
initCalendar()

// editing meeting time
for(const option of options) {
    option.addEventListener("click", event => {
        for(const o of options) {
            if(o.classList.contains("active")) {
                o.classList.remove("active")
            }
        }
        option.classList.add("active")
        let t = option.innerText
        durationSpan.innerText = t.slice(0, 2)
    })
}   

triangle.addEventListener("click", event => {
    optionsContainer.classList.toggle("closed")
    optionsContainer.classList.toggle("opened")
})

// changing months in the calendar
nextBtn.addEventListener("click", event => {
    currentDate = currentDate.getMonth() === 11 ? new Date(currentDate.getFullYear() + 1, 0) : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    initCalendar()
})


previousBtn.addEventListener("click", event => {
    currentDate = currentDate.getMonth() === 0 ? new Date(currentDate.getFullYear() - 1, 11) : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    initCalendar()
})

// timeItem.onclick
for(const timeItem of timeItems) {
    timeItem.addEventListener("click", event => {
        for(const t of timeItems) {
            t.classList.remove("toAdd")
        }
    timeItem.classList.add("toAdd")
    })
}

// add guests, change service(calendly, hubspot), drag form
addGuestsBtn.addEventListener("click", event => {
    event.preventDefault()
    f.style.visibility = 'visible'
    f.style.opacity = '1'
})

closeBtn.addEventListener("click", event => {
    event.preventDefault()
    f.style.visibility = 'hidden'
    f.style.opacity = '0'
})

calendlyBtn.addEventListener("click", event => {
    event.preventDefault()
    if(calendlyBtn.classList.contains('off')) {
        calendlyBtn.classList.remove('off')
        hubspotBtn.classList.add('off')
        backgroundEffect.style.left = '4px'
        form.innerHTML = calendlyForm
        addUserBtn = document.getElementById("add-btn-form")
        calendlyInp = document.getElementById('c-url')
        addUserBtn.addEventListener("click", addUser)
    }
})

hubspotBtn.addEventListener("click", event => {
    event.preventDefault()
    if(hubspotBtn.classList.contains('off')) {
        hubspotBtn.classList.remove('off')
        calendlyBtn.classList.add('off')
        backgroundEffect.style.left = '99px'
        form.innerHTML = hubspotForm
        addUserBtn = document.getElementById("add-btn-form")
        hubspotInp = document.getElementById('h-url')
        addUserBtn.addEventListener("click", addUser)
    }
})

formWrapper.addEventListener("mousedown", startDrag)


// add user
addUserBtn.addEventListener("click", addUser)