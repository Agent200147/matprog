"use strict";

window.addEventListener('load', () => {

    const myWorkerMonte = new Worker("assets/js/MK.js");
    const myWorkerAnnealing = new Worker("assets/js/AN.js");

    const form = document.getElementById('form')
    const resultMonte = document.getElementById('resultMonte')
    const monteLoader = document.getElementById('monteLoader')

    const resultAnnealing = document.getElementById('resultAnnealing')
    const annealingLoader = document.getElementById('annealingLoader')
    const btnSubmit = document.getElementById('btnSubmit')
    const btnReset = document.getElementById('btnReset')
    // const btnStop = document.getElementById('btnStop')
    const btnClear = document.getElementById('btnClear')

    let monteI = 1
    let annealingI = 1



    btnReset.addEventListener('click', () => {
        form.reset()
    })

    btnClear.addEventListener('click', () => {
        monteI = 1
        annealingI = 1
        resultMonte.innerHTML = ''
        resultAnnealing.innerHTML = ''
    })


    form.addEventListener('submit', (e) => {
        e.preventDefault()

        // btnStop.addEventListener('click', () => {
        //     myWorkerMonte.terminate()
        //     myWorkerMonte = new Worker("../assets/js/MK.js");
        //
        //     myWorkerAnnealing.terminate()
        //     myWorkerAnnealing = new Worker("../assets/js/AN.js");
        // })


        const leftBorder = Number(form.leftBorder.value)
        const rightBorder = Number(form.rightBorder.value)
        const fnInput = form.fnInput.value

        const range = []
        for (let i = 0; i < rightBorder - leftBorder; i++) {
            range[i] = leftBorder + i
        }

        // Монте-Карло
        const N = form.monteIteration.value

        // Имитация отжига
        const Tmax = form.annealingT.value
        const r = form.annealingR.value
        const L = form.annealingL.value

        const start= new Date().getTime()

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
        btnSubmit.setAttribute('disabled', 'disabled')
        btnClear.setAttribute('disabled', 'disabled')

        console.log('Message posted to worker')



        // monteLoader.style.display = 'block'
        // annealingLoader.style.display = 'block'

    })

    myWorkerMonte.onmessage = function(e) {
        const progressBar = document.getElementById(`progressMonte${monteI}`)

        if(e.data.length !== 4){
            btnSubmit.setAttribute('disabled', 'disabled')
            btnClear.setAttribute('disabled', 'disabled')
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

        btnSubmit.removeAttribute('disabled')
        btnClear.removeAttribute('disabled')

        // resultMonte.append(output)
    }

    myWorkerAnnealing.onmessage = function(e) {
        const progressBar = document.getElementById(`progressAnnealing${annealingI}`)

        if(e.data.length !== 4){
            btnSubmit.setAttribute('disabled', 'disabled')
            btnClear.setAttribute('disabled', 'disabled')
            progressBar.style.transform = e.data
            return false
        }
        progressBar.style.transform = 'translateY(226px)'
        const output = document.querySelector(`.main-block-annealing-${annealingI}`)
        const annealingLoader = document.getElementById(`annealingLoader${annealingI}`)
        annealingLoader.style.display = 'none'

        // output.innerHTML = `<h2>Результат ${annealingI}</h2>`
        // const output2 = document.createElement('div')
        // output2.classList.add('main-block', 'main-block-white')
        annealingI++

        e.data.forEach((item) => {
            output.innerHTML += `<div>${item}</div>`
        })
        btnSubmit.removeAttribute('disabled')
        btnClear.removeAttribute('disabled')
    }

    // // Имитация отжига
    // formAnnealing.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     const leftBorder = Number(formAnnealing.leftBorder.value)
    //     const rightBorder = Number(formAnnealing.rightBorder.value)
    //     const fnInput = formAnnealing.fnInput.value
    //
    //     const range = []
    //     for (let i = 0; i < rightBorder - leftBorder; i++) {
    //         range[i] = leftBorder + i
    //     }
    //
    //     const start = new Date().getTime()
    //
    //     myWorkerAnnealing.postMessage([leftBorder, rightBorder, fnInput, N, range, start]);
    //     console.log('Message posted to worker');
    //     annealingLoader.style.display = 'block'
    // })
    // let monteI = 1
})
