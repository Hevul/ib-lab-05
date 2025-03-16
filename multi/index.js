const fs = require("fs");
const { performance } = require("perf_hooks"); // Импортируем модуль для измерения времени

// Функция для создания числового ключа из слова
function createKey(keyword) {
  const sorted = keyword
    .split("")
    .slice()
    .sort((a, b) => a.localeCompare(b));
  return keyword.split("").map((char) => sorted.indexOf(char) + 1);
}

// Функция для перестановки символов в блоке
function permuteBlock(block, key) {
  const result = Array(block.length).fill("");
  for (let i = 0; i < key.length; i++) {
    result[i] = block[key[i] - 1];
  }
  return result.join("");
}

// Функция для шифрования
function encrypt(message, key1, key2) {
  let encrypted = "";
  for (let i = 0; i < message.length; i += key1.length) {
    const block = message.slice(i, i + key1.length).padEnd(key1.length, " ");
    encrypted += permuteBlock(block, key1);
  }
  let finalEncrypted = "";
  for (let i = 0; i < encrypted.length; i += key2.length) {
    const block = encrypted.slice(i, i + key2.length).padEnd(key2.length, " ");
    finalEncrypted += permuteBlock(block, key2);
  }
  return finalEncrypted;
}

// Функция для расшифровки
function decrypt(encryptedMessage, key1, key2) {
  let decrypted = "";
  const reverseKey2 = key2.map((_, i) => key2.indexOf(i + 1) + 1);
  for (let i = 0; i < encryptedMessage.length; i += key2.length) {
    const block = encryptedMessage
      .slice(i, i + key2.length)
      .padEnd(key2.length, " ");
    decrypted += permuteBlock(block, reverseKey2);
  }
  let finalDecrypted = "";
  const reverseKey1 = key1.map((_, i) => key1.indexOf(i + 1) + 1);
  for (let i = 0; i < decrypted.length; i += key1.length) {
    const block = decrypted.slice(i, i + key1.length).padEnd(key1.length, " ");
    finalDecrypted += permuteBlock(block, reverseKey1);
  }
  return finalDecrypted.trim();
}

// Основная функция
function main() {
  const inputFile = "input.txt"; // Файл с исходным сообщением
  const encryptedFile = "./multi/encrypted.txt"; // Файл для зашифрованного сообщения
  const decryptedFile = "./multi/decrypted.txt"; // Файл для расшифрованного сообщения

  // Ключевые слова
  const keyword1 = "Рубін";
  const keyword2 = "Улад";

  // Создаем числовые ключи
  const key1 = createKey(keyword1);
  const key2 = createKey(keyword2);

  // Чтение исходного сообщения из файла
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      return;
    }

    const message = data.trim(); // Убираем лишние пробелы и переносы строк

    // Замер времени для шифрования
    const startEncrypt = performance.now(); // Начало замера
    const encryptedMessage = encrypt(message, key1, key2);
    const endEncrypt = performance.now(); // Конец замера
    console.log(`Время шифрования: ${(endEncrypt - startEncrypt).toFixed(3)} мс`);

    // Запись зашифрованного сообщения в файл
    fs.writeFile(encryptedFile, encryptedMessage, (err) => {
      if (err) {
        console.error("Ошибка записи зашифрованного сообщения:", err);
        return;
      }
      console.log("Зашифрованное сообщение записано в файл:", encryptedFile);
    });

    // Замер времени для расшифровки
    const startDecrypt = performance.now(); // Начало замера
    const decryptedMessage = decrypt(encryptedMessage, key1, key2);
    const endDecrypt = performance.now(); // Конец замера
    console.log(`Время расшифровки: ${(endDecrypt - startDecrypt).toFixed(3)} мс`);

    // Запись расшифрованного сообщения в файл
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
