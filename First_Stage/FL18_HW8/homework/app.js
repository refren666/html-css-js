const appRoot = document.getElementById('app-root');

// write your code here
appRoot.innerHTML = `
<div class="search__container">
    <h1>Countries Search</h1>
    <form>
        <div class="type-of-search__field">
            <p>Please choose type of search: </p>
            <div class="radio-buttons__block">
                <input type="radio" id="regionBtn" name="searchBtn" value="region">
                <label for="regionBtn">By region</label><br>

                <input type="radio" id="languageBtn" name="searchBtn" value="language">
                <label for="languageBtn">By language</label>
            </div>
        </div>
        <div class="search-query__field">
            <label for="selection">Please choose search query: </label>
                <select id="selection" name="world-part" disabled>
                    <option>Select value</option>
                </select>
        </div>
    </form>
</div>`

const selectField = document.getElementById('selection');

const regionBtn = document.getElementById('regionBtn');
const languageBtn = document.getElementById('languageBtn');
const regionsArray = externalService.getRegionsList();
const languagesArray = externalService.getLanguagesList();

const setItemList = (arr) => {
    selectField.removeAttribute('disabled');
    selectField.innerHTML = '';
    for (const item of arr) {
        const option = document.createElement('option');
        option.innerText = item;
        option.setAttribute('value', item)
        selectField.append(option);
    }
}

regionBtn.addEventListener('change', () => {
    setItemList(regionsArray);
})

languageBtn.addEventListener('change', () => {
    setItemList(languagesArray);
})

const createTable = (arr) => {
    const tableHeaders = ['Country name', 'Capital', 'World Region', 'Languages', 'Area', 'Flag'];
    while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }
    const table = document.createElement('table');
    table.setAttribute('id', 'sortable');
    const regionsTableHead = document.createElement('thead'); // Creates the table header group element
    const regionsTableHeaderRow = document.createElement('tr'); // Creates the row that will contain the headers

// Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
    tableHeaders.forEach(header => {
        const tableHeader = document.createElement('th') // Creates the current header cell during a specific iteration
        tableHeader.innerText = header;
        tableHeader.setAttribute('data-order', 'desc');
        regionsTableHeaderRow.append(tableHeader) // Appends the current header cell to the header row
    })

    regionsTableHead.append(regionsTableHeaderRow); // Appends the header row to the table header group element

    const regionsTableBody = document.createElement('tbody') // Creates the table body group element

    arr.forEach(country => {
        const countryRow = document.createElement('tr');

        const countryName = document.createElement('td');
        countryName.innerText = `${country.name}`

        const capital = document.createElement('td');
        capital.innerText = `${country.capital}`;

        const worldRegion = document.createElement('td');
        worldRegion.innerText = `${country.region}`;

        const languages = document.createElement('td');
        for (let keys in country.languages) {
            languages.innerText += country.languages[keys] + ' ';
        }

        const area = document.createElement('td');
        area.innerHTML = `${country.area}`;

        const flag = document.createElement('td');
        flag.innerHTML = `<img src='${country.flagURL}' alt='flag'>`;

        countryRow.append(countryName, capital, worldRegion, languages, area, flag);
        regionsTableBody.append(countryRow);
    })

    table.append(regionsTableHead, regionsTableBody) // Appends the table head and body group element to the table
    tableContainer.appendChild(table);
}

const tableContainer = document.createElement('div'); // 1) створюєм контейнер для таблиці
selectField.addEventListener('change', (e) => { // 2) при виборі чогось з  списку відбувається подія
    const value = e.target.value; // те, що ми нажали зберігається в змінну value
    const selectedCountriesByRegionArray = externalService.getCountryListByRegion(value); // масив з об'єктами необхідних регіонів
    const selectedCountriesByLanguageArray = externalService.getCountryListByLanguage(value); // масив з об'єктами необхідних мов

    if (regionsArray.includes(value)) { // якщо масив з регіонами включає щось з того, що ми нажали
        createTable(selectedCountriesByRegionArray); // створюєм таблицю по цьому масиву

    } else {
        createTable(selectedCountriesByLanguageArray);
    }
})

appRoot.appendChild(tableContainer)

// list of all regions
externalService.getRegionsList(); // array of regions
// list of all languages
externalService.getLanguagesList(); // array of languages
// get countries list by language
externalService.getCountryListByLanguage() // accepts language as argument and returns array of objects (countries)
// get countries list by region
externalService.getCountryListByRegion(); // accepts region and return array of objects (countries)