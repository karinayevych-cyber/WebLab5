//термін, на який видається книга (днів)
const TERM = 10;

//список жанрів, з якого обирається жанр книги
let arrGenres = ["Роман", "Детектив", "Фантастика", "Поезія", "Історія", "Наукова література"];

//функція формує дату видачі як рядок дд.мм.рррр, що була days днів тому
function dateAgo(days) {
    let d = new Date();
    d.setDate(d.getDate() - days);
    let day = String(d.getDate()).padStart(2, "0");
    let month = String(d.getMonth() + 1).padStart(2, "0");
    return day + "." + month + "." + d.getFullYear();
}

let arrBooks = []; //оголос масив
//Заповн масив значеннями
arrBooks[0] = {
    Name: "Тигролови",
    Author: "Іван Багряний",
    Genre: "Роман",
    Pages: 320,
    Data: dateAgo(3)
};
arrBooks[1] = {
    Name: "Кобзар",
    Author: "Тарас Шевченко",
    Genre: "Поезія",
    Pages: 704,
    Data: dateAgo(12)
};
arrBooks[2] = {
    Name: "Вбивство в Східному експресі",
    Author: "Агата Крісті",
    Genre: "Детектив",
    Pages: 256,
    Data: dateAgo(9)
};
arrBooks[3] = {
    Name: "Дюна",
    Author: "Френк Герберт",
    Genre: "Фантастика",
    Pages: 704,
    Data: dateAgo(15)
};
arrBooks[4] = {
    Name: "Коротка історія часу",
    Author: "Стівен Гокінг",
    Genre: "Наукова література",
    Pages: 240,
    Data: dateAgo(10)
};

let html = "";

//після завантаження сторінки заповнюємо випадаючий список жанрів
window.onload = init;
function init() {
    let select = document.getElementById("genre");
    for (let i = 0; i < arrGenres.length; i++) {
        let option = document.createElement("option");
        option.value = arrGenres[i];
        option.textContent = arrGenres[i];
        select.appendChild(option);
    }
}

//функція розрахунку терміну, що залишився до повернення книги
function ras_diff_Days(text) {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    //перетворимо рядок text у дату у Європейському форматі
    let date1 = new Date(text.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
    //отримуємо різницю у датах в мілісекундах
    let timeDiff = currentDate.getTime() - date1.getTime();
    //переводимо результат з мілісекунд у дні
    let daysPassed = Math.round(timeDiff / (1000 * 3600 * 24));
    //отримуємо скільки днів залишилося до повернення
    return TERM - daysPassed;
}

//функція виведення окремого запису масиву
function vivod(item, i, array) {
    let text = item['Data'];
    let diffDays = ras_diff_Days(text);
    if (diffDays >= 0) {
        html = html + "<tr>";
    } else {
        //книга не повернена вчасно
        html = html + "<tr style='background:red;'>";
        diffDays = "Не повернено вчасно (прострочено на " + Math.abs(diffDays) + " дн.)";
    }
    //у циклі виводимо окремий запис у таблицю
    for (let key in item) {
        html = html + "<td>" + item[key] + "</td>";
    }
    html = html + "<td>" + diffDays + "</td>";
    html = html + "</tr>";
}

//функція розрахунку для всього масиву
function ras() {
    if (arrBooks.length == 0) {
        alert("Список книг пустий");
        return;
    }
    html = "<table class='b-table-rezult'>";
    html = html + "<tr><td>Назва книги</td><td>Автор</td><td>Жанр</td>" +
        "<td>Кількість сторінок</td><td>Дата видачі</td><td>Днів до повернення</td></tr>";
    arrBooks.forEach(vivod);
    html = html + "</table>";
    document.getElementById('rezult').innerHTML = html;
}

//функція додавання нової книги з перевіркою введених значень
function addBook() {
    let name = document.getElementById("name").value.trim();
    let author = document.getElementById("author").value.trim();
    let genre = document.getElementById("genre").value;
    let pages = parseInt(document.getElementById("pages").value);
    let date = document.getElementById("date").value; //формат рррр-мм-дд

    if (name == "" || author == "" || date == "") {
        alert("Заповніть усі поля");
        return;
    }
    if (isNaN(pages) || pages <= 0) {
        alert("Кількість сторінок повинна бути додатним числом");
        return;
    }
    let dataText = date.split("-").reverse().join("."); //перетворюємо у дд.мм.рррр
    if (ras_diff_Days(dataText) > TERM) {
        alert("Дата видачі не може бути пізніше за сьогоднішню");
        return;
    }
    let book = {
        Name: name,
        Author: author,
        Genre: genre,
        Pages: pages,
        Data: dataText
    };
    arrBooks.push(book);
    alert("Книгу додано");
    ras();
}
