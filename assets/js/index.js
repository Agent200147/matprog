"use strict";

window.addEventListener('load', () => {
    // importScripts('../lib/Math.js')
    const menu = document.querySelector('.menu')
    const menuItems = document.querySelectorAll('.menu__item')
    const wrapper = document.querySelector('.wrapper')

    Object.prototype.show = function() {this.style.display = 'flex'}
    Object.prototype.hide = function() {this.style.display = 'none'}


    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            menu.classList.remove('firstTab', 'secondTab', 'thirdTab')
            wrapper.classList.remove('firstTab', 'secondTab', 'thirdTab')

            menu.classList.add(item.dataset.link)
            wrapper.classList.add(item.dataset.link)

            // currentPage = item.dataset.link
            // localStorage.setItem('currentPage', currentPage)
            //
            // currentPage === 'firstTab' ? FirstPage() : ""
            // currentPage === 'secondTab' ? SecondPage() : ""
            // currentPage === 'thirdTab' ? ThirdPage() : ""
            //
            // cl(currentPage)
        })
    })


    // 1 лабораторная
    const myWorkerMonte = new Worker("assets/js/laba1/MK.js");
    const myWorkerAnnealing = new Worker("assets/js/laba1/AN.js");

    const form1 = document.getElementById('form1')
    const resultMonte = document.getElementById('resultMonte')
    const monteLoader = document.getElementById('monteLoader')

    const resultAnnealing = document.getElementById('resultAnnealing')
    const annealingLoader = document.getElementById('annealingLoader')
    const btnSubmit1 = document.getElementById('btnSubmit1')
    const btnReset1 = document.getElementById('btnReset1')
    // const btnStop = document.getElementById('btnStop')
    const btnClear1 = document.getElementById('btnClear1')

    let monteI = 1
    let annealingI = 1



    btnReset1.addEventListener('click', () => {
        form1.reset()
    })

    btnClear1.addEventListener('click', () => {
        monteI = 1
        annealingI = 1
        resultMonte.innerHTML = ''
        resultAnnealing.innerHTML = ''
    })


    form1.addEventListener('submit', (e) => {
        e.preventDefault()

        // btnStop.addEventListener('click', () => {
        //     myWorkerMonte.terminate()
        //     myWorkerMonte = new Worker("../assets/js/MK.js");
        //
        //     myWorkerAnnealing.terminate()
        //     myWorkerAnnealing = new Worker("../assets/js/AN.js");
        // })


        const leftBorder = Number(form1.leftBorder.value)
        const rightBorder = Number(form1.rightBorder.value)
        const fnInput = form1.fnInput.value

        const range = []
        for (let i = 0; i < rightBorder - leftBorder; i++) {
            range[i] = leftBorder + i
        }

        // Монте-Карло
        const N = form1.monteIteration.value

        // Имитация отжига
        const Tmax = form1.annealingT.value
        const r = form1.annealingR.value
        const L = form1.annealingL.value

        const start = new Date().getTime()

        resultMonte.innerHTML += `<div class=\"result main-block\"><h2>Результат ${monteI}</h2><div class="main-block main-block-white main-block-monte-${monteI}">
        <div class="main-block-white-progress" id="progressMonte${monteI}"></div>
        <div class="loader" id="monteLoader${monteI}">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;"
                         width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <defs>
                            <path id="path" d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15" fill="none"></path>
                            <path id="patha" d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0" fill="none"></path>
                        </defs>
                        <g transform="rotate(0 50 50)">
                            <use xlink:href="#path" stroke="#000000" stroke-width="3"></use>
                        </g>
                        <g transform="rotate(60 50 50)">
                            <use xlink:href="#path" stroke="#000000" stroke-width="3"></use>
                        </g>
                        <g transform="rotate(120 50 50)">
                            <use xlink:href="#path" stroke="#000000" stroke-width="3"></use>
                        </g>
                        <g transform="rotate(0 50 50)">
                            <circle cx="50" cy="15" r="9" fill="#e15b64">
                                <animateMotion dur="0.5s" repeatCount="indefinite" begin="0s">
                                    <mpath xlink:href="#patha"></mpath>
                                </animateMotion>
                            </circle>
                        </g>
                        <g transform="rotate(60 50 50)">
                            <circle cx="50" cy="15" r="9" fill="#f8b26a">
                                <animateMotion dur="0.5s" repeatCount="indefinite" begin="-0.08s">
                                    <mpath xlink:href="#patha"></mpath>
                                </animateMotion>
                            </circle>
                        </g>
                        <g transform="rotate(120 50 50)">
                            <circle cx="50" cy="15" r="9" fill="#abbd81">
                                <animateMotion dur="0.5s" repeatCount="indefinite" begin="-0.1666s">
                                    <mpath xlink:href="#patha"></mpath>
                                </animateMotion>
                            </circle>
                        </g>
                    </svg>
                </div>
        </div></div>`

        resultAnnealing.innerHTML += `<div class=\"result main-block\"><h2>Результат ${monteI}</h2><div class="main-block main-block-white main-block-annealing-${monteI}">
        <div class="main-block-white-progress anneal-progress" id="progressAnnealing${annealingI}"></div>
        <div class="loader" id="annealingLoader${annealingI}">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;"
                         width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <defs>
                            <path id="path" d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15" fill="none"></path>
                            <path id="patha" d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0" fill="none"></path>
                        </defs>
                        <g transform="rotate(0 50 50)">
                            <use xlink:href="#path" stroke="#000000" stroke-width="3"></use>
                        </g>
                        <g transform="rotate(60 50 50)">
                            <use xlink:href="#path" stroke="#000000" stroke-width="3"></use>
                        </g>
                        <g transform="rotate(120 50 50)">
                            <use xlink:href="#path" stroke="#000000" stroke-width="3"></use>
                        </g>
                        <g transform="rotate(0 50 50)">
                            <circle cx="50" cy="15" r="9" fill="#e15b64">
                                <animateMotion dur="0.5s" repeatCount="indefinite" begin="0s">
                                    <mpath xlink:href="#patha"></mpath>
                                </animateMotion>
                            </circle>
                        </g>
                        <g transform="rotate(60 50 50)">
                            <circle cx="50" cy="15" r="9" fill="#f8b26a">
                                <animateMotion dur="0.5s" repeatCount="indefinite" begin="-0.08s">
                                    <mpath xlink:href="#patha"></mpath>
                                </animateMotion>
                            </circle>
                        </g>
                        <g transform="rotate(120 50 50)">
                            <circle cx="50" cy="15" r="9" fill="#abbd81">
                                <animateMotion dur="0.5s" repeatCount="indefinite" begin="-0.1666s">
                                    <mpath xlink:href="#patha"></mpath>
                                </animateMotion>
                            </circle>
                        </g>
                    </svg>
                </div>
        </div></div>`

        myWorkerMonte.postMessage([leftBorder, rightBorder, fnInput, N, start, monteI])
        myWorkerAnnealing.postMessage([leftBorder, rightBorder, fnInput, N, L, Tmax, r, range, start])
        btnSubmit1.setAttribute('disabled', 'disabled')
        btnClear1.setAttribute('disabled', 'disabled')

        console.log('Message posted to worker')



        // monteLoader.style.display = 'block'
        // annealingLoader.style.display = 'block'

    })

    myWorkerMonte.onmessage = function(e) {
        const progressBar = document.getElementById(`progressMonte${monteI}`)

        if(e.data.length !== 4){
            btnSubmit1.setAttribute('disabled', 'disabled')
            btnClear1.setAttribute('disabled', 'disabled')
            progressBar.style.transform = e.data
            return false
        }
        progressBar.style.transform = 'translateY(226px)'
        const output = document.querySelector(`.main-block-monte-${monteI}`)
        const monteLoader = document.getElementById(`monteLoader${monteI}`)
        monteLoader.style.display = 'none'

        // output.innerHTML = `<h2>Результат ${monteI}</h2>`
        // const output2 = document.createElement('div')
        // output2.classList.add('main-block', 'main-block-white')
        monteI++

        monteLoader.style.display = 'none'
        e.data.forEach((item) => {
            output.innerHTML += `<div>${item}</div>`
        })

        btnSubmit1.removeAttribute('disabled')
        btnClear1.removeAttribute('disabled')

        // resultMonte.append(output)
    }

    myWorkerAnnealing.onmessage = function(e) {
        const progressBar = document.getElementById(`progressAnnealing${annealingI}`)

        if(e.data.length !== 4){
            btnSubmit1.setAttribute('disabled', 'disabled')
            btnClear1.setAttribute('disabled', 'disabled')
            progressBar.style.transform = e.data
            return false
        }
        progressBar.style.transform = 'translateY(226px)'
        const output = document.querySelector(`.main-block-annealing-${annealingI}`)
        const annealingLoader = document.getElementById(`annealingLoader${annealingI}`)
        annealingLoader.style.display = 'none'
        annealingI++

        e.data.forEach((item) => {
            output.innerHTML += `<div>${item}</div>`
        })
        btnSubmit1.removeAttribute('disabled')
        btnClear1.removeAttribute('disabled')
    }

    // ------------------------------------------------------------------------

    const inputsFn = document.querySelectorAll('input')

    inputsFn.forEach((item) => {
        item.addEventListener('dblclick', (e) => {
            if(!e.target.value && e.target.dataset.autocomplete){
                e.target.value = e.target.dataset.autocomplete
            }
        })
    })
    // 2 лабораторная
    const myWorkerGA = new Worker("assets/js/laba2/GA.js");

    const form2 = document.getElementById('form2')
    const resultGA = document.getElementById('resultGA')

    const btnSubmit2 = document.getElementById('btnSubmit2')
    const btnReset2 = document.getElementById('btnReset2')
    const btnClear2 = document.getElementById('btnClear2')

    const flagEps = document.getElementById('flagEps')
    const eps = document.getElementById('eps')

    const commonData2 = document.getElementById('commonData2')

    if (flagEps.checked) {
        eps.show()
        commonData2.style.height = '571px'
    }
    else{
        eps.hide()
        commonData2.style.height = '499px'
    }

    flagEps.addEventListener('input', (e) => {
        if (e.target.checked) {
            eps.show()
            commonData2.style.height = '571px'
        }
        else{
            eps.hide()
            commonData2.style.height = '499px'
        }
    })

    if (flagEps2.checked) {
        form2.eps.value = ''
        form2.eps.setAttribute('disabled', 'disabled')
    }
    else{
        form2.eps.removeAttribute('disabled')
    }

    flagEps2.addEventListener('input', (e) => {
        if (e.target.checked) {
            form2.eps.value = ''
            form2.eps.setAttribute('disabled', 'disabled')
        }
        else{
            form2.eps.removeAttribute('disabled')
        }
    })

    let GaI = 1

    btnReset2.addEventListener('click', () => {
        form2.reset()
    })

    btnClear2.addEventListener('click', () => {
        GaI = 1
        resultGA.innerHTML = ''
    })


    form2.addEventListener('submit', (e) => {
        e.preventDefault()

        // btnStop.addEventListener('click', () => {
        //     myWorkerMonte.terminate()
        //     myWorkerMonte = new Worker("../assets/js/MK.js");
        //
        //     myWorkerAnnealing.terminate()
        //     myWorkerAnnealing = new Worker("../assets/js/AN.js");
        // })


        const leftBorderX = Number(form2.leftBorderX.value)
        const rightBorderX = Number(form2.rightBorderX.value)

        const leftBorderY = Number(form2.leftBorderY.value)
        const rightBorderY = Number(form2.rightBorderY.value)
        const fnInput = form2.fnInput.value

        // const range = []
        // for (let i = 0; i < rightBorder - leftBorder; i++) {
        //     range[i] = leftBorder + i
        // }

        // Генетический алгоритм
        const k = form2.k.value
        const k2 = form2.k2.value
        const n = form2.n.value
        const p = form2.p.value

        const flagIter = form2.flagIter.checked
        const flagEps = form2.flagEps.checked
        const flagEps2 = form2.flagEps2.checked
        const epsInput = form2.eps.value

        if(!flagIter && !flagEps){
            alert('Выберите какой-либо критерий останова!')
            return
        }

        if(!epsInput && !flagEps2 && flagEps){
            alert('Выберите точность!')
            return
        }

        console.log(flagIter, flagEps)
        const start = new Date().getTime()

        resultGA.innerHTML += `<div class=\"result main-block\"><h2>Результат ${GaI}</h2><div class="main-block main-block-white main-block-GA-${GaI}">
        <div class="main-block-white-progress" id="progressGA${GaI}"></div>
        <div class="loader" id="GaLoader${GaI}">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;"
                         width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <defs>
                            <path id="path" d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15" fill="none"></path>
                            <path id="patha" d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0" fill="none"></path>
                        </defs>
                        <g transform="rotate(0 50 50)">
                            <use xlink:href="#path" stroke="#000000" stroke-width="3"></use>
                        </g>
                        <g transform="rotate(60 50 50)">
                            <use xlink:href="#path" stroke="#000000" stroke-width="3"></use>
                        </g>
                        <g transform="rotate(120 50 50)">
                            <use xlink:href="#path" stroke="#000000" stroke-width="3"></use>
                        </g>
                        <g transform="rotate(0 50 50)">
                            <circle cx="50" cy="15" r="9" fill="#e15b64">
                                <animateMotion dur="0.5s" repeatCount="indefinite" begin="0s">
                                    <mpath xlink:href="#patha"></mpath>
                                </animateMotion>
                            </circle>
                        </g>
                        <g transform="rotate(60 50 50)">
                            <circle cx="50" cy="15" r="9" fill="#f8b26a">
                                <animateMotion dur="0.5s" repeatCount="indefinite" begin="-0.08s">
                                    <mpath xlink:href="#patha"></mpath>
                                </animateMotion>
                            </circle>
                        </g>
                        <g transform="rotate(120 50 50)">
                            <circle cx="50" cy="15" r="9" fill="#abbd81">
                                <animateMotion dur="0.5s" repeatCount="indefinite" begin="-0.1666s">
                                    <mpath xlink:href="#patha"></mpath>
                                </animateMotion>
                            </circle>
                        </g>
                    </svg>
                </div>
        </div></div>`

        myWorkerGA.postMessage([leftBorderX, rightBorderX, leftBorderY, rightBorderY, fnInput, k, k2, n, p, flagIter, flagEps, flagEps2, epsInput, start])
        btnSubmit2.setAttribute('disabled', 'disabled')
        btnClear2.setAttribute('disabled', 'disabled')

        console.log('Message posted to worker')
    })

    myWorkerGA.onmessage = function(e) {
        const progressBar = document.getElementById(`progressGA${GaI}`)

        if(e.data.length !== 4){
            btnSubmit2.setAttribute('disabled', 'disabled')
            btnClear2.setAttribute('disabled', 'disabled')
            progressBar.style.transform = e.data
            return false
        }
        progressBar.style.transform = 'translateY(226px)'
        const output = document.querySelector(`.main-block-GA-${GaI}`)
        const GaLoader = document.getElementById(`GaLoader${GaI}`)
        GaLoader.style.display = 'none'

        GaI++

        GaLoader.style.display = 'none'
        e.data.forEach((item) => {
            output.innerHTML += `<div>${item}</div>`
        })

        console.log(e.data)
        btnSubmit2.removeAttribute('disabled')
        btnClear2.removeAttribute('disabled')

        // resultMonte.append(output)
    }

    const arr = [[3, 15], [41, 12], [30, 100]]
    const arr2 = [12,100,34,-500]
    let arr3 = [12,100,34]

    arr.sort((a,b) => a[1] - b[1])
    console.log(math.sum(arr2))
    console.log(Math.max(...arr3))

    // for (let i = 0; i < 10; i++) {
    //     console.log(math.random(1, 10))
    // }
    // let res
    // let k = 1
    //
    // const eps = (k) => {
    //     return Math.pow(10, -k)
    // }
    //
    // while (1) {
    //     res = eps(k);
    //     if (res === 0){
    //         break
    //     }
    //     else {
    //         k++
    //     }
    // }
    // console.log(k)

    const fn = (x, y, f) => {
        let scope = {
            x: x,
            y: y
        }
        return math.evaluate(f, scope)
    }

    const fff = '4*x*x - 2.1*x*x*x*x + x*x*x*x*x*x/3 + x*y - 4*y*y + 4*y*y*y*y'
    const fff2 = 'x^6/3 + y^6/3'
    // console.log(fn(2, 2, fff2))
    // console.log(Math.abs(4 - 5))
    // console.log(math.random(0, 1) < 0.5)

    const functions = [
        {
            function: '(x + 2y - 7)^2 + (2x + y -5)^2',
            borderX: '-10',
            borderY: '10'
        },
        {
            function: '4x^2 - 2.1x^4 + x^6/3 + x*y - 4y^2 + 4y^4',
            borderX: '-5',
            borderY: '5'
        },
        {
            function: '2x^2 - 1.05x^4 + x^6/3 + x*y + y^2',
            borderX: '-5',
            borderY: '5'
        },
        {
            function: '0.26(x^2 + y^2) - 0.48x*y',
            borderX: '-10',
            borderY: '10'
        },
        {
            function: 'x^2 + y^2 - cos(12x) - cos(18y)',
            borderX: '-1',
            borderY: '1'
        },
        {
            function: '(x^2 + y^2)/200 - cos(x)*cos(y/sqrt(2)) + 1',
            borderX: '-100',
            borderY: '100'
        },
        {
            function: 'x^4 + 4x^3 + 4x^2 + y^2',
            borderX: '-5',
            borderY: '5'
        },

    ]

    const leftBorderXinput = document.getElementById('leftBorderX2')
    const rightBorderXinput = document.getElementById('rightBorderX2')

    const leftBorderYinput = document.getElementById('leftBorderY2')
    const rightBorderYinput = document.getElementById('rightBorderY2')

    const fn2 = document.getElementById('fn2')




    var str3 = 'rty123qwe';
    var found = str3.match(/[a-z\s]+/ig);
    found.join(""); //rtyqwe
    let str4 = found.join("")
    let exception = ['cos', 'sin', 'tan', 'tg', 'ctg']
    let flag = false
    exception.forEach((item) => {
        if(str3.includes(item)){
            flag = true
        }
    })

    fn2.addEventListener('input', (e) => {
        flag = false
        exception.forEach((item) => {
            if(e.target.value.includes(item)){
                flag = true
            }
        })
        console.log(flag)
        functions.forEach((item) => {

            if(e.target.value === item.function){
                leftBorderXinput.value = item.borderX
                rightBorderXinput.value = item.borderY
                leftBorderYinput.value = item.borderX
                rightBorderYinput.value = item.borderY
            }
        })
    })



    function onePoint(opt) {
        let arg1 = opt.arg1;
        let arg2 = opt.arg2;
        let points = { 1: {}, 2: {} };
        for (let key in arg1) {
            let a1 = Number(arg1[key]).toString(2);
            let a2 = Number(arg2[key]).toString(2);

            let max_len = math.max(a1.length, a2.length);
            a1 = a1.padStart(max_len, "0");
            a2 = a2.padStart(max_len, "0");
            let bp = math.round(math.random(1, max_len));
            let b1 = a1.substring(0, bp) + a2.substring(bp);
            let b2 = a2.substring(0, bp) + a1.substring(bp);
            points[1][key] = parseInt(b1, 2);
            points[2][key] = parseInt(b2, 2);
        }
        return points;
    }

    const sep = (xs, s) => xs.length ? [xs.slice(0, s), ...sep(xs.slice(s), s)] : []


    function crossOne(x,y) {
        // let arg1 = x;
        // let arg2 = y;
        // let points = [ ];
        // let a1 = arg1
        // let a2 = arg2

        let a1 = Number(x).toString(2);
        let a2 = Number(y).toString(2);

        let max_len = 8;
        a1 = a1.padStart(max_len, "0");
        a2 = a2.padStart(max_len, "0");
        // let bp = math.round(math.random(1, max_len));
        // let b1 = a1.substring(0, bp) + a2.substring(bp);
        // let b2 = a2.substring(0, bp) + a1.substring(bp);

        // b1 = sep(b1, 4)
        // a1 = parseInt(a1,2)

        let arr1 = []

        points[0] = a1
        points[1] = a2
        return points;
    }

    const points = {
        arg1: ['1', '2', '2'],
        arg2: ['2', '2', '3']
    }

    function onePoint2(x,y) {
        let arg1 = x;
        let arg2 = y;
        let points = [ ];
        // let a1 = Number(arg1).toString(2);
        // let a2 = Number(arg2).toString(2);

        let max_len = 8;
        let a1 = x.padStart(max_len, "0");
        let a2 = y.padStart(max_len, "0");
        let bp = math.round(math.random(1, max_len));
        let b1 = a1.substring(0, bp) + a2.substring(bp);
        let b2 = a2.substring(0, bp) + a1.substring(bp);

        let arr1 = [parseInt(b1, 2)/256, (parseInt(b1, 2)+20)/256]
        let arr2 = [parseInt(b2, 2)/256, (parseInt(b2, 2)+20)/256]


        points[0] = b1
        points[1] = b2
        // points[0] = parseInt(b1, 2);



        // points[1] = parseInt(b2, 2);
        return points;
    }

    const str = 3
    let str2 = str.toString(2)

    const fromBinaryD = (n, a, b) => a + (parseInt(n, 2)/256 + (parseInt(n, 2)+1)/256)/2*(b-a)

    str2 = str2.padStart(8, "0");
    console.log(parseInt(onePoint2('11111000','10111111')[0], 2)  )
    console.log(fromBinaryD(onePoint2('11111000','10111111')[0], -10, 10) )
    console.log((math.randomInt(-10, 10)).toString(2).padStart(8, "0"))
    // console.log(parseInt(onePoint2('10001000','11111111')[0], 2) / 256 * (20) )
    // console.log(str2)

})
