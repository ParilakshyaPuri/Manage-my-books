const name = document.getElementById('name');
const author = document.getElementById('author');
const type = document.querySelectorAll('#radio-box');
const table = document.getElementById('table-body');
const button = document.getElementById('addbook');
const library = document.getElementById('library-form');
const clear = document.getElementById('clear');

clear.addEventListener('click', () => {
    localStorage.clear();
    table.remove();
})

class Library {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        type.forEach((e) => {
            if (e.checked) {
                this.type = e.value;
            }
        })
    }


    warn = () => {
        const msg = document.getElementById('message');
        msg.innerHTML =
            `
        <div class="alert alert-warning" role="alert">
            Invalid behaviour ❌
        </div>
        `

        setTimeout(() => {
            msg.innerHTML = ""
        }, 3000);
    }

    push = () => {
        const msg = document.getElementById('message');
        msg.innerHTML =
            `
        <div class="alert alert-success alert-dismissible fade show" role="alert" class="btn-close" data-bs-dismiss="alert">
            Book added ✅
        </div>
        `

        setTimeout(() => {
            msg.innerHTML = ""
        }, 3000);
    }

    validate = () => {
        if ((this.name).length < 3 || (this.author).length < 3) {
            this.warn();
            return false;
        }

        let flag = 1;
        type.forEach((e) => {
            if (e.checked) {
                flag = 0;
            }
        })

        if (flag) {
            this.warn();
            return false;
        } else {
            this.push();
            return true;
        }
    }

    store = () => {
        let store = localStorage.getItem('store');
        let books;
        if (store == null) {
            books = [];
        } else {
            books = JSON.parse(store);
        }

        books.push([this.name, this.author, this.type]);
        localStorage.setItem('store', JSON.stringify(books));
    }
}

function deleteBook(book) {

}

button.addEventListener('click', function () {
    book = new Library(name.value, author.value, type);
    if (book.validate()) {
        book.store();
        show();

        const del = document.querySelectorAll('#del');
        del.forEach((e) => {
            e.addEventListener('click', (element, index) => {
                e.remove();
                let store = localStorage.getItem('store');
                let temp = JSON.parse(store);
                temp.splice(index, 1);
                localStorage.setItem('store', JSON.stringify(temp));
                // console.log('delete this bitch')
            })
        })


    } else {
        console.log('error')
    }
})

let show = () => {
    let store = localStorage.getItem('store');
    let books = JSON.parse(store);
    let html = '';
    books.forEach((e) => {
        html = `
            <tr id="del">
                <td>${e[0]}</td>
                <td>${e[1]}</td>
                <td>${e[2]}</td>
                <td><button style="padding: 0rem 0.5rem;" class="btn btn-danger">Delete</button></td>
            </tr>
            `

    });
    table.innerHTML += html;
    library.reset();
}

// view all previous books after reloading the session
let temp = localStorage.getItem('store');
if (temp != null) {
    let store = localStorage.getItem('store');
    let books = JSON.parse(store);
    let html = '';

    books.forEach((e) => {
        html += `
            <tr id="del">
                <td>${e[0]}</td>
                <td>${e[1]}</td>
                <td>${e[2]}</td>
                <td><button style="padding: 0rem 0.5rem;" class="btn btn-danger" id="del">Delete</button></td>
            </tr>
            `

    });

    table.innerHTML = html;
    const del = document.querySelectorAll('#del');
    del.forEach((e) => {
        e.addEventListener('click', (elem, index) => {
            e.remove();
            let store = localStorage.getItem('store');
            let temp = JSON.parse(store);
            temp.splice(index, 1);
            localStorage.setItem('store', JSON.stringify(temp));
            // console.log('delete this bitch')
        })
    })
}