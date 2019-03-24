let topics = [`Batman`, `Wonder Woman`, `Captain America`, `Iron Man`, `Spiderman`, `Blue Beetle`, `Black Widow`, `Superman`]
let limit,
  hero
let favorites = JSON.parse(sessionStorage.getItem('favorites')) || []

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

const addMoreBtnMaker = hero => {
  document.querySelector('#addMoreBtn').innerHTML = ''
  let moreBtn = document.createElement('button')
  moreBtn.setAttribute('data-hero', hero)
  moreBtn.id = 'addMore'
  moreBtn.textContent = 'Add 10 more?'
  document.querySelector('#addMoreBtn').append(moreBtn)
}

const makeGifs = (data, hero) => {
  document.querySelector('#gifs').innerHTML = ''

  addMoreBtnMaker(hero)

  data.forEach((gif, i) => {
    let gifImage = document.createElement('span')
    let paused = gif.images.fixed_width_still.url
    let playing = gif.images.fixed_width.url
    let rating = gif.rating
    let alt = gif.slug

    gifImage.innerHTML = `
    <img src="${paused}" alt="${alt}" class="herogif" data-paused="${paused}" data-playing="${playing}" data-rating="${rating}" data-myswitch="false">
    <p>Rating: ${rating}</p>
    <button id="favorite" data-alt="${alt}" data-paused="${paused}" data-playing="${playing}" data-rating="${rating}" data-myswitch="false">Favorite</button>
    `

    document.querySelector('#gifs').append(gifImage)
  })
}

const makeFavGif = target => {

  let favGif = document.createElement('span')
  let alt = target.dataset.alt
  let paused = target.dataset.paused
  let playing = target.dataset.playing
  let rating = target.dataset.rating
  let myswitch = target.dataset.myswitch

  favGif.innerHTML = `<img src="${paused}" alt="${alt}" class="herogif" data-paused="${paused}" data-playing="${playing}" data-myswitch="false">
  <p>Rating: ${rating}</p>
  `
document.querySelector('#favorited').append(favGif)
}

const gifBtnGet = target => {
  let hero = target.dataset.hero
  fetch(`http://api.giphy.com/v1/gifs/search?q=${hero}&api_key=jijztlWGO1rAYgw6Q05K9Y3x1XJcXo5T&limit=${limit}`)
    .then(r => r.json())
    .then(r => {
      makeGifs(r.data, hero)
      limit = (r.data).length
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
    limit = 10
    gifBtnGet(target)
  } else if (target.className === 'herogif') {
    gifPlayer(target)
  } else if (target.id === 'addMore') {
    limit += 10
    gifBtnGet(target)
  } else if (target.id === 'favorite') {
    makeFavGif(target)
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
