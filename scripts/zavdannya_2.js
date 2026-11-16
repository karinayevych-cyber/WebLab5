
//перетворення списку країн на рядок, де країни розділені комою
function list_obrab() {
    //отримуємо блок div зі списком
    let block = document.getElementById("countries");
    //отримуємо всі елементи списку li
    let items = block.getElementsByTagName("li");
    if (items.length == 0) {
        alert("Список вже перетворено або він порожній");
        return;
    }
    //у циклі записуємо назви країн у масив
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push(items[i].textContent.trim());
    }
    //об'єднуємо елементи масиву в рядок через кому
    let str = arr.join(", ");
    //замінюємо список на рядок
    block.innerHTML = "<p>" + str + "</p>";
}


//після завантаження сторінки підключаємо обробник події onclick до кожної комірки
window.onload = init;
function init() {
    let table = document.getElementById("table1");
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            table.rows[i].cells[j].onclick = cell_click;
        }
    }
}

//функція, що виконується при натисканні на комірку
function cell_click() {
    let cell = this;
    //якщо в комірці вже є поле введення - нічого не робимо
    if (cell.getElementsByTagName("input").length > 0) {
        return;
    }
    let value = parseFloat(cell.innerHTML);
    //поле введення з'являється лише для від'ємних чисел
    if (value < 0) {
        cell.innerHTML = "<input type='number' value='" + value + "'>" +
            "<button class='b-button' type='button'>Зберегти</button>";
        cell.getElementsByTagName("button")[0].onclick = function () {
            save_cell(cell);
        };
    }
}

//функція збереження нового значення комірки
function save_cell(cell) {
    let newValue = parseFloat(cell.getElementsByTagName("input")[0].value);
    //перевіряємо, що введено число і воно додатне
    if (isNaN(newValue) || newValue <= 0) {
        alert("Число не збережено: потрібно ввести додатне число");
        return;
    }
    cell.innerHTML = newValue;
}
