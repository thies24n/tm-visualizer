// helper functions
function arrayToBase26Object(arr) {
    // Thanks ChatGPT
    const base26Keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = {};

    for (let i = 0; i < arr.length; i++) {
        // Get the corresponding base-26 index
        let key = base26Keys[i];
        // Assign the array at current index as the value for the key
        result[key] = arr[i];
    }

    return result;
}

function parseStdFormat(std_format) {
    let instructions = std_format;
        // expected: "1RB2RA1LC_2LC1RB2RB_---2LA1LA"
    instructions = instructions.split("_");
        // expected: ["1RB2RA1LC", "2LC1RB2RB", "---2LA1LA"]
    instructions = instructions.map(instr => instr
        .split(/([0-9]*[0-9][RL][A-Z]*[A-Z])/g)
        .filter(instr => instr.length != 0));
        // expected: [["1RB", "2RA", "1LC"], ["2LC", "1RB", "2RB"], ["---", "2LA", "1LA"]]
    instructions = arrayToBase26Object(instructions);
    return instructions;
}

function drawBox(context, dx, symbol, t, x) {
    const colors = [
        '#6a4c93',
        '#ff595e',
        '#ffca3a',
        '#8ac926',
        '#1982c4',
    ]
    context.fillStyle = colors[symbol];
    context.fillRect(dx*(x - 0.5), dx*t, dx, dx);
}

function drawHead(context, dx, t, x) {
    context.strokeRect(dx*(x - 0.5), dx*t, dx, dx);
}

function drawTape(context, tape, t, dx) {
    Object.keys(tape).forEach(x => {
        drawBox(context, dx, tape[x], t, x);
    });
}

// parse instructions
let instructions = parseStdFormat(document.getElementById("input-std-format").innerText);
console.log(instructions);

// do stuff with the canvas
const canvas = document.getElementById("da-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.translate(canvas.clientWidth/2 - 5, 0);

// simulate the TM!
const tape = {[0]: 0};
let head_x = 0;
let head_state = "A";
for (let t = 0; t <  200; t++) {
    drawTape(ctx, tape, t, 6);
    //drawHead(ctx, 6, t, head_x);
    if (!instructions[head_state]) {
        break;
    }
    // if tape is blank, default to 0
    tape[head_x] = tape[head_x] ? tape[head_x] : 0;
    // get current instruction
    const instr = instructions[head_state][tape[head_x]]
        .split(/([LR])/);
    // change symbol at head based on instruction
    tape[head_x] = parseInt(instr[0]);
    // move tape left or right
    head_x += instr[1] == 'R' ? 1 : -1;
    // get next head state
    head_state = instr[2];
}

// move head and render squares in its wake