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

        if(!epsInput && !flagEps2){
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

    arr.sort((a,b) => a[1] - b[1])
    // console.log(math.random(-0.1, 0.1))

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
})
