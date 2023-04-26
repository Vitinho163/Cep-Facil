const toggleDarkModeCheckbox = document.getElementById("toggle-dark-mode");
const htmlElement = document.documentElement;

// Verifica se há um valor armazenado no localStorage
const cachedTheme = localStorage.getItem("theme");
if (cachedTheme) {
  htmlElement.setAttribute("data-theme", cachedTheme);
  if (cachedTheme === "dark") {
    toggleDarkModeCheckbox.checked = true;
  }
}

toggleDarkModeCheckbox.addEventListener("click", function () {
  if (htmlElement.getAttribute("data-theme") === "light") {
    htmlElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); // Armazena o valor no localStorage
    toggleDarkModeCheckbox.checked = true;
  } else {
    htmlElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); // Armazena o valor no localStorage
    toggleDarkModeCheckbox.checked = false;
  }
});


const buscarBtn = document.querySelector('#buscar');
const originalBtnText = buscarBtn.textContent;

buscarBtn.addEventListener('click', () => {
  const cepInput = document.querySelector('#cep-input').value;
  buscarBtn.setAttribute('aria-busy', true);
  buscarCEP(cepInput);
});

function buscarCEP(cep) {
  buscarBtn.disabled = true;
  buscarBtn.textContent = 'Por favor aguarde...';
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.erro) {
        // CEP inválido, exibe mensagem de erro
        alert("CEP inválido, por favor verifique e tente novamente.");
      } else {
        // CEP válido, atualiza informações na página
        const cepElement = document.querySelector("#cep");
        const logradouroElement = document.querySelector("#logradouro");
        const complementoElement = document.querySelector("#complemento");
        const bairroElement = document.querySelector("#bairro");
        const localidadeElement = document.querySelector("#localidade");
        const ufElement = document.querySelector("#uf");

        cepElement.textContent = data.cep;
        logradouroElement.textContent = data.logradouro;
        complementoElement.textContent = data.complemento ? data.complemento : "Indefinido";
        bairroElement.textContent = data.bairro ? data.bairro : "Indefinido";
        localidadeElement.textContent = data.localidade ? data.localidade : "Indefinido";
        ufElement.textContent = data.uf ? data.uf : "Indefinido";
      }
    })
    .catch(error => {
      console.error(error);
      alert("Ocorreu um erro ao buscar o CEP, por favor tente novamente mais tarde.");
    })
    .finally(() => {
      buscarBtn.removeAttribute('aria-busy');
      buscarBtn.disabled = false;
      buscarBtn.textContent = originalBtnText;
    });
}