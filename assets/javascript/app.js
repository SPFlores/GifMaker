let topics = [`Batman`, `Wonder Woman`, `Captain America`, `Iron Man`, `Spiderman`, `Blue Beetle`, `Black Widow`, `Superman`]

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

  data.forEach((gif, i) => {
    let gifImage = document.createElement('img')
    let paused = gif.images.fixed_width_still.url
    let playing = gif.images.fixed_width.url
    let rating = gif.rating
    gifImage.src = paused
    gifImage.className = 'herogif'
    gifImage.setAttribute('data-paused', paused)
    gifImage.setAttribute('data-playing', playing)
    gifImage.setAttribute('data-rating', rating)
    gifImage.setAttribute('data-myswitch', false)
    document.querySelector('#gifs').appendChild(gifImage)
  })
}

document.addEventListener('click', ({ target }) => {
  if (target.className === 'gifBtn') {
    let hero = target.dataset.hero
    let limit = 3
    fetch(`http://api.giphy.com/v1/gifs/search?q=${hero}&api_key=jijztlWGO1rAYgw6Q05K9Y3x1XJcXo5T&limit=${limit}`)
      .then(r => r.json())
      .then(r => {
        makeGifs(r.data)
      })
      .catch(e => console.log(e))
  } else if (target.className === 'herogif') {
    if (target.dataset.myswitch === 'false') {
      target.src = target.dataset.playing
      target.dataset.myswitch = true
    } else {
      target.src = target.dataset.paused
      target.dataset.myswitch = false
    }
  }
})

document.querySelector('#submit').addEventListener('click', e => {
  e.preventDefault()

  let newHero = document.querySelector('#heroInput').value
  topics.push(newHero)
  buttonMaker()
  document.querySelector('#heroInput').value = ''
})
// if you put a name in
// make button

buttonMaker()
