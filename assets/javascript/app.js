let topics = [`Batman`, `Wonder Woman`, `Captain America`, `Iron Man`, `Spiderman`, `Blue Beetle`, `Black Widow`, `Superman`]
let mySwitch = false

const buttonMaker = _ => {
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
    gifImage.setAttribute('data-myswitch', mySwitch)
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
    mySwitch = !mySwitch
    if (target.dataset.myswitch === 'false') {
      target.src = target.dataset.playing
      target.dataset.myswitch = mySwitch
      console.log(target.dataset.myswitch)
      console.log('testing')
    } else {
      target.src = target.dataset.paused
      console.log(target.dataset.myswitch)
      console.log('other testing')
    }
  }
})

// if you click a gif, it plays

// if you put a name in
// make button

// fetch(`http://api.giphy.com/v1/gifs/search?q=${animal}&api_key=jijztlWGO1rAYgw6Q05K9Y3x1XJcXo5T&limit=10`)
//   .then(r => r.json())
//   .then(({ data }) => {
//     data.forEach(gif => {
//       document.querySelector('#gifDiv').innerHTML = ''
//       const url = gif.images.fixed_height.url
//       let gifElem = document.createElement('img')
//       gifElem.setAttribute('src', url)
//       document.querySelector('#gifDiv').append(gifElem)
//     })
//   })
//   .catch(e => console.log(e))

// let toggle = false

// document.addEventListener('click', ({ target }) => {
//   if (target.className === 'animal') {
//     let { animal } = target.dataset
//     fetch(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${animal}&rating=g`)
//       .then(r => r.json())
//       .then(r => {
//         let { url: still } = r.data.images.fixed_height_still
//         let { url: animated } = r.data.images.fixed_height
//         document.querySelector('#gifDiv').innerHTML = `
//           <img id="gif" src="${still}" alt="${animal}" data-still="${still}" data-animated="${animated}">`
//       })
//       .catch(e => console.error(e))
//   } else if (target.id === 'gif') {
//     toggle = !toggle
//     let { still, animated } = target.dataset
//     if (toggle) {
//       target.setAttribute('src', animated)
//     } else {
//       target.setAttribute('src', still)
//     }
//   }
// })

buttonMaker()
