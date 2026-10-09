document.addEventListener("DOMContentLoaded", () => {
    // ЗАВДАННЯ 1: Валідація за регулярними виразами
    const form = document.getElementById("val-form");
    const rules = [
        {
            id: "fullname",
            label: "ПІБ",
            regex: /^[А-ЯІЇЄҐа-яіїєґA-Za-z'-]+ [А-ЯІЇЄҐA-Z]\.[А-ЯІЇЄҐA-Z]\.$/
        },
        {
            id: "phone",
            label: "Телефон",
            regex: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/
        },
        {
            id: "idcard",
            label: "ID-картка",
            regex: /^[А-ЯІЇЄҐA-Z]{2} №\d{6}$/
        },
        {
            id: "dob",
            label: "Дата народження",
            regex: /^\d{2}\.\d{2}\.\d{4}$/
        },
        {
            id: "email",
            label: "e-mail",
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/
        }
    ];
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isFormValid = true;
        const validValues = {};
        rules.forEach(rule => {
            const input = document.getElementById(rule.id);
            const val = input.value.trim();
            const group = input.closest(".form-group");

            if (!rule.regex.test(val)) {
                group.classList.add("invalid");
                isFormValid = false;
            } else {
                group.classList.remove("invalid");
                validValues[rule.label] = val;
            }
        });
        // Виведення результатів в окремому вікні при успіху
        if (isFormValid) {
            const outputWin = window.open("", "_blank", "width=420,height=380");
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="uk">
                <head>
                    <meta charset="UTF-8">
                    <title>Введені дані</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; background: #f4f6f8; color: #222; }
                        h3 { color: #048f8f; border-bottom: 2px solid #048f8f; padding-bottom: 6px; }
                        ul { list-style: none; padding: 0; margin-top: 15px; }
                        li { padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-size: 14px; }
                        strong { color: #048f8f; }
                    </style>
                </head>
                <body>
                    <h3>Введені дані успішно підтверджено:</h3>
                    <ul>
                        ${Object.entries(validValues).map(([k, v]) => `<li><strong>${k}:</strong>${v}</li>`).join('')}
                    </ul>
                </body>
                </html>
            `;
            outputWin.document.write(htmlContent);
            outputWin.document.close();
        }
    });
    // ЗАВДАННЯ 2: Інтерактивна таблиця 6x6
    // Варіант клітинки: 134 mod 36 = 26
    // Варіант dblClick: (134 mod 10) + 1 = 5 (усі крім обраної)
    const table = document.getElementById("matrix-table");
    const colorPicker = document.getElementById("color-picker");
    const TARGET_CELL_NUM = 26;
    let counter = 1;
    // Допоміжна функція генерації випадкового кольору (HEX)
    function getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    }
    //  побудова таблиці 6х6
    for (let r = 0; r < 6; r++) {
        const row = document.createElement("tr");
        for (let c = 0; c < 6; c++) {
            const cell = document.createElement("td");
            cell.textContent = counter;
            cell.dataset.num = counter;
            // Призначення обробників лише на клітинку (№26)
            if (counter === TARGET_CELL_NUM) {              
                // 1. Hover: зміна кольору на випадковий
                cell.addEventListener("mouseover", () => {
                    cell.style.backgroundColor = getRandomColor();
                });
                // 2. Click: зміна кольору на обраний з палітри
                cell.addEventListener("click", () => {
                    cell.style.backgroundColor = colorPicker.value;
                });
                // 3. dblClick: зміна кольору всіх клітинок таблиці, крім обраної (Варіант №5)
                cell.addEventListener("dblclick", () => {
                    const allCells = table.querySelectorAll("td");
                    const selectedColor = colorPicker.value;

                    allCells.forEach(td => {
                        if (parseInt(td.dataset.num) !== TARGET_CELL_NUM) {
                            td.style.backgroundColor = selectedColor;
                        }
                    });
                });
            }
            row.appendChild(cell);
            counter++;
        }
        table.appendChild(row);
    }
});