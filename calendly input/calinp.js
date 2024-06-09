const btn = document.querySelector('.btn'),
      inp = document.querySelector('.inp'),
      alertText = document.querySelector('.alert__text'),
      alert = document.querySelector('.alert')

const fn = () => new Promise(resolve => {
    setTimeout(() => {
        alertText.style.transition = 'all .5s linear'
        alert.style.top = '0'
        alert.style.opacity = '0'
        alert.style.visibility = 'hidden'
        resolve()
    }, 3500)
})

btn.addEventListener("click", e => {
    e.preventDefault()
    const body = new Object()
    body.calendly_url = inp.value
    fetch("https://timescrapy.com/calendly-form", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if(!response.ok) return response.json().then(data => {
                alertText.innerText = data.message
                alert.style.transition = 'all .3s ease'
                alert.style.top = '60px'
                alert.style.opacity = '1'
                alert.style.visibility = 'visible'
                fn()
            })
        })
        .catch(err => console.log(err))
})