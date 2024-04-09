// https://timescrapy.com:5443/login
// const URL = 'https://timescrapy.com:5443/login'
// hashed pass, email

// Variables
const URL = 'https://timescrapy.com:5443/login';

const urlInp = document.getElementById("url"),
      passInp = document.getElementById("password"),
      btn = document.getElementById("btn"),
      errSpan = document.getElementById("err")

// Main  

async function sha256Hash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedString = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');

    return hashedString;
}

function PostRequest(URL, body) {
    const headers = {
        'Content-Type': 'application/json'
    };

    return fetch(URL, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: headers,
        mode: "no-cors"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response:', data);
        // Process response data as needed
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

btn.addEventListener("click", event => {
    event.preventDefault()

    let email = emailInp.value,
        password = ''

    sha256Hash(passInp.value)
        .then(hashedPass => {
            password = hashedPass
        })
        .catch(err => {
            console.log(err)
        })

    const body = {
        'password': password,
        'email': email
    };
    PostRequest(URL, body);
})