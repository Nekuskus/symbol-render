const obrazek = document.getElementById('obrazek')
const group = document.getElementById('render-group')
const outerbox = obrazek.getBoundingClientRect();
let groupbox = group.getBoundingClientRect();
let outscale = document.getElementById('out-scale')
let outrot = document.getElementById('out-rot')
let outone = document.getElementById('out-one')
let outtwo = document.getElementById('out-two')
let outr = document.getElementById('out-r')
let outg = document.getElementById('out-g')
let outb = document.getElementById('out-b')

let picker = document.getElementById('colorpicker')
/*
<line x1="360" x2="360" y1="240" y2="295"/>
<line x1="360" x2="390" y1="295" y2="295"/>
<line x1="390" x2="390" y1="240" y2="295"/>
<path d="M 390 295 C 435 295, 435 240, 390 240"/>
*/


//funkcja konstruktora "klasy"
class Initial {
    //atrybuty prywatne
    #x; #y; #bok_x; #bok_y; #skala; #translate; #rotate; #prev_draw_args; #last_draw_args; #kolor;

    //metody prywatne
    #debug() {
        console.log(this.#last_draw_args)
    }


    //metody publiczne
    rysuj(caller = 'not_skala') {
        this.#prev_draw_args = this.#last_draw_args
        this.#last_draw_args = { x: this.#x, y: this.#y, bok_x: this.#bok_x, bok_y: this.#bok_y, skala: this.#skala, translate: this.#translate, rotacja: this.#rotate, kolor: this.#kolor }
        group.setAttribute('transform', `translate(${this.#translate[0]} ${this.#translate[1]}) scale(${this.#skala}) rotate(${this.#rotate})`)
        group.innerHTML = `<line x1="${this.#x}" x2="${this.#x}" y1="${this.#y}" y2="${this.#y + this.#bok_y}"/>
                           <line x1="${this.#x}" x2="${this.#x + this.#bok_x * 0.4}" y1="${this.#y + this.#bok_y}" y2="${this.#y + this.#bok_y}"/>
                           <line x1="${this.#x + this.#bok_x * 0.4}" x2="${this.#x + this.#bok_x * 0.4}" y1="${this.#y}" y2="${this.#y + this.#bok_y}"/>
                           <path d="M ${this.#x + this.#bok_x * 0.4} ${this.#y + this.#bok_y} C ${this.#x + this.#bok_x} ${this.#y + this.#bok_y}, ${this.#x + this.#bok_x} ${this.#y}, ${this.#x + this.#bok_x * 0.4} ${this.#y}"/>`
        groupbox = group.getBoundingClientRect();
        let true_out_of_bounds = [groupbox.bottom > outerbox.bottom, groupbox.left < outerbox.left, groupbox.right > outerbox.right, groupbox.top < outerbox.top].filter(val => val === true);
        if (true_out_of_bounds.length > 0 && caller == "skala") {
            // nie zmieści się, downscale
            this.#skala -= 0.01

            group.setAttribute('transform', `translate(${this.#translate[0]} ${this.#translate[1]}) scale(${this.#skala}) rotate(${this.#rotate})`)
            group.innerHTML = `<line x1="${this.#x}" x2="${this.#x}" y1="${this.#y}" y2="${this.#y + this.#bok_y}"/>
                               <line x1="${this.#x}" x2="${this.#x + this.#bok_x * 0.4}" y1="${this.#y + this.#bok_y}" y2="${this.#y + this.#bok_y}"/>
                               <line x1="${this.#x + this.#bok_x * 0.4}" x2="${this.#x + this.#bok_x * 0.4}" y1="${this.#y}" y2="${this.#y + this.#bok_y}"/>
                               <path d="M ${this.#x + this.#bok_x * 0.4} ${this.#y + this.#bok_y} C ${this.#x + this.#bok_x} ${this.#y + this.#bok_y}, ${this.#x + this.#bok_x} ${this.#y}, ${this.#x + this.#bok_x * 0.4} ${this.#y}"/>`
        }
        else if (true_out_of_bounds.length > 0) {
            //translate out
            if (groupbox.bottom > outerbox.bottom) {
                this.#translate[1] -= groupbox.bottom - outerbox.bottom;
            }
            if (groupbox.left + 1 < outerbox.left) {
                this.#translate[0] += outerbox.left - groupbox.left;
            }
            if (groupbox.right > outerbox.right) {
                this.#translate[0] -= groupbox.right - outerbox.right;
            }
            if (groupbox.top < outerbox.top) {
                this.#translate[1] += outerbox.top - groupbox.top;
            }

            group.setAttribute('transform', `translate(${this.#translate[0]} ${this.#translate[1]}) scale(${this.#skala}) rotate(${this.#rotate})`)
            group.innerHTML = `<line x1="${this.#x}" x2="${this.#x}" y1="${this.#y}" y2="${this.#y + this.#bok_y}"/>
                               <line x1="${this.#x}" x2="${this.#x + this.#bok_x * 0.4}" y1="${this.#y + this.#bok_y}" y2="${this.#y + this.#bok_y}"/>
                               <line x1="${this.#x + this.#bok_x * 0.4}" x2="${this.#x + this.#bok_x * 0.4}" y1="${this.#y}" y2="${this.#y + this.#bok_y}"/>
                               <path d="M ${this.#x + this.#bok_x * 0.4} ${this.#y + this.#bok_y} C ${this.#x + this.#bok_x} ${this.#y + this.#bok_y}, ${this.#x + this.#bok_x} ${this.#y}, ${this.#x + this.#bok_x * 0.4} ${this.#y}"/>`
        }
        outscale.value = this.#skala.toFixed(2);
        outrot.value = this.#rotate.toFixed(2);
        outone.value = this.#translate[0].toFixed(2);
        outtwo.value = this.#translate[1].toFixed(2);
        outr.value = this.#kolor[0].toFixed(2);
        outg.value = this.#kolor[1].toFixed(2);
        outb.value = this.#kolor[2].toFixed(2);
    }
    przesun(deltaX, deltaY) {
        this.#translate[0] += deltaX
        this.#translate[1] += deltaY
        this.rysuj();
    }
    skaluj(deltaS) {
        this.#skala += deltaS
        this.rysuj("skala");
    }
    obroc(deltaR) {
        this.#rotate += deltaR
        this.rysuj();
    }
    zmienKolor() {
        let dialog = document.getElementById('colordialog')
        dialog.showModal()
    }

    //właściwości atrybutów publicznych
    x() {
        return this.#x
    }
    y() {
        return this.#y
    }
    bok_x() {
        return this.#bok_x
    }
    bok_y() {
        return this.#bok_y
    }
    skala() {
        return this.#skala
    }
    rotate() {
        return this.#rotate
    }
    translate() {
        return this.#translate
    }
    prevDrawData() {
        return this.#prev_draw_args
    }
    lastDrawData() {
        return this.#last_draw_args
    }
    kolor() {
        return this.#kolor
    }

    constructor(_x = obrazek.clientWidth / 2 - 66.25 / 2, _y = obrazek.clientHeight / 2 - 59 / 2, _bok_x = 66.25, _bok_y = 59, _skala = 1, _translate = [0, 0], _rotate = 0, _kolor = [0, 0, 0]) {
        this.#x = _x;
        this.#y = _y;
        this.#bok_x = _bok_x;
        this.#bok_y = _bok_y;
        this.#skala = _skala;
        this.#translate = _translate;
        this.#rotate = _rotate;
        this.#kolor = _kolor;

        document.getElementById('ok').addEventListener('click', e => {
            picker.select()
            let r = parseInt(picker.value.substr(1, 2).toUpperCase(), 16)
            let g = parseInt(picker.value.substr(3, 2).toUpperCase(), 16)
            let b = parseInt(picker.value.substr(5, 2).toUpperCase(), 16)
            this.#kolor = [r, g, b]
            group.setAttribute('stroke', `rgb(${this.#kolor[0]}, ${this.#kolor[1]}, ${this.#kolor[2]})`)
			outr.value = this.#kolor[0].toFixed(2);
			outg.value = this.#kolor[1].toFixed(2);
			outb.value = this.#kolor[2].toFixed(2);
        })
        picker.addEventListener('input', e => {
            picker.select()
            let r = parseInt(picker.value.substr(1, 2).toUpperCase(), 16)
            let g = parseInt(picker.value.substr(3, 2).toUpperCase(), 16)
            let b = parseInt(picker.value.substr(5, 2).toUpperCase(), 16)
            this.#kolor = [r, g, b]
            group.setAttribute('stroke', `rgb(${this.#kolor[0]}, ${this.#kolor[1]}, ${this.#kolor[2]})`)
			outr.value = this.#kolor[0].toFixed(2);
			outg.value = this.#kolor[1].toFixed(2);
			outb.value = this.#kolor[2].toFixed(2);
        })
    }
}

let pressed = []

window.document.onkeydown = function (event) {
    console.log(event.code)
    if (!pressed.includes(event.code)) {
        pressed.push(event.code)
    }
    if (pressed.includes('ArrowLeft') || pressed.includes('KeyA')) //kursor w lewo
        initial.przesun(-5, 0);
    if (pressed.includes('ArrowRight') || pressed.includes('KeyD')) //kursor w prawo
        initial.przesun(5, 0);
    if (pressed.includes('ArrowUp') || pressed.includes('KeyW')) //kursor w góre
        initial.przesun(0, -5);
    if (pressed.includes('ArrowDown') || pressed.includes('KeyS')) //kursor w dół
        initial.przesun(0, 5);
    if (pressed.includes('Minus') || pressed.includes('NumpadSubtract')) //zmniejszanie -
        initial.skaluj(-0.01);
    if ((pressed.includes('Equal') && event.shiftKey) || pressed.includes('NumpadAdd')) //zwiększanie +
        initial.skaluj(0.01);
    if (pressed.includes('KeyK')) //klawisz K
        initial.zmienKolor();
    if (pressed.includes('KeyE')) {
        initial.obroc(1.5);
    }
    if (pressed.includes('KeyQ')) {
        initial.obroc(-1.5);
    }
}

window.document.onkeyup = function (event) {
    pressed = pressed.filter(val => val !== event.code)
}

var bok = 100;
//var initial = new Initial(Math.round((obrazek.offsetWidth - bok) / 2),  Math.round((obrazek.offsetHeight - bok) / 2), bok);
var initial = new Initial() //korzystam z defaultowych konstruktora
initial.rysuj();
