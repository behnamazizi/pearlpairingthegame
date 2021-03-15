let ww, wh, timer_0, timer_1, timer_2,
    depth = 4,
    board = [],
    styles = [],
    play = false,
    selected = -1,
    filled = 0,
    end = false,
    icons = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '6', '7', '9', '+', '!', '%', '#', '▶', '■', '', '＊']

document.addEventListener('DOMContentLoaded', () => {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('service worker registered'))
            .catch(err => console.log('service worker not registered', err));
    }

    timer_2 = window.requestAnimationFrame(() => {
        getComputedStyle(document.body).getPropertyValue("width").slice(0, -2) != 0 ? setup() : ''
    })

})
window.addEventListener('resize', () => setup())




function setup() {
    window.cancelAnimationFrame(timer_2);
    ww = getComputedStyle(document.body).getPropertyValue("width").slice(0, -2);
    sb = getComputedStyle(document.querySelector('header')).getPropertyValue("height").slice(0, -2)
    wh = (getComputedStyle(document.body).getPropertyValue("height").slice(0, -2)) - sb;
    ww < wh ? wh = ww : ww = wh;
    if (!play) {
        document.querySelector('#start').classList.add('active')
        document.querySelector('#play').classList.remove('active')
        window.cancelAnimationFrame(timer_0);
        window.cancelAnimationFrame(timer_1);
        selected = -1, filled = 0, colors = [], end = false, styles = [], board = [], icons = shuffle(icons)
        for (let index = 0; index < (depth * depth) / 2; index++) {
            styles.push(icons[index]);
            styles.push(icons[index]);
        }
        styles = shuffle(styles)
        for (let c = 0; c < depth * depth; c++) {
            board.push([0, styles[c]])
        }
    }
    document.querySelector('#board').innerHTML = board.map((cell, index) => {
        return `<li class="cell" sta="${cell[0]}" cln="${index}" stl="${cell[1]}" onclick="stateHandler(${index})"><div class="symbol"><span>${cell[1]}</span></div></li>`
    }).join('')
    document.querySelector('#additional').innerHTML = `* { --depth: ${depth}; --w: ${ww / depth}px;}`;
}

function stateHandler(cell) {
    if (!end) {
        if (board[cell][0] == 0) {
            clearTimeout(timer_1)
            board.forEach((c, i) => {
                document.querySelector(`[cln="${i}"]`).setAttribute('sta', c[0])
            })
            if (selected > -1) {
                document.querySelector(`[cln="${cell}"]`).setAttribute('sta', 1)
                timer_1 = setTimeout(() => {
                    if (board[selected][1] === board[cell][1]) {
                        board[selected][0] = 2;
                        board[cell][0] = 2;
                        filled++
                    } else {
                        board[selected][0] = 0;
                        board[cell][0] = 0;
                    }
                    selected = -1;
                    board.forEach((c, i) => {
                        document.querySelector(`[cln="${i}"]`).setAttribute('sta', c[0])
                    });
                    finish();

                }, 500);
            } else {
                document.querySelector(`[cln="${cell}"]`).setAttribute('sta', 1)
                board[cell][0] = 1;
                selected = cell;
            }
        }
        if (!play) {
            document.querySelector('#start').classList.remove('active')
            document.querySelector('#play').classList.add('active')
            window.cancelAnimationFrame(timer_0);
            timer(new Date(), 0, 0)
            play = true
        }
    }
}

function finish() {
    if (filled == (depth * depth) / 2) {
        end = true;
        window.cancelAnimationFrame(timer_0);
        document.querySelector('#time').classList.add('finish');
        board.forEach((cell, index) => {
            cell[1] = 4;
            document.querySelector(`[cln="${index}"]`).setAttribute('sta', 4);
        })
    }
}

function timer(time, mn, sc) {
    let now = new Date().getTime();
    let dif = now - time;
    sc = Math.floor(dif / 1000)
    sc < 60 ? sc = sc : (sc = 0, time = now, mn++)
    document.querySelector('#time').innerHTML = `<span>${zero(mn,2)}</span><b>:</b><span>${zero(sc,2)}</span>`
    timer_0 = window.requestAnimationFrame(() => {
        timer(time, mn, sc)
    })
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

function zero(num, places) {
    return String(num).padStart(places, '0')
}











let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', () => {
        // addBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});

window.addEventListener('appinstalled', () => {
    // addBtn.style.display = 'none';
    document.querySelector('#additional').innerHTML += `
    #start{
        grid-template-columns: repeat(3, 1fr) .5fr 1fr;
    }
    .add-button{
        display: none;
     }
    `
    deferredPrompt = null;
    console.log('PWA was installed');
});