let topics = JSON.parse(localStorage.getItem('topics')) || [`Batman`, `Captain America`, `Robin`, `Wonder Woman`, `Iron Man`, `Spiderman`, `Blue Beetle`, `Black Widow`, `Superman`, `Captain Marvel`]
let favorites = JSON.parse(sessionStorage.getItem('favorites')) || []
let limit,
  hero

const buttonMaker = _ => {
  document.querySelector('#buttons').innerHTML = ''
  for (let i = 0; i < topics.length; i++) {
    let gifBtn = document.createElement('button')
    gifBtn.textContent = topics[i]
    gifBtn.className = 'gifBtn teal darken-2 white-text btn-small'
    gifBtn.setAttribute('data-hero', topics[i])
    document.querySelector('#buttons').append(gifBtn)
  }
}

const addMoreBtnMaker = hero => {
  document.querySelector('#addMoreBtn').innerHTML = ''
  let moreBtn = document.createElement('button')
  moreBtn.setAttribute('data-hero', hero)
  moreBtn.id = 'addMore'
  moreBtn.className = 'teal darken-2 white-text btn-small'
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
    <button class="teal darken-2 white-text btn-small" id="favorite" data-alt="${alt}" data-paused="${paused}" data-playing="${playing}" data-rating="${rating}" data-myswitch="false">Favorite  <i class="tiny material-icons">favorite</i></button>
    `

    document.querySelector('#gifs').append(gifImage)
  })
}

const makeFavGifs = _ => {
  document.querySelector('#favorited').innerHTML = ''
  favorites.forEach(item => {
    let favGif = document.createElement('span')
    favGif.innerHTML = item
    document.querySelector('#favorited').append(favGif)
  })
}

const gifBtnGet = target => {
  let hero = target.dataset.hero
  fetch(`https://api.giphy.com/v1/gifs/search?q=${hero}&api_key=jijztlWGO1rAYgw6Q05K9Y3x1XJcXo5T&limit=${limit}`)
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
  if (target.classList.contains('gifBtn')) {
    limit = 10
    gifBtnGet(target)
  } else if (target.className === 'herogif') {
    gifPlayer(target)
  } else if (target.id === 'addMore') {
    limit += 10
    gifBtnGet(target)
  } else if (target.id === 'favorite') {
    // I know this section is pretty much the messiest thing to ever be written in JS, but it works for what I want to do and I'm okay with coming back to it later once I understand sessionStorage better to clean it up
    let alt = target.dataset.alt
    let paused = target.dataset.paused
    let playing = target.dataset.playing
    let rating = target.dataset.rating
    let myswitch = target.dataset.myswitch

    let newFavGif = `<img src="${paused}" alt="${alt}" class="herogif" data-paused="${paused}" data-playing="${playing}" data-myswitch=${myswitch}>
    <p>Rating: ${rating}</p>
    `

    favorites.push(newFavGif)
    sessionStorage.setItem('favorites', JSON.stringify(favorites))
    makeFavGifs()
  }
})

document.querySelector('#submit').addEventListener('click', e => {
  e.preventDefault()

  if (document.querySelector('#heroInput').value === '') {
    document.querySelector('#noBlanks').style.display = 'inline'
    document.querySelector('#noBlanks').innerHTML = `
    Please type a valid entry. Need help? Go <a href="https://en.wikipedia.org/wiki/Superhero" alt="superheros wiki atricle">here</a>.`
  } else {
    document.querySelector('#noBlanks').style.display = 'none'
    let newHero = document.querySelector('#heroInput').value
    topics.push(newHero)
    localStorage.setItem('topics', JSON.stringify(topics))
    buttonMaker()
    document.querySelector('#heroInput').value = ''
  }
})

buttonMaker()
makeFavGifs()
