 const viewPassword = document.getElementById("viewPassword");
    const lengthInput = document.getElementById("lengthPassword");
    const infoLength = document.getElementById("infoLength");
    const uppercaseTextInput = document.getElementById("uppercaseText");
    const lowercaseTextInput = document.getElementById("lowercaseText");
    const numbersInput = document.getElementById("numbers");
    const symbolsInput = document.getElementById("symbols");
    const btnGenerate = document.getElementById("btnGenerate");

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const symbols = ["!", "@", "#", "$", "%", "&", "_"];
    const text = Array.from(Array(26)).map((_, i) => i + 97);
    const lowercaseText = text.map((item) => String.fromCharCode(item));
    const uppercaseText = lowercaseText.map((item) => item.toUpperCase());

    infoLength.innerHTML = lengthInput.value;

    lengthInput.addEventListener("change", () => {
      infoLength.innerHTML = lengthInput.value;
    });

    btnGenerate.addEventListener("click", () => {
      generatePassword(
        uppercaseTextInput.checked,
        lowercaseTextInput.checked,
        numbersInput.checked,
        symbolsInput.checked,
        lengthInput.value
      );
    });

    const generatePassword = (
      hasUpperCase,
      hasLowercase,
      hasNumbers,
      hasSymbols,
      length
    ) => {
      const newArray = [
        ...(hasNumbers ? numbers : []),
        ...(hasSymbols ? symbols : []),
        ...(hasLowercase ? lowercaseText : []),
        ...(hasUpperCase ? uppercaseText : []),
      ];

      if (newArray.length === 0) return;

      let password = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * newArray.length);
        password += newArray[randomIndex];
      }

      viewPassword.value = password;
    };
    
    const iconCopy = document.getElementById("iconCopy");
      const alert = document.getElementById("alert");

      iconCopy.addEventListener("click", () => {
        if (viewPassword.value !== "") {
          viewPassword.select();
          viewPassword.setSelectionRange(0, 99999);

          document.execCommand("copy");
          alert.style.display = "flex";
          alert.textContent = "Senha copiada!";

          setTimeout(() => {
            alert.style.display = "none";
          }, 2000); // 2 segundos
        } else {
          alert.style.display = "flex";
          alert.textContent = "Erro ao copiar, pois não foi gerada nenhuma senha!";

          setTimeout(() => {
            alert.style.display = "none";
          }, 2000); // 2 segundos
        }
      });
