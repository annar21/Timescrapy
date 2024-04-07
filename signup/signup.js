// https://timescrapy.com:5443/signup
// {email: email, password: pass, calendly_url: url}
const btn = document.getElementById("btn"),
      urlInp = document.getElementById("url"),
      passInp = document.getElementById("password"),
      emailInp = document.getElementById("email");

const URL = "https://timescrapy.com:5443/signup";

async function sha256Hash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedString = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');

    return hashedString;
  }


  btn.addEventListener("click", event => {
    event.preventDefault();

    const url = urlInp.value,
          email= emailInp.value;
    let password = '';
    sha256Hash(passInp.value)
        .then(hashedPassword => {
            password = hashedPassword;
        })
        .catch(err => {
            console.log(err);
        });

    const body = {
        'email': email,
        'password': password,
        'calendly_url': url
    },
          headers = {
            'Content-type': 'application/json'
          }

    fetch(URL, {
        body: JSON.stringify(body),
        headers: headers,
        method: 'POST'
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error("Smth went wrong");
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

  });