
/*
    - Number buttons pressed:
    - Operation buttons pressed:
        - Get the visor value

*/

/*
    numButtonsCreate
        Creates the numeric buttons in the DOM
*/
function numButtonsCreate() {
    let numpad = document.getElementById("numpad");
    for (let row = 3; row > 0; row--) {
        let numrow = document.createElement("div");
        numrow.classList.add("numrow");
        for (let num = 3 * (row - 1) + 1; num <= row * 3; num++) {
            let but = document.createElement("div");
            but.innerText = num;
            but.classList.add("numbutton");
            numrow.appendChild(but);
        }
        numpad.appendChild(numrow);
    }
    
    let numrow = document.createElement("div");
    numrow.setAttribute("id", "zerorow");
    numrow.classList.add("numrow");

    let but = document.createElement("div");
    but.classList.add("numbutton", "zero");
    but.innerText = "0";
    numrow.appendChild(but);
    
    but = document.createElement("div");
    but.classList.add("numbutton");
    but.innerText = ".";
    numrow.appendChild(but);

    numpad.appendChild(numrow);
}

numButtonsCreate();


/*
    opButtonsCreate
        Creates the operation buttons in the DOM
*/


// The calculator back-end **********************

function Calculator() {
    this['+'] = (val1, val2) => val1 + val2;
    this['-'] = (val1, val2) => val1 - val2;
    this['*'] = (val1, val2) => val1 * val2;
    this['/'] = (val1, val2) => val2 == 0 ? 'Error' : val1 / val2;

    this.accum = 0;
    
    this.calc = function(val1, op, val2) {
        let v1 = Number(val1);
        let v2 = Number(val2);

        if (Number.isNaN(v1) || Number.isNaN(v2)) return 'Error';

        if (!(op in this)) return ('Error');

        this.accum = (this[op](v1, v2));
        return this.accum;
    }


}
