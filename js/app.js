const formulario = document.querySelector("#formulario");
listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

const limpiarHTML = () => {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
};

const mostrarError = (error) => {
  const mensajeError = document.createElement("p");
  contenido = document.querySelector("#contenido");

  mensajeError.textContent = error;
  mensajeError.classList.add("error");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
};

const sincronizarStorage = () => {
  localStorage.setItem("tweets", JSON.stringify(tweets));
};

const borrarTweet = (id) => {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
};

const crearHTML = () => {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const li = document.createElement("li");
      btn = document.createElement("a");

      li.innerText = tweet.tweet;
      btn.classList.add("borrar-tweet");
      btn.innerText = "X";

      btn.addEventListener("click", () => {
        borrarTweet(tweet.id);
      });

      li.appendChild(btn);
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
};

const agregaTweet = (e) => {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;
  tweetObj = {
    id: Date.now(),
    tweet,
  };

  if (tweet === "") {
    mostrarError("El mensaje no puede estar vacio");
    return;
  }

  tweets = [...tweets, tweetObj];
  console.log(tweets);

  crearHTML();

  formulario.reset();
};

const eventListeners = () => {
  formulario.addEventListener("submit", agregaTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) ?? [];
  });
};

eventListeners();
