import matplotlib.pyplot as plt
from collections import Counter

# Функция для чтения текста из файла
def read_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return file.read()

# Функция для построения гистограммы
def plot_histogram(text):
    # Подсчёт частот символов
    frequency = Counter(text)
    
    # Убираем символы, которые не нужно отображать (например, пробелы и переносы строк)
    ignore_chars = [' ', '\n', '\t', '\r']
    for char in ignore_chars:
        if char in frequency:
            del frequency[char]
    
    # Сортируем символы по частоте
    sorted_frequency = sorted(frequency.items(), key=lambda x: x[1], reverse=True)
    
    # Разделяем символы и их частоты для построения графика
    chars = [item[0] for item in sorted_frequency]
    counts = [item[1] for item in sorted_frequency]
    
    # Построение гистограммы
    plt.figure(figsize=(12, 6))
    plt.bar(chars, counts, color='blue')
    plt.xlabel('Символы')
    plt.ylabel('Частота')
    plt.title('Гистограмма частот появления символов в тексте')
    plt.xticks(rotation=45)  # Поворот подписей оси X для удобства
    plt.show()

# Основная функция
def main():
    filename = '.\path\encrypted.txt'  # Укажите путь к файлу с текстом
    text = read_file(filename)
    plot_histogram(text)

# Запуск программы
if __name__ == '__main__':
    main()