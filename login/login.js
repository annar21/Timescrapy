// https://timescrapy.com:5443/login
// const URL = 'https://timescrapy.com:5443/login'


// const urlInp = document.getElementById("url"),
//       passInp = document.getElementById("password"),
//       btn = document.getElementById("btn"),
//       errSpan = document.getElementById("err")

// function PostRequest(URL, body) {
//     const headers = {
//         'Content-Type': 'application/json'
//     }
//     return fetch(URL, {
//         body: JSON.stringify(body),
//         method: 'POST',
//         headers: headers,
//         mode: "no-cors"
//     }).then(response => {
//         console.log(response)
//         return response.json()
//     })
// }

// btn.addEventListener("click", event => {
//     event.preventDefault()

//     const url = urlInp.value,
//           password = passInp.value;

//     urlInp.value = ''
//     passInp.value = ''
    
//     const body = {
//         'url': url,
//         'password': password
//     }
//     PostRequest(URL, body)
//         .then(data => {
//             if(!data.err) {
//                 errSpan.innerText = data.err
//             }
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })


// function PostRequest(URL, body) {
//     const headers = {
//         'Content-Type': 'application/json'
//     };

//     return fetch(URL, {
//         body: JSON.stringify(body),
//         method: 'POST',
//         headers: headers,
//         mode: "no-cors"
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Response:', data);
//         // Process response data as needed
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

// const URL ='https://timescrapy.com:5443/login'
// const body = {
//     // Your JSON data here
//     key1: 'value1',
//     key2: 'value2'
// };

// btn.addEventListener("click", event => {
//     event.preventDefault()
//     PostRequest(URL, body);
// })