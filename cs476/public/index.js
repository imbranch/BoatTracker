import http from '/util/http.js';
// import scrollToTop from '/util/scrollToTop.js';

const localUrl = `${location.protocol}//${location.host}`;

// CREATE NEW FUNCTION FOR APPLY BUTTON HERE







//-----------------------------------------------------------------

function loadSearchResults(res) {
    clearSearchResults();
    const resultArea = document.getElementById("resultArea");
    res.forEach((book) => {
        let bookEntry = document.createElement('div');
        bookEntry.classList.add('bookResult');
        bookEntry.setAttribute('data-book-id', book.book_id);

        let bookTitle = document.createElement('div');
        bookTitle.classList.add('bookTitle');
        let titleText = document.createTextNode(book.title);
        bookTitle.append(titleText);
        bookEntry.append(bookTitle);

        let bookInformationContainer = document.createElement('div');
        bookInformationContainer.classList.add('bookInformationContainer')
        let bookInformation = document.createElement('div');
        let bookRating = document.createElement('div');
        let information = document.createTextNode(`${book.authors}, ${book.subject}`);
        bookInformation.append(information);
        bookRating.innerHTML = `${book.average_rating} <span>${getStars(book.average_rating)}</span>`;
        bookInformationContainer.append(bookInformation);
        bookInformationContainer.append(bookRating);
        bookEntry.append(bookInformationContainer);

        bookEntry.addEventListener('click', () => {
            loadBook(book.book_id);
        });
        resultArea.append(bookEntry);
    });
}

function clearSearchResults() {
    document.getElementById("resultArea").innerHTML = '';
}

function getSearchInput() {
    // const text = document.getElementById("searchInput").value;
    const sort = document.getElementById("sortInput").value;
    const subject = document.getElementById("subjectInput").value;
    const dateStart = document.getElementById("dateStart").value;
    const dateEnd = document.getElementById("dateEnd").value;
    // const minRating = document.getElementById("ratingInput").value;
    const available = document.getElementById("availableInput").checked ? 1 : 0;
    // const pageMin = document.getElementById("pageStart").value;
    // const pageMax = document.getElementById("pageEnd").value;

    http.getData(`${localUrl}/discover/search?text=${text}&sort=${sort}&subject=${subject}&datestart=${dateStart}&dateend=${dateEnd}&minrating=${minRating}&available=${available}&pagemin=${pageMin}&pagemax=${pageMax}`).then(response => {
        const res = JSON.parse(response);
        if (res.length > 0) {
            document.getElementById("noResult").style.display = 'none';
            document.getElementById("resultArea").style.display = 'flex';
            loadSearchResults(res);
        } else {
            clearSearchResults();
            document.getElementById("noResult").style.display = 'inline-block';
            document.getElementById("resultArea").style.display = 'none';
        }
    }).catch(() => {
        clearSearchResults();
        document.getElementById("noResult").style.display = 'inline-block';
        document.getElementById("resultArea").style.display = 'none';
    });
}

document.getElementById('filterButton').addEventListener('click', getSearchInput);



/* let user = {
    user_id: -1
}
 */
/* function getStars(num) {
    const value = Math.floor(num);
    let stars = '';
    for (let i = 0; i < value; i++) {
        stars += '&starf;'
    }
    for (let i = value; i < 5; i++) {
        stars += '&star;'
    }
    return stars;
} */

/* function loadBook(bookid) {
    http.getData(`${localUrl}/discover/book/${bookid}`).then(response => {
        const res = JSON.parse(response)
        if (res.length > 0) {
            const book = res[0];
            document.getElementById("bookModal").setAttribute('data-book-id', book.book_id);
            document.getElementById("bookModalTitle").innerHTML = `${book.title} <span id="bookModalLanguageCode">${book.language_code}</span>`;
            document.getElementById("bookModalISBN13").innerHTML = book.isbn13;
            document.getElementById("bookModalPublisherInformation").innerHTML = `Publisher: ${book.publisher}, ${book.publication_date}`;
            document.getElementById("bookModalAuthors").innerHTML = book.authors;
            document.getElementById("bookModalSubject").innerHTML = book.subject;
            document.getElementById("bookModalPages").innerHTML = `${book.num_pages} pages`;
            document.getElementById("bookModalRating").innerHTML = getStars(book.average_rating);
            document.getElementById("bookModalRatingCount").innerHTML = `${book.average_rating} from ${book.ratings_count} reviews`;
            document.getElementById("bookModalStock").innerHTML = `${book.item_count} in stock`;
            if (book.item_count > 0 && user.user_id != -1) {
                document.getElementById("bookModalCartButton").classList.add('bookModalCartButton');
                document.getElementById("bookModalCartButton").classList.remove('bookModalCartButtonInactive');
                document.getElementById("bookModalCartButton").setAttribute('data-can-click', 'true');
            } else {
                document.getElementById("bookModalCartButton").classList.remove('bookModalCartButton');
                document.getElementById("bookModalCartButton").classList.add('bookModalCartButtonInactive');
                document.getElementById("bookModalCartButton").setAttribute('data-can-click', 'false');
            }
            document.getElementById("bookModal").style.display = 'flex';
        }
    });
} */

/* function closeBookModal() {
    document.getElementById("bookModal").style.display = 'none';
    document.getElementById("bookModalCartButton").setAttribute('data-can-click', 'false');
} */




// document.getElementById('searchButton').addEventListener('click', getSearchInput);
// document.getElementById('searchInput').addEventListener('change', getSearchInput)
// document.getElementById('bookCloseButton').addEventListener('click', closeBookModal);

/* document.getElementById('bookModalCartButton').addEventListener('click', () => {
    if (document.getElementById('bookModalCartButton').getAttribute('data-can-click') == 'true' && user.user_id != -1) {
        const bookId = document.getElementById('bookModal').getAttribute('data-book-id');
        http.postData(`${localUrl}/discover/addtocart?userid=${user.user_id}&password=${user.password}&bookid=${bookId}`).then(response => {
            const res = JSON.parse(response);
            if (res[0].status == "success") {
                console.log('Success!');
            }
        });
        closeBookModal();
        loadCart();
    }
}) */

/* function switchPage(e) {
    const pageId = e.getAttribute("data-page");
    if (pageId == "cart" && user.user_id == -1) {
        switchPage(document.getElementById('accountNavButton'));
    } else {
        const buttons = document.getElementsByClassName("navElement");
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].getAttribute("data-page") == pageId) {
                buttons[i].classList.add("navActive");
            } else {
                buttons[i].classList.remove("navActive");
            }
        }
        const pages = document.getElementsByTagName("section");
        for (let i = 0; i < pages.length; i++) {
            pages[i].classList.remove('sectionActive');
        }
        document.getElementById(pageId).classList.add('sectionActive');
        scrollToTop();
    }
} */

/* const navElements = document.getElementsByClassName("navElement");
for(var i = 0; i < navElements.length; i++) {
    navElements[i].addEventListener('click', (e) => {
        switchPage(e.target);
    });
} */

/* const ratingInput = document.getElementById('ratingInput');
ratingInput.addEventListener('change', () => {
    document.getElementById('ratingInputResult').innerHTML = `${ratingInput.value} <span style="font-size: 14pt">${getStars(ratingInput.value)}</span>`
}); */

/* const signInForm = document.getElementById('signInForm');
const registerForm = document.getElementById('registerForm');
const signInButton = document.getElementById('signInButton')
const registerButton = document.getElementById('registerButton')
signInButton.addEventListener('click', () => {
    signInButton.classList.add('underline');
    registerButton.classList.remove('underline');
    registerForm.classList.add('accountFormInactive');
    signInForm.classList.remove('accountFormInactive');
});
registerButton.addEventListener('click', () => {
    registerButton.classList.add('underline');
    signInButton.classList.remove('underline');
    signInForm.classList.add('accountFormInactive');
    registerForm.classList.remove('accountFormInactive');
}); */

// Account functionality

/* function createAccount() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstName').value;
    const lastname = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const lineone = document.getElementById('lineOne').value;
    let linetwo = document.getElementById('lineTwo').value;
    const zip = document.getElementById('zipCode').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    let prefix = document.getElementById('prefix').value;
    let number = document.getElementById('phoneNumber').value;

    linetwo = linetwo == '' ? null : linetwo;
    prefix = prefix == '' ? null : prefix;
    number = number == '' ? null : number;

    http.postData(`${localUrl}/account/create?username=${username}&password=${password}&firstname=${firstname}&lastname=${lastname}&email=${email}&lineone=${lineone}&linetwo=${linetwo}&zip=${zip}&city=${city}&state=${state}&prefix=${prefix}&number=${number}`).then(response => {
        const res = JSON.parse(response);
        if (res.length > 0) {
            user = res[0];
            document.getElementById('accountPageSignedIn').style.display = 'flex';
            document.getElementById('accountPageSignedOut').style.display = 'none';
        }
    })
} */

/* document.getElementById('createAccountButton').addEventListener('click', createAccount);

function signIn() {
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;
    http.getData(`${localUrl}/account/signin?username=${username}&password=${password}`).then(response => {
        const res = JSON.parse(response);
        document.getElementById('signInWarning').style.display = 'inline-block';
        if (res.length > 0) {
            document.getElementById('signInWarning').style.display = 'none';
            user = res[0];
            document.getElementById('accountPageSignedIn').style.display = 'flex';
            document.getElementById('accountPageSignedOut').style.display = 'none';
            loadCart();
            loadCheckedOut();
        }
    });
}

document.getElementById('signInButtonSubmit').addEventListener('click', signIn);

function deleteAccount() {
    http.deleteData(`${localUrl}/account/delete?userid=${user.user_id}&password=${user.password}`).then(response => {
        const res = JSON.parse(response);
        if (res.length > 0) {
            location.reload();
        }
    });
} */

/* document.getElementById("deleteAccountButton").addEventListener('click', deleteAccount);
document.getElementById("logoutButton").addEventListener('click', () => {
    location.reload();
});

function updateFavorites() {
    const fsubject = document.getElementById("fSubjectUpdate").value;
    const fauthor = document.getElementById("fAuthorUpdate").value;
    http.putData(`${localUrl}/account/updatefavorites?userid=${user.user_id}&password=${user.password}&fsubject=${fsubject}&fauthor=${fauthor}`).then(response => {
        const res = JSON.parse(response);
        if (res[0].status == "success") {
            console.log('Success!');
        }
    });
}

document.getElementById("updateFavoritesButton").addEventListener('click', updateFavorites);

function updateAccount() {
    const username = document.getElementById('usernameUpdate').value;
    const password = document.getElementById('passwordUpdate').value;
    const firstname = document.getElementById('firstNameUpdate').value;
    const lastname = document.getElementById('lastNameUpdate').value;
    const email = document.getElementById('emailUpdate').value;
    http.putData(`${localUrl}/account/updateinfo?userid=${user.user_id}&username=${username}&password=${user.password}&newpassword=${password}&firstname=${firstname}&lastname=${lastname}&email=${email}`).then(response => {
        const res = JSON.parse(response);
        if (res[0].status == "success") {
            console.log('Success!');
            signIn(username, password);
        }
    });
}

document.getElementById("updateAccountButton").addEventListener('click', updateAccount);

// Cart functionality

function loadCart() {
    http.getData(`${localUrl}/cart/getcart?userid=${user.user_id}&password=${user.password}`).then(response => {
        const res = JSON.parse(response);
        if (res.length > 0) {
            document.getElementById("cartNoResult").style.display = "none";
            document.getElementById("cartResults").innerHTML = '';
            res.forEach((book)=> {
                document.getElementById("cartResults").innerHTML += `
                    <div class="cartResult" data-book-id="${book.book_id}">
                        <input type="checkbox" id="cartItemCheckbox" name="cartItemCheckbox">
                        <div id="cartResultRight">
                            <div class="bookTitle">${book.title}</div>
                            <div class="bookInformationContainer">
                                <div>${book.authors}, ${book.subject}</div>
                                <div>${book.average_rating} <span>${getStars(book.average_rating)}</span></div>
                            </div>
                        </div>
                    </div>`
            });
        } else {
            document.getElementById("cartResults").innerHTML = '';
            document.getElementById("cartNoResult").style.display = "inline-block";
        }
    });
}

function loadCheckedOut() {
    http.getData(`${localUrl}/cart/getcheckouts?userid=${user.user_id}&password=${user.password}`).then(response => {
        const res = JSON.parse(response);
        if (res.length > 0) {
            document.getElementById("checkedOutNoResult").style.display = "none";
            document.getElementById("checkedOutResults").innerHTML = '';
            res.forEach((book)=> {
                document.getElementById("checkedOutResults").innerHTML += `
                    <div class="cartResult" data-book-id="${book.book_id}">
                        <input type="checkbox" id="cartItemCheckbox" name="cartItemCheckbox">
                        <div id="cartResultRight">
                            <div class="bookTitle">${book.title}</div>
                            <div class="bookInformationContainer">
                                <div>${book.authors}, ${book.subject}</div>
                                <div>${book.average_rating} <span>${getStars(book.average_rating)}</span></div>
                            </div>
                        </div>
                    </div>`
            });
        } else {
            document.getElementById("checkedOutResults").innerHTML = '';
            document.getElementById("checkedOutNoResult").style.display = "inline-block";
        }
    });
}

function checkoutBooks() {
    const cart = document.getElementById('cartResults').children;
    Array.from(cart).forEach((book) => {
        if (book.querySelector('#cartItemCheckbox').checked) {
            http.postData(`${localUrl}/cart/checkout?userid=${user.user_id}&password=${user.password}&bookid=${book.getAttribute('data-book-id')}`).then(response => {
                const res = JSON.parse(response);
                if (res[0].status == "success") {
                    console.log('Success!');
                }
                loadCart()
                loadCheckedOut();
            });
        }
    });
}

document.getElementById('cartCheckoutButton').addEventListener('click', checkoutBooks);

function removeFromCart() {
    const cart = document.getElementById('cartResults').children;
    Array.from(cart).forEach((book) => {
        if (book.querySelector('#cartItemCheckbox').checked) {
            http.deleteData(`${localUrl}/cart/removefromcart?userid=${user.user_id}&password=${user.password}&bookid=${book.getAttribute('data-book-id')}`).then(response => {
                const res = JSON.parse(response);
                if (res[0].status == "success") {
                    console.log('Success!');
                }
                loadCart();
            });
        }
    });
}

document.getElementById('cartRemoveButton').addEventListener('click', removeFromCart);

function returnBooks() {
    const cart = document.getElementById('checkedOutResults').children;
    Array.from(cart).forEach((book) => {
        if (book.querySelector('#cartItemCheckbox').checked) {
            http.putData(`${localUrl}/cart/return?userid=${user.user_id}&password=${user.password}&bookid=${book.getAttribute('data-book-id')}`).then(response => {
                const res = JSON.parse(response);
                if (res[0].status == "success") {
                    console.log('Success!');
                }
                loadCheckedOut();
            });
        }
    });
}

document.getElementById('cartReturnButton').addEventListener('click', returnBooks); */