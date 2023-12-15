


/*
    numButtonsCreate
        Creates the numeric buttons in the DOM
*/
function numButtonsCreate() {
    let numpad = document.getElementById("numpad");
    for (let row = 3; row > 0; row--) {
        for (let num = 3 * (row - 1) + 1; num <= row * 3; num++) {
            let but = document.createElement("div");
            but.innerText = num;
            but.classList.add("numbutton");
            numpad.appendChild(but);
        }
    }
}

// numButtonsCreate();


/*
    opButtonsCreate
        Creates the operation buttons in the DOM
*/

