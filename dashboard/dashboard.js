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
];


const options = document.getElementsByClassName("option"),
      durationSpan = document.getElementById("duration"),
      triangle = document.getElementById("triangle"),
      previousBtn = document.getElementById("previous"),
      nextBtn = document.getElementById("next"),
      monthYearSpan = document.getElementById("month-year"),
      weekdaySpan = document.getElementById("Weekday"),
      monthSpan = document.getElementById("Month"),
      dateSpan = document.getElementById("Date"),
      calendarBody = document.querySelector(".calendar__body");
  
const weekdaysTemplate = `<div class="calendar__item weekday">mon</div>
<div class="calendar__item weekday">tue</div>
<div class="calendar__item weekday">wed</div>
<div class="calendar__item weekday">thu</div>
<div class="calendar__item weekday">fri</div>
<div class="calendar__item weekday">sat</div>
<div class="calendar__item weekday">sun</div>`;

let currentDate = new Date();
    // currentYear = currentDate.getFullYear(),
    // currentMonth = currentDate.getMonth(),
    // currentDay = currentDate.getDate(),
    // currentWeekDay = currentDate.getDay(),
    // lastDayInTheCurrentMonth_date = new Date(currentYear, currentMonth + 1, 0);


let dayDivs = document.getElementsByClassName("filled");

// Here I should change the logic of time__item.onclick, but I will do it with fetch
const timeItems = document.getElementsByClassName("time__item");

// Functions
function initCalendar() {
    let daysDivsTag = weekdaysTemplate,
        dayCounter = 1,
        i = 0;

    const t = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(),
          firstIndex = t === 0 ? 6 : t - 1,
          lastIndex = firstIndex + new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    while(i<=41) {
        if(i < firstIndex || i > lastIndex - 1) {
            daysDivsTag += `<div class="calendar__item day"></div>`;
        } else {
            daysDivsTag += `<div class="calendar__item day filled${dayCounter === currentDate.getDate() ? " current" : ""}">${dayCounter}</div>`;
            dayCounter++;
        }
        i++;
    }
    

    monthYearSpan.innerText = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    calendarBody.innerHTML = daysDivsTag;

    dayDivs = document.getElementsByClassName("filled");
    // clicking on a day div
    for(const dayDiv of dayDivs) {
        dayDiv.addEventListener("click", event => {
            for(const t of dayDivs) {
                t.classList.remove("current");
            }
            dayDiv.classList.add("current");
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayDiv.innerText);
            changeWeekdayDate();
        });
    }

    changeWeekdayDate();
}

function changeWeekdayDate() {
    weekdaySpan.innerText = weekDays[currentDate.getDay()];
    monthSpan.innerText = months[currentDate.getMonth()];
    dateSpan.innerText = `${currentDate.getDate()}`;
}

// Main
initCalendar()

// editing meeting time
for(const option of options) {
    option.addEventListener("click", event => {
        for(const o of options) {
            if(o.classList.contains("active")) {
                o.classList.remove("active");
            }
        }
        option.classList.add("active");
        let t = option.innerText;
        durationSpan.innerText = t.slice(0, 2);
    });
}

triangle.addEventListener("click", event => {
    optionsContainer.classList.toggle("closed");
    optionsContainer.classList.toggle("opened");
});

// changing months in the calendar
nextBtn.addEventListener("click", event => {
    currentDate = currentDate.getMonth() === 11 ? new Date(currentDate.getFullYear() + 1, 0) : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    initCalendar();
});


previousBtn.addEventListener("click", event => {
    currentDate = currentDate.getMonth() === 0 ? new Date(currentDate.getFullYear() - 1, 11) : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    initCalendar();
});

// timeItem.onclick
for(const timeItem of timeItems) {
    timeItem.addEventListener("click", event => {
        for (const t of timeItems) {
            t.classList.remove("toAdd");
        }
    timeItem.classList.add("toAdd");
    });
}