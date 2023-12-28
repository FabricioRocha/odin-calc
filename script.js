
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

// Init - global  elements
var cal = new Calculator();
numButtonsCreate();
opButtonsBind();



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



function numButtonsBind(){
    let buttons = document.querySelectorAll(".numbutton");
    buttons.forEach(button => {
        button.addEventListener("click", numButtonClicked);
    });
}

function controlClearClicked() {
    cal.clearPendingOp();
    cal.setLastButtonType("");
    cal.accum = 0;
    displayClear();
}

function numButtonClicked(evt) {
    /*
    let button = evt.target;
    let val = button.innerText;
    displayAppend(val);
    */
    if (cal.getLastButtonType() !== "num") displayClear();
    displayAppend(evt.target.innerText);
    cal.setLastButtonType("num");
    return;
}

function displayAppend(digit) {
    let display = document.getElementById("display");
    let content = display.innerText;
    if (digit !== "." && content === "0") {
        content = digit;
    } 
    else {
        if (!(digit === "." && content.includes(".")))
            content+=String(digit);
    }
    
    display.innerText = content;
    
    // If the new digit causes a display overflow, cut it out
    if (display.scrollWidth > display.clientWidth) {
        display.innerText = content.slice(0, content.length - 1);
    }
    return;
}

function displayClear() {
    let display = document.getElementById("display");
    display.innerText = "0";
    return;
}

function displayClearEntry() {
    let display = document.getElementById("display");
    let content = display.innerText;
    if (content.length > 1) {
        display.innerText = content.slice(0, content.length - 1);
    } else {
        display.innerText = "0";
    }
    return;
}


/*
    opButtonsBind
*/
function opButtonsBind() {
    let buts = document.querySelectorAll(".opbutton");
    buts.forEach((but) => {
        but.addEventListener("click", opButtonClicked);
    });
}

/*
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
function opButtonClicked (evt) {
    let op = evt.target.getAttribute("name");
    let display = document.getElementById("display");
    let curval = Number(display.innerText);
    let pending = cal.getPendingOp();

    if (pending) {
        let res = cal.calc(cal.accum, pending, curval);
        display.innerText = res;
        if (op === "=") {
            cal.clearPendingOp();
        } else {
            cal.accum = res;
            cal.setPendingOp(op);
        }
    } else {
        if (op !== "=") {
            cal.setPendingOp(op);
            cal.accum = curval;
        }
    }
    cal.setLastButtonType("op");
}



// The calculator back-end **********************

function Calculator() {
    this['+'] = (val1, val2) => val1 + val2;
    this['-'] = (val1, val2) => val1 - val2;
    this['*'] = (val1, val2) => val1 * val2;
    this['/'] = (val1, val2) => val2 == 0 ? 'Error' : val1 / val2;

    this.accum = 0;
    this.pendingOp = "";
    this.lastButtonType = "";
    
    this.setPendingOp = (op) => this.pendingOp = op;
    this.getPendingOp = () => this.pendingOp;
    this.clearPendingOp = () => this.pendingOp = "";

    this.getLastButtonType = () => this.lastButtonType;
    this.setLastButtonType = (bt) => this.lastButtonType = bt;

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
