// Get the necessary elements from the DOM
const viewPassword = document.getElementById("viewPassword");
const lengthInput = document.getElementById("lengthPassword");
const infoLength = document.getElementById("infoLength");
const uppercaseTextInput = document.getElementById("uppercaseText");
const lowercaseTextInput = document.getElementById("lowercaseText");
const numbersInput = document.getElementById("numbers");
const symbolsInput = document.getElementById("symbols");
const btnGenerate = document.getElementById("btnGenerate");
const iconCopy = document.getElementById("iconCopy");
const alert = document.getElementById("alert");

// Define arrays for numbers, symbols, lowercase and uppercase letters
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["!", "@", "#", "$", "%", "&", "_"];
const text = Array.from(Array(26)).map((_, i) => i + 97);
const lowercaseText = text.map((item) => String.fromCharCode(item));
const uppercaseText = lowercaseText.map((item) => item.toUpperCase());

// Set the initial value of infoLength
infoLength.innerHTML = lengthInput.value;

// Update infoLength when lengthInput value changes
lengthInput.addEventListener("change", () => {
  infoLength.innerHTML = lengthInput.value;
});

// Generate password when btnGenerate is clicked
btnGenerate.addEventListener("click", () => {
  if (lengthInput.value == "") {
    alert.style.display = "flex";
    alert.textContent = "Indique a quantidade de caracteres!";
    setTimeout(() => {
      alert.style.display = "none";
    }, 2000);
  }
  
  generatePassword(
    uppercaseTextInput.checked,
    lowercaseTextInput.checked,
    numbersInput.checked,
    symbolsInput.checked,
    lengthInput.value
  );
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
  const newArray = [
    ...(hasNumbers ? numbers : []),
    ...(hasSymbols ? symbols : []),
    ...(hasLowercase ? lowercaseText : []),
    ...(hasUpperCase ? uppercaseText : []),
  ];

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
    alert.style.display = "flex";
    alert.textContent = "Senha copiada!";
    setTimeout(() => {
      alert.style.display = "none";
    }, 2000);
  } else {
    // Display the error alert for 2 seconds
    alert.style.display = "flex";
    alert.textContent = "Erro ao copiar, pois não foi gerada nenhuma senha!";
    setTimeout(() => {
      alert.style.display = "none";
    }, 2000);
  }
});
