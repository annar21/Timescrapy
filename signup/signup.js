// Variables
const btn = document.getElementById("btn"),
      passInp = document.getElementById("password"),
      emailInp = document.getElementById("email"),
      errDivPass = document.querySelector('.p'),
      errDivEmail = document.querySelector('.e'),
      alertText = document.querySelector('.alert__text'),
      alert = document.querySelector('.alert'),
      g = document.querySelector('.g')

const URL = "https://timescrapy.com/signup";

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

function validateData(password, email) {
    let t = true

    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        errDivEmail.innerText = 'Please enter a valid email address.'
        emailInp.classList.add('err')

        t = false
    } else {
        emailInp.classList.remove('err')
        errDivEmail.innerText = ''
    }

    if(password.length < 8) {
        errDivPass.innerText = 'Password must be at least 8 characters long.'
        passInp.classList.add('err')
        
        t = false
    } else if(!(/[a-zA-Z]/.test(password) && /\d/.test(password))) {
        errDivPass.innerText = 'Password must contain both letters and numbers.'
        passInp.classList.add('err')

        t = false
    } else {
        passInp.classList.remove('err')
        errDivPass.innerText = ''
    }

    

    return t
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
window.onload = () => window.scrollTo(0, 0)

g.addEventListener("click", e => e.preventDefault())

btn.addEventListener("click", async (event) => {
    event.preventDefault()

    const hashedPass = await sha256Hash(passInp.value),
          email = emailInp.value

    if(validateData(passInp.value, email)) {
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
                    alertText.innerText = errData.error
                    alert.style.transition = 'all .3s ease'
                    alert.style.top = '60px'
                    alert.style.opacity = '1'
                    alert.style.visibility = 'visible'
                    fn()
                })
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
})