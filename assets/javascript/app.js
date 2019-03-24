let topics = [`Batman`, `Wonder Woman`, `Captain America`, `Iron Man`, `Spiderman`, `Blue Beetle`, `Black Widow`, `Superman`]
let limit = 10
let hero

const buttonMaker = _ => {
  document.querySelector('#buttons').innerHTML = ''
  for (let i = 0; i < topics.length; i++) {
    let gifBtn = document.createElement('button')
    gifBtn.textContent = topics[i]
    gifBtn.className = 'gifBtn'
    gifBtn.setAttribute('data-hero', topics[i])
    document.querySelector('#buttons').append(gifBtn)
  }
}

const makeGifs = data => {
  document.querySelector('#gifs').innerHTML = ''
  
  let moreBtn = document.createElement('button')
  moreBtn.textContent = 'Add 10 more?'

  data.forEach((gif, i) => {
    let gifImage = document.createElement('span')
    let paused = gif.images.fixed_width_still.url
    let playing = gif.images.fixed_width.url
    let rating = gif.rating
    let alt = gif.slug
    
    gifImage.innerHTML = `
    <img src="${paused}" alt="${alt}" class="herogif" data-paused="${paused}" data-playing="${playing}" data-rating="${rating}" data-myswitch="false">
    <h5>Rating: ${rating}</h5>
    `

    document.querySelector('#gifs').append(gifImage)
    document.querySelector('#addMoreBtn').append(moreBtn)
  })
}

const gifBtnGet = target => {
  let hero = target.dataset.hero

  fetch(`http://api.giphy.com/v1/gifs/search?q=${hero}&api_key=jijztlWGO1rAYgw6Q05K9Y3x1XJcXo5T&limit=${limit}`)
    .then(r => r.json())
    .then(r => {
      makeGifs(r.data)
    })
    .catch(e => console.log(e))
}

const gifPlayer = target => {
  if (target.dataset.myswitch === 'false') {
    target.src = target.dataset.playing
    target.dataset.myswitch = true
  } else {
    target.src = target.dataset.paused
    target.dataset.myswitch = false
  }
}

document.addEventListener('click', ({ target }) => {
  if (target.className === 'gifBtn') {
    gifBtnGet(target)
  } else if (target.className === 'herogif') {
    gifPlayer(target)
  }
})

document.querySelector('#submit').addEventListener('click', e => {
  e.preventDefault()

  let newHero = document.querySelector('#heroInput').value
  topics.push(newHero)
  buttonMaker()
  document.querySelector('#heroInput').value = ''
})

buttonMaker()
