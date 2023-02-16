onmessage = function(e) {
    importScripts('../lib/Math.js')

    const leftBorder = e.data[0]
    const rightBorder = e.data[1]
    const fnInput = e.data[2]
    const N = e.data[3]
    const start = e.data[4]
    const monteI = e.data[5]



    const random = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    const fn = (x, y, f) => {
        let scope = {
            x: x,
            y: y
        }
        return math.evaluate(f, scope)
    }

    const mkf = (a, b, fnInput, n) => {
        let x = []
        let y = []

        let xMin
        let yMin

        let f = 0
        for (let i = 0; i < n; i++) {
            x.push(random(a, b))
            y.push(random(a, b))

            if(i === 0){
                f = fn(x[i], y[i], fnInput)
                xMin = x[i]
                yMin = y[i]
            }
            else{
                if (fn(x[i], y[i], fnInput) < fn(xMin, yMin, fnInput)){
                    f = fn(x[i], y[i], fnInput)
                    xMin = x[i]
                    yMin = y[i]
                }
            }
            postMessage(`translateY(${ -(i / n * 226)}px)`)
        }

        const end = new Date().getTime()
        const time = (end - start) / 1000

        return result = ["xMin = <strong>" + xMin.toFixed(5) + "</strong>",
            "yMin = <strong>" + yMin.toFixed(5) + "</strong>",
            "F = <strong>" + f.toFixed(5) + "</strong>",
            `Время: <strong>${time}</strong>с`]
    }

    // mkf(leftBorder, rightBorder, fnInput, N, start)

    // const workerResult = mkf(leftBorder, rightBorder, fnInput, N, start)
    postMessage(mkf(leftBorder, rightBorder, fnInput, N, start));
}