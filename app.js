document.addEventListener('DOMContentLoaded', () => {
  
  // Tarjetas
  const cards = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]
  // Organizamos las tarjetas dependiendo del resultado de la resta
  /* 
    > 0	sort a after b, e.g. [b, a]
    < 0	sort a before b, e.g. [a, b]
    === 0	keep original order of a and b
  */
  cards.sort(() => 0.5 - Math.random())
  
  // Cuadrícula
  const grid = document.querySelector('.grid')
  // Score
  const puntaje = document.querySelector('#result')

  let cardsChosen = [] // Nombre de tarjetas escogidas ej. fries, pizza
  let cardsChosenId = [] // Id de las tarjetas escogidas
  let cardsWon = [] // Arreglo de arreglos, contiene las cardsChosen ej [[pizza, pizza]]

  //create your board
  function createBoard() {
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement('img') // Creamos una imagen
      card.setAttribute('src', 'images/back.png') // La tarjeta tendrá la imagen de back
      card.setAttribute('data-id', i) // Se le asigna un id

      card.addEventListener('click', girarTarjeta)  // Al darle click, se llama a la función girarTarjeta

      grid.appendChild(card) // Agregamos la tarjeta a la cuadrícula
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img') // Seleccionamos a todas las tarjetas
    const id1 = cardsChosenId[0] // Id de la tarjeta 1
    const id2 = cardsChosenId[1] // Id de la tarjeta 2
    
    // 1) Se verifica si es la misma tarjeta
    if(id1 == id2) {
      // Muestra la parte de atrás de las tarjetas
      cards[id1].setAttribute('src', 'images/back.png') 
      cards[id2].setAttribute('src', 'images/back.png')
      alert('You have clicked the same image!')
    }
    // 2) Se verifica si los nombres de las tarjetas seleccionadas son iguales
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')
      // Se cambia la tarheta por una imagen blanca 
      cards[id1].setAttribute('src', 'images/white.png') 
      cards[id2].setAttribute('src', 'images/white.png')
      // La tarjeta blanca no se "volteara" al darle click
      cards[id1].removeEventListener('click', girarTarjeta)
      cards[id2].removeEventListener('click', girarTarjeta)
      cardsWon.push(cardsChosen)
    }
    // 3) No son match
    else {
      // Muestra las partes de atrás de las tarjetasa
      cards[id1].setAttribute('src', 'images/back.png')
      cards[id2].setAttribute('src', 'images/back.png')
      alert('Sorry, try again')
    }

    // Deseleccionamos las tarjetas
    cardsChosen = [] 
    cardsChosenId = []
    // Escribimos el puntaje, es igual a la cantidad de arreglos ( es decir pares de tarjetas) dentro de cardsWon
    puntaje.textContent = cardsWon.length

    // Si hemos encontrado todas las tarjetas
    if  (cardsWon.length === cards.length/2) {
      puntaje.textContent = 'Congratulations! You found them all!'
    }
  }

  // Giramos la tarjeta para conocer qué imagen tiene
  function girarTarjeta() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cards[cardId].name) // Agregamos el nombre ej. milkshake
    cardsChosenId.push(cardId) // Agregamos el id
    this.setAttribute('src', cards[cardId].img)  // Mostrar la imagen de la tarjeta, no su back
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500) // Hace una pausa de 500 milisegundos
    }
  }
  createBoard()
})
