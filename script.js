// Get the necessary elements from the DOM
const viewPassword = document.getElementById("view-password");
const lengthInput = document.getElementById("length-password");
const uppercaseTextInput = document.getElementById("uppercase-text");
const lowercaseTextInput = document.getElementById("lowercase-text");
const numbersInput = document.getElementById("numbers");
const symbolsInput = document.getElementById("symbols");
const btnGenerate = document.getElementById("btn-generate");
const iconCopy = document.getElementById("btn-copy");
const message = document.getElementById("message");

// Define arrays for numbers, symbols, lowercase and uppercase letters
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["!", "@", "#", "$", "%", "&", "_"];
const lowercaseText = "abcdefghijklmnopqrstuvwxyz";
const uppercaseText = lowercaseText.toUpperCase();

const filter_numbers = () => {
  lengthInput.value = lengthInput.value.split('').filter(item => parseInt(item) in numbers).join('');
  return lengthInput;
} 

// Generate password when btnGenerate is clicked
btnGenerate.addEventListener("click", () => {
  if ((lengthInput.value == 0 || lengthInput.value == "" || lengthInput.value > 1000) && (uppercaseTextInput.checked == false && lowercaseTextInput.checked == false && numbersInput.checked == false && symbolsInput.checked == false)) {
    message.style.display = "flex";
    message.textContent = "Indique a quantidade de caracteres entre 1 e 1000 e selecione pelo menos um tipo de caractere! ";
    message.className = "message active";
    setTimeout(() => {      
      message.className = "message";
    }, 5000);
    viewPassword.value = '';
  } else if (lengthInput.value == 0 || lengthInput.value == "" || lengthInput.value > 1000) {
    message.style.display = "flex";
    message.textContent = "Indique a quantidade de caracteres entre 1 e 1000!";
    message.className = "message active";
    setTimeout(() => {
      message.className = "message";
    }, 2000);
    viewPassword.value = '';
  } else if (uppercaseTextInput.checked == false && lowercaseTextInput.checked == false && numbersInput.checked == false && symbolsInput.checked == false) {
    message.style.display = "flex";
    message.textContent = "Selecione pelo menos um tipo de caractere!";
    message.className = "message active";
    setTimeout(() => {
      message.className = "message";
    }, 2000);    
    viewPassword.value = '';
  } else {
    generatePassword(
      uppercaseTextInput.checked,
      lowercaseTextInput.checked,
      numbersInput.checked,
      symbolsInput.checked,
      lengthInput.value
    );
  }
});

// Function to generate a password based on the selected criteria
const generatePassword = (
  hasUpperCase,
  hasLowercase,
  hasNumbers,
  hasSymbols,
  length
) => {
  // Create an array containing the selected character sets
  let newArray = '';
  if (hasUpperCase) newArray += uppercaseText;
  if (hasLowercase) newArray += lowercaseText;
  if (hasNumbers) newArray += numbers.join('');
  if (hasSymbols) newArray += symbols.join('');

  // If no character sets are selected, return
  if (newArray.length === 0) return;

  let password = "";

  // Generate the password by randomly selecting characters from the newArray
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * newArray.length);
    password += newArray[randomIndex];
  }

  // Set the generated password as the value of viewPassword
  viewPassword.value = password;
};

// Copy the generated password when iconCopy is clicked
iconCopy.addEventListener("click", () => {
  if (viewPassword.value !== "") {
    viewPassword.select();
    viewPassword.setSelectionRange(0, 99999);

    document.execCommand("copy");

    // Display the "Senha copiada!" alert for 2 seconds
    message.style.display = "initial";
    message.textContent = "Senha copiada!";
    message.className = "message active";
    setTimeout(() => {
      message.className = "message";
    }, 3000);
  } else {
    // Display the error alert for 2 seconds
    message.style.display = "flex";
    message.textContent = "Erro ao copiar, pois não foi gerada nenhuma senha!";
    message.className = "message active";
    setTimeout(() => {
      message.className = "message";
    }, 3000);
  }
});
