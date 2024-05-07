// Variables
const btn = document.getElementById("btn"),
      passInp = document.getElementById("password"),
      emailInp = document.getElementById("email"),
      errDivPass = document.querySelector('.p'),
      errDivEmail = document.querySelector('.e'),
      alertText = document.querySelector('.alert__text'),
      alert = document.querySelector('.alert'),
      g = document.querySelector('.g')

const URL = "https://timescrapy.com/login";

// Functions
async function sha256Hash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedString = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');

    return hashedString;
}

function post(url, body) {
    return fetch(url, {
        method: "POST", 
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    })
}

const fn = () => new Promise(resolve => {
    setTimeout(() => {
        alertText.style.transition = 'all .5s linear'
        alert.style.top = '0'
        alert.style.opacity = '0'
        alert.style.visibility = 'hidden'
        resolve()
    }, 3500)
})

// Main
g.addEventListener("click", e => e.preventDefault())

btn.addEventListener("click", async (event) => {
    event.preventDefault()

    const hashedPass = await sha256Hash(passInp.value),
          email = emailInp.value

    
    const body = {
        'email': email,
        'password': hashedPass
    }

    post(URL, body)
        .then(response => {
            console.log(response)
            if(response.ok) {
                return response.json()  
            }
            return response.json().then(errData => {
                alertText.innerText = errData.message
                alert.style.transition = 'all .3s ease'
                alert.style.top = '60px'
                alert.style.opacity = '1'
                alert.style.visibility = 'visible'
                fn()

            })
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
})