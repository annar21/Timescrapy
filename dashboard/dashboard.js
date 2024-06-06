// todos - users quantity, create, 
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

const options = document.querySelector('.options'),
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
      formWrapper = document.querySelector('.form-wrapper'),
      avatarBig = document.querySelector('.avatar-big'),
      avatarSmall = document.querySelector('.avatar'),
      profileName = document.querySelector('.username'),
      timeList = document.querySelector('.time__list'),
      guestsList = document.getElementById("list"),
      alertText = document.querySelector('.alert__text'),
      alert = document.querySelector('.alert'),
      dotsContainer = document.querySelector('.three-dots__container'),
      currentQuantitySpan = document.getElementById("currentQuantitySpan"),
      maxQuantitySpan = document.getElementById("maxQuantitySpan"),
      donateBtn = document.querySelector('.btn'),
      blackBG = document.getElementById("blackBG"),
      alertSuccess = document.querySelector('.alertS'),
      alertSuccessText = document.querySelector('.alertS__text')
      
      
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

const calendlyForm = `<div class="search-form__container form__for__calendly" id="formContainer">
                        <div class="i"><input type="text" id="c-url" placeholder="Enter Calendly URL or Nickname"></div>
                        <div class="i"><input type="email" id="email" placeholder="Enter Email"></div>
                        <div class="i"><button id="add-btn-form" class="blue">Add</button></div>
                      </div>`,
      hubspotForm = `<div class="search-form__container form__for__hubspot" id="formContainer">
                        <div class="i"><input type="text" id="h-url" placeholder="Enter Hubspot URL or Nickname"></div>
                        <div class="i h"><button id="add-btn-form" class="orange">Add</button></div>
                      </div>`

let currentDate = new Date()

let usersMaxQuantity, usersCurrentQuantity = 0
let userPlan

let offsetX, offsetY, isDragging = false

const freeDays = new Map(),
      users = {calendly: [], hubspot: []},
      meetingsDurations = new Array()

// users[service] -> [el] -> el = {email: slug}

let selectedDurationIndex = 0   

const monthsInfo = {}, // -> monthsInfo[months[new Date().getMonth()]].isLoaded -> true:false
      t = new Date()
for(let i = 1; i <= 3; i ++) {
    monthsInfo[months[t.getMonth()]] = {
        isLoaded: false
    }
    t.setMonth(new Date().getMonth() + i)
}

const names = new Array()
// Functions
const guestTemplate = (name, imgUrl, service, slug) => `<div class="guest" id="${guestId(service, slug)}"><div class="guest__avatar"><div class="remove-user">REMOVE</div><img src="${imgUrl}"></div><div class="guest__name">${name}</div></div>`,
      avatarImage = imgUrl => `<img src="${imgUrl}" alt="profile picture">`,
      timeItemTemplate = time => `<div class="time__item"><div class="time">${time}</div><div class="create-btn">Create</div></div>`

const guestId = (service, slug) => `${service}-${toLowercaseArray(getUsers(service)).indexOf(slug.toLowerCase())}`

const changeUsersCurrentQuantity = bool => {
    if(bool) usersCurrentQuantity++
    else usersCurrentQuantity--
    currentQuantitySpan.innerText = usersCurrentQuantity
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

function initCalendar() {
    weekdaySpan.innerText = ''
    monthSpan.innerText = ''
    dateSpan.innerText = ''
    timeList.innerHTML = ''

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
            daysDivsTag += `<div class="calendar__item day filled">${dayCounter}</div>`
            dayCounter++
        }
        i++
    }    

    monthYearSpan.innerText = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    calendarBody.innerHTML = daysDivsTag

    const dayDivs = document.getElementsByClassName("filled")
    // clicking on a day div
    for(const dayDiv of dayDivs) {  
        dayDiv.addEventListener("click", () => {
            if(dayDiv.classList.contains("current")) {
                for(const t of dayDivs) {
                    t.classList.remove("clicked")
                }
                dayDiv.classList.add("clicked")
                currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayDiv.innerText)
                let elementForTimeList = ''
                freeDays.get(convertDateForServer(currentDate)).forEach(el => elementForTimeList += timeItemTemplate(getHoursFromIso(el)))
                timeList.innerHTML = elementForTimeList
                const timeItems = document.getElementsByClassName("time__item")
                for(const timeItem of timeItems) {
                    timeItem.addEventListener("click", () => {
                        for(const t of timeItems) {
                            t.classList.remove("toAdd")
                        }
                    timeItem.classList.add("toAdd")
                    })
                }
                const createButons = document.getElementsByClassName("create-btn")
                Array.from(createButons).forEach(el => el.addEventListener("click", event => {
                    event.preventDefault()
                    const payload = new Object()
                    payload.names = names
                    payload.guests = []
                    users.calendly.forEach(el => payload.guests.push(...Object.keys(el)))
                    users.hubspot.forEach(el => payload.guests.push(...Object.keys(el)))
                    console.log(payload.guests)
                    payload.duration = meetingsDurations[selectedDurationIndex]
                    const time = el.parentElement.querySelector('.time').innerText
                    const hours = time.split(":")[0]
                    const minutes = time.split(":")[1]
                    payload.event_start_date = new Date(currentDate.getFullYear(),currentDate.getMonth() ,currentDate.getDate(), hours, minutes).toISOString()
                    blackBG.classList.remove("hide")
                    schedule(payload)
                        .then(response => response.json())
                        .then(data => {
                            blackBG.classList.add("hide")
                            console.log(data)
                            if(data.success) {
                                alertSuccessText.innerText = data.message
                                showAlert(alertSuccess)
                            } else {
                                alertText.innerText = data.message
                                showAlert(alert)
                            }
                        })
                        .catch(err => console.log(err))
                }))
                changeWeekdayDate()
            }
        })
    }

    const freeDaysKeysArray = Array.from(freeDays.keys())
    for(const dayDiv of dayDivs) {
        if(freeDaysKeysArray.includes(convertDateForServer(new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(dayDiv.innerText))))) {
            dayDiv.classList.add("current")
        } 
    }
}

function changeWeekdayDate() {
    weekdaySpan.innerText = `${weekDays[currentDate.getDay()]}, `
    monthSpan.innerText = months[currentDate.getMonth()]
    dateSpan.innerText = `${currentDate.getDate()}`
}

const convertDateForServer = date => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

// https://timescrapy.com/load-calendar
const loadCalendar = (startDate, endDate) => fetch('https://timescrapy.com/load-calendar', {
    body: JSON.stringify({
        'calendly_urls': getUsers('calendly'),
        'hubspot_urls': getUsers('hubspot'),
        'start_date': convertDateForServer(startDate),
        'end_date': convertDateForServer(endDate),
        'duration': meetingsDurations[selectedDurationIndex]
        }),
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
})

const getUserInfo = () => fetch('https://timescrapy.com/get-user-info')

function startDrag(e) {
    isDragging = true
    offsetX = e.clientX - formWrapper.getBoundingClientRect().left
    offsetY = e.clientY - formWrapper.getBoundingClientRect().top

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', stopDrag)
}

function drag(e) {
    if(!isDragging) return
    formWrapper.style.left = e.clientX - offsetX + 'px'
    formWrapper.style.top = e.clientY - offsetY + 'px'
}

function stopDrag(e) {
    isDragging = false
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', stopDrag)
}

const toLowercaseArray = array => array.map(el => el.toLowerCase())

function addUser(e) {
    e.preventDefault()
    if(usersCurrentQuantity !== usersMaxQuantity) {

        if(!calendlyBtn.classList.contains("off")) {
            if(!toLowercaseArray(getUsers("calendly")).includes(calendlyInp.value.toLowerCase())) {
                fetch('https://timescrapy.com/add-calendly-profile', {
                method: 'POST',
                body: JSON.stringify({
                    'calendly_url': calendlyInp.value,
                    'email': emailInp.value 
                   }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(response => {
                    if(response.ok) return response.json()
                    return response.json().then(err => {
                        alertText.innerText = err.message
                        alert.style.transition = 'all .3s ease'
                        alert.style.top = '60px'
                        alert.style.opacity = '1'
                        alert.style.visibility = 'visible'
                        showError()
                    })
                })
                .then(data => {
                    const obj = {}
                    obj[data.email] = data.slug
                    users.calendly.push(obj)
                    names.push(data.username)
                    guestsList.insertAdjacentHTML("beforeend", guestTemplate(data.username, data.profile_pic, "calendly", data.slug))
                    console.log(data)
                    
                    dotsContainer.classList.remove("hidden")
                    loadCalendar(currentDate, new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0))
                        .then(response => response.json())
                        .then(data => {
                            console.log(freeDays)
                            clearFreeDays()
                            console.log(freeDays)
                            // console.log(data)
                            addFreeDays(data)
                            console.log(freeDays)
                            dotsContainer.classList.add("hidden")
                            initCalendar()
                        })
                        .catch(err => console.log(err))
                    const el = document.getElementById(guestId("calendly", data.slug))
                    changeUsersCurrentQuantity(true)
                    el.querySelector('.remove-user').addEventListener("click", () => removeUser(el))
                })
            } else {
                alertText.innerText = 'User Already Added'
                alert.style.transition = 'all .3s ease'
                alert.style.top = '60px'
                alert.style.opacity = '1'
                alert.style.visibility = 'visible'
                showError()
            }
        } else {
            if(!toLowercaseArray(getUsers("hubspot")).includes(calendlyInp.value.toLowerCase())) {
                fetch('https://timescrapy.com/add-hubspot-profile', {
                method: 'POST',
                body: JSON.stringify({
                    'hubspot_url': hubspotInp.value
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(response => {
                    if(response.ok) return response.json()
                    return response.json().then(err => {
                        alertText.innerText = err.message
                        alert.style.transition = 'all .3s ease'
                        alert.style.top = '60px'
                        alert.style.opacity = '1'
                        alert.style.visibility = 'visible'
                        showError()
                    })
                })
                .then(data => {
                    console.log(data)
                    const obj = {}
                    obj[data.email] = data.slug
                    users.hubspot.push(obj)
                    names.push(data.username)
                    guestsList.insertAdjacentHTML("beforeend", guestTemplate(data.username, '../imgs/hubspot_logo.png', "hubspot", data.slug))
    
                    dotsContainer.classList.remove("hidden")
                    loadCalendar(currentDate, new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0))
                        .then(response => response.json())
                        .then(data => {
                            console.log(freeDays)
                            clearFreeDays()
                            console.log(freeDays)
                            // console.log(data)
                            addFreeDays(data)
                            console.log(freeDays)
                            dotsContainer.classList.add("hidden")
                            initCalendar()
                        })
                        .catch(err => console.log(err))
                    const el = document.getElementById(guestId("hubspot", data.slug))
                    changeUsersCurrentQuantity(true)
                    el.querySelector('.remove-user').addEventListener("click", () => removeUser(el))
                })
            } else {
                alertText.innerText = 'User Already Added'
                alert.style.transition = 'all .3s ease'
                alert.style.top = '60px'
                alert.style.opacity = '1'
                alert.style.visibility = 'visible'
                showError()
            }
        } 
    } else {
        if(userPlan === 'basic') alertText.innerText = 'Premium Subscription Required'
        else alertText.innerText = 'Maximum User Limit Reached'

        alert.style.transition = 'all .3s ease'
        alert.style.top = '60px'
        alert.style.opacity = '1'
        alert.style.visibility = 'visible'
        showError()
    }
} // /addUser

function clearFreeDays() {
    freeDays.clear()
    for(const key in monthsInfo) {
        if(Object.hasOwnProperty.call(monthsInfo, key)) {
            monthsInfo[key].isLoaded = false   
        }
    }
}

// `${service}-${toLowercaseArray(getUsers(service)).indexOf(slug.toLowerCase())}`
function removeUser(userHTMLElement) {
    const id = userHTMLElement.id,
          service = id.split('-')[0],
          index = id.split('-')[1]
    
    if(service == "calendly") users.calendly = users.calendly.filter(el => el != users.calendly[index])
    else users.hubspot = users.hubspot.filter(el => el != users.hubspot[index]) 
    userHTMLElement.remove()

    changeUsersCurrentQuantity(false)

    dotsContainer.classList.remove("hidden")
    loadCalendar(currentDate, new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0))
        .then(response => response.json()) 
        .then(data => {
            addFreeDays(data)
            initCalendar()
            dotsContainer.classList.add("hidden")
        })
}

const getUsers = service => users[service].map(el => Object.values(el)[0])

const getDateFromIso = isoString => isoString.split("T")[0]
const getHoursFromIso = isoString => isoString.split('T')[1].split(':')[0] + ':' + isoString.split('T')[1].split(':')[1]

function addFreeDays(data) {
    data.forEach(isoString => {
        const date = getDateFromIso(isoString)
        if(freeDays.has(date)) {
            freeDays.get(date).push(isoString)
        } else {
            freeDays.set(date, [isoString])
        }
    })

    monthsInfo[months[currentDate.getMonth()]].isLoaded = true
}

const showError = () => new Promise(resolve => {
    setTimeout(() => {
        alertText.style.transition = 'all .5s linear'
        alert.style.top = '0'
        alert.style.opacity = '0'
        alert.style.visibility = 'hidden'
        resolve()
    }, 3500)
})

function loadCalendarForButtons() {
    if(!monthsInfo[months[currentDate.getMonth()]].isLoaded) {
        dotsContainer.classList.remove("hidden")
        loadCalendar(currentDate, new Date(currentDate.getFullYear(), parseInt(currentDate.getMonth()) + 1, 0))
            .then(response => response.json())
            .then(data => {
                addFreeDays(data)
                initCalendar()
                dotsContainer.classList.add("hidden")
            })
            .catch(err => console.log(err))
    }
}

const schedule = payload => fetch('https://timescrapy.com/schedule', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(payload)
})
// Main
initCalendar()
getUserInfo()
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const obj = {}
        obj[data.email] = data.username
        users.calendly.push(obj)
        userPlan = data.plan.toLowerCase()
        usersMaxQuantity = userPlan === 'basic' ? 2:10
        currentQuantitySpan.innerText = 0
        maxQuantitySpan.innerText = usersMaxQuantity

        avatarBig.innerHTML = avatarImage(data.profile_pic)
        avatarSmall.innerHTML = avatarImage(data.profile_pic)
        profileName.innerText = data.username
        meetingsDurations.push(...data.durations)
        for(let i = 0; i < data.durations.length; i++) {
            options.innerHTML += `<div class="option${i === 0 ? ' active':''}">${data.durations[i]} min</div>`
        }
        durationSpan.innerText = data.meeting_names[0]
        const OptionsCollection = document.getElementsByClassName('option')
        for(let i = 0; i < OptionsCollection.length; i++) {
            OptionsCollection[i].addEventListener("click", () => {
                for(const t of OptionsCollection) {
                    if(t.classList.contains('active')) {
                        t.classList.remove('active')
                    }
                }
            OptionsCollection[i].classList.add('active')
            durationSpan.innerText = data.meeting_names[i]
            selectedDurationIndex = i
            
            clearFreeDays()
            dotsContainer.classList.remove("hidden")
            loadCalendar(currentDate, new Date(currentDate.getFullYear(), parseInt(currentDate.getMonth()) + 1, 0))
                .then(response => response.json())
                .then(d => {
                    addFreeDays(d)
                    dotsContainer.classList.add("hidden")
                    initCalendar()
                })
                .catch(err => console.log(err))
            })
        }
        loadCalendar(new Date(), new Date(new Date().getFullYear(), parseInt(new Date().getMonth()) + 1, 0))
            .then(response => response.json())
            .then(d => {
                addFreeDays(d)
                dotsContainer.classList.add("hidden")
                initCalendar()
            })
            .catch(err => console.log(err))
        }) // /getUserInfo().then().then()
    .catch(err => console.log(err))


triangle.addEventListener("click", () => {
    optionsContainer.classList.toggle("closed")
    optionsContainer.classList.toggle("opened")
})

// changing months in the calendar
nextBtn.addEventListener("click", () => {
    if(currentDate.getMonth() !== new Date().getMonth() + 2) {
        currentDate = currentDate.getMonth() === 11 ? new Date(currentDate.getFullYear() + 1, 0) : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        // logic for loading calendar 
        if(!dotsContainer.classList.contains("hidden")) dotsContainer.classList.add("hidden")
        loadCalendarForButtons()
        initCalendar()

        if(currentDate.getMonth() === new Date().getMonth() + 1) {
            previousBtn.classList.remove("disabled")
        } else if(currentDate.getMonth() === new Date().getMonth() + 2) {
            nextBtn.classList.add("disabled")
        }
    }   
})


previousBtn.addEventListener("click", () => {
    if(currentDate.getMonth() !== new Date().getMonth()) {
        currentDate = currentDate.getMonth() === 0 ? new Date(currentDate.getFullYear() - 1, 11) : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        if(!dotsContainer.classList.contains("hidden")) dotsContainer.classList.add("hidden")
        loadCalendarForButtons()
        initCalendar()

        if(currentDate.getMonth() === new Date().getMonth() + 1) {
            nextBtn.classList.remove("disabled")
        } else if(currentDate.getMonth() === new Date().getMonth()) {
            previousBtn.classList.add("disabled")
        }
    } 
})

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
        emailInp = document.getElementById('email')
        addUserBtn.addEventListener("click", addUser)
    }
})

hubspotBtn.addEventListener("click", event => {
    event.preventDefault()
    if(hubspotBtn.classList.contains('off')) {
        hubspotBtn.classList.remove('off')
        calendlyBtn.classList.add('off')
        if(window.innerWidth > 1700) backgroundEffect.style.left = '99px'
        else backgroundEffect.style.left = '85px'
        form.innerHTML = hubspotForm
        addUserBtn = document.getElementById("add-btn-form")
        hubspotInp = document.getElementById('h-url')
        addUserBtn.addEventListener("click", addUser)
    }
})

formWrapper.addEventListener("mousedown", startDrag)

// add user
addUserBtn.addEventListener("click", addUser)

donateBtn.addEventListener("click", event => {
    event.preventDefault()
    fetch('https://timescrapy.com/donate')
})
