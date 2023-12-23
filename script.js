
/*
    - Number buttons pressed:
        - if last pressed button was an opButton, clear display
        - if button is 0, current display is 0 and no operation is pending, do nothing
        - if display still has space, append number

    - "=" is pressed:
        - if an operation is pending:
            - get current display content as second operand
            - perform operation
            - update display with the result
        - else: just repeat the current display content
        - clear flag of pending operation

    - Operation buttons pressed:
        - if an operation is pending: do the same of "="
        - update/raise the flag of pending operation
        - Store the updated display content as operand 1
    


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

    numButtonsBind();
}

numButtonsCreate();

function numButtonsBind(){
    let buttons = document.querySelectorAll(".numbutton");
    buttons.forEach(button => {
        button.addEventListener("click", numButtonClicked);
    });
}

function numButtonClicked(evt) {
    /*
    let button = evt.target;
    let val = button.innerText;
    displayAppend(val);
    */
    displayAppend(evt.target.innerText);
    return;
}

function displayAppend(digit) {
    let display = document.getElementById("display");
    let content = display.innerText;
    if (content === "0") content = digit;
        else content+=String(digit);
    display.innerText = content;
    return;
}

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
    this.pendingOp = "";
    
    this.setPendingOp = (op) => this.pendingOp = op;
    this.getPendingOp = () => this.pendingOp;
    this.clearPendingOp = () => this.pendingOp = "";

    // calc - perform operation
    this.calc = function(val1, op, val2) {
        let v1 = Number(val1);
        let v2 = Number(val2);

        if (Number.isNaN(v1) || Number.isNaN(v2)) return 'Error';

        if (!(op in this)) return ('Error');

        this.accum = (this[op](v1, v2));
        return this.accum;
    }


}
