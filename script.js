window.onload = function() {
    includeHTML();
    renderCart();
};

let shoppingCart = [];

window.onscroll = function() {
    let shoppingCartContainer = document.getElementById('shoppingCartContainer');
    console.log(window.scrollY);
    if (window.scrollY < 128) {
        shoppingCartContainer.style.top = (128 - window.scrollY) + 'px';
    } else {
        shoppingCartContainer.style.top = '0px';
    }
};


function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username == 'Junus' && password == 'StrengGeheim!') {
        window.location.href = './login-success.html';
    } else {
        alert('Passwort falsch!');
    }

}

function addToCart(item, price) {
    shoppingCart.push({ amount: 1, item: item, price: price });
    renderCart();
}

function renderCart() {
    let orderedItems = document.getElementById('orderedItems');
    orderedItems.innerHTML = '';
    let sum = 0;

    if (shoppingCart.length == 0) {
        orderedItems.innerHTML = '<div class="mb-8">Der Einkaufswagen ist leer</div>';
    }

    shoppingCart.forEach((elem) => {
        orderedItems.innerHTML += `
        <div class="space-between mb-8">
            <div>${elem.amount}x ${elem.item} </div>
            <div>${elem.price}€ </div>
        </div>
        `;

        sum += elem.price;
    });

    orderedItems.innerHTML += `
    <div class="space-between mb-8 mt-8">
        <div><b>Gesamtsumme</b> </div>
        <div>${sum.toFixed(2)}€ </div>
    </div>

    <div class="space-between mb-8">
        <div><b>Versandkosten</b> </div>
        <div>${4.99}€ </div>
    </div>

    <div class="space-between mb-8">
        <div><b>Gesamtsumme</b> </div>
        <div>${(sum + 4.99).toFixed(2)}€ </div>
    </div>
    `;
}

function decryptArtcle() {
    let enteredPassword = document.getElementById('password').value;
    let encryptedPassword = sha256(enteredPassword);
    if (encryptedPassword == 'e78c46d45241892f95c27a76b6b37e2a75af2acef4e5391d58e113f33bf0521e') {
        let decryptCard = document.getElementById('decryptCard');
        decryptCard.innerHTML = `
        <p>${decrypt('82-111-124-132-118-115-109-114-111-120-42-81-118-262-109-117-129-127-120-125-109-114-43-42-78-127-42-114-107-125-126-42-110-107-125-42-90-107-125-125-129-121-124-126-42-111-124-112-121-118-113-124-111-115-109-114-42-113-111-114-107-109-117-126-43-70-108-124-72-84-111-126-132-126-42-108-115-125-126-42-110-127-42-111-115-120-42-121-112-112-115-132-115-111-118-118-111-124-42-82-107-109-117-111-124-43-42-78-115-111-125-111-42-75-127-112-113-107-108-111-42-129-107-124-42-111-114-124-118-115-109-114-42-113-111-125-107-113-126-42-120-115-109-114-126-42-113-107-120-132-42-111-115-120-112-107-109-114-56-42-78-107-125-42-94-111-107-119-42-110-111-124-42-78-111-128-111-118-121-122-111-124-42-75-117-107-110-111-119-115-111-42-115-125-126-42-125-126-121-118-132-54-42-129-111-120-120-42-110-127-42-110-115-111-125-111-42-75-127-112-113-107-108-111-42-125-111-118-108-125-126-125-126-238-120-110-115-113-42-113-111-118-256-125-126-42-114-107-125-126-56')}</p>
        `;
    } else {
        alert('Versuche es erneut!');
    }
}

function checkoutCart() {
    let sum = shoppingCart.map(i => i.price).reduce((ac, a) => ac + a, 0);

    let totalPrice = sum + 4.99;

    if (totalPrice <= 0) {
        alert('Herzlichen Glückwunsch! Du hast uns gehackt!!');
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        alert('Die Gesamtsumme beträgt ' + totalPrice + '€');
    }

}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}


function removeWidget() {
    document.getElementById('overlayWidget').remove();
}


function encrypt(value) {
    var result = "";
    for (i = 0; i < value.length; i++) {
        if (i < value.length - 1) {
            result += value.charCodeAt(i) + 10;
            result += "-";
        } else {
            result += value.charCodeAt(i) + 10;
        }
    }
    return result;
}

function decrypt(value) {
    var result = "";
    var array = value.split("-");

    for (i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i] - 10);
    }
    return result;
}

//Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MLQNJ4P');
//End Google Tag Manager -->
