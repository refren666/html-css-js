function visitLink(path) {
    let counter = parseInt(localStorage.getItem(path)) || 0;
    localStorage.setItem(path, JSON.stringify(++counter));
}

function viewResults() {
    const content = document.getElementById('content');
    const ul = document.createElement('ul');
    for (const page in localStorage) {
        if (localStorage.hasOwnProperty(page)) {
            const li = document.createElement('li');
            li.innerText = `You visited ${page} ${localStorage[page]} times`;
            ul.appendChild(li);
        }
    }
    content.appendChild(ul);
    localStorage.clear();
}


// ul.setAttribute('id', 'ul-el');
// const ulEl = !!document.getElementById('ul-el');
// if (!ulEl) {...test...} це якщо б з сховища не очищалось