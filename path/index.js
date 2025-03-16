const fs = require("fs");

// Функция для шифрования сообщения
function encrypt(message, columns) {
  const rows = Math.ceil(message.length / columns);
  let matrix = Array.from({ length: rows }, () => Array(columns).fill(""));

  // Заполнение матрицы по строкам
  let index = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (index < message.length) {
        matrix[i][j] = message[index];
        index++;
      } else {
        matrix[i][j] = " "; // Заполнение пробелами, если символов не хватает
      }
    }
  }

  // Считывание по столбцам
  let encryptedMessage = "";
  for (let j = 0; j < columns; j++) {
    for (let i = 0; i < rows; i++) {
      encryptedMessage += matrix[i][j];
    }
  }

  return encryptedMessage;
}

// Функция для расшифровки сообщения
function decrypt(encryptedMessage, columns) {
  const rows = Math.ceil(encryptedMessage.length / columns);
  let matrix = Array.from({ length: rows }, () => Array(columns).fill(""));

  // Заполнение матрицы по столбцам
  let index = 0;
  for (let j = 0; j < columns; j++) {
    for (let i = 0; i < rows; i++) {
      if (index < encryptedMessage.length) {
        matrix[i][j] = encryptedMessage[index];
        index++;
      } else {
        matrix[i][j] = " "; // Заполнение пробелами, если символов не хватает
      }
    }
  }

  // Считывание по строкам
  let decryptedMessage = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      decryptedMessage += matrix[i][j];
    }
  }

  return decryptedMessage.trim(); // Убираем лишние пробелы
}

// Основная функция
function main() {
  const inputFile = "input.txt"; // Файл с исходным сообщением
  const encryptedFile = "./path/encrypted.txt"; // Файл для зашифрованного сообщения
  const decryptedFile = "./path/decrypted.txt"; // Файл для расшифрованного сообщения
  const columns = 4; // Количество столбцов (размерность матрицы)

  // Чтение исходного сообщения из файла
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      return;
    }

    const message = data.trim(); // Убираем лишние пробелы и переносы строк

    // Шифрование сообщения
    const encryptedMessage = encrypt(message, columns);
    fs.writeFile(encryptedFile, encryptedMessage, (err) => {
      if (err) {
        console.error("Ошибка записи зашифрованного сообщения:", err);
        return;
      }
      console.log("Зашифрованное сообщение записано в файл:", encryptedFile);
    });

    // Расшифровка сообщения
    const decryptedMessage = decrypt(encryptedMessage, columns);
    fs.writeFile(decryptedFile, decryptedMessage, (err) => {
      if (err) {
        console.error("Ошибка записи расшифрованного сообщения:", err);
        return;
      }
      console.log("Расшифрованное сообщение записано в файл:", decryptedFile);
    });
  });
}

// Запуск программы
main();
