// Variables
const saveBtn = document.getElementById("save"),
      alert = document.querySelector(".alert")

// Functions
const fn = () => new Promise(resolve => {
    setTimeout(() => {
        alert.style.transition = 'all .5s linear'
        alert.style.top = '0'
        alert.style.opacity = '0'
        alert.style.visibility = 'hidden'
        resolve()
    }, 1000)
})

// Main
saveBtn.addEventListener("click", (event) => {
    event.preventDefault()
    alert.style.transition = 'all .3s ease'
    alert.style.top = '60px'
    alert.style.opacity = '1'
    alert.style.visibility = 'visible'

    fn()
})

