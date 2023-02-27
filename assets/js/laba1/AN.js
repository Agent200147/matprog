onmessage = function(e) {
    importScripts('../lib/Math.js')
    const a = e.data[0]
    const b = e.data[1]
    const fnInput = e.data[2]
    const N = e.data[3]
    const L = e.data[4]
    const Tmax = e.data[5]
    const r = e.data[6]
    const eps = 0.000001
    let T = Tmax
    let T_ = Tmax
    // const range = e.data[4]
    const start = e.data[8]

    // const L = 10000

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

    const step = (x, y, t) => {
        let x_S = random(a, b)
        let y_S = random(a, b)
        let delta = fn(x_S, y_S, fnInput) - fn(x, y, fnInput)

        if(delta <= 0){
            return [x_S, y_S]
        }
        else{
            let p = math.exp(-delta / t)

            if (Math.random() < p){
                return [x_S, y_S]
            }
            else{
                return [x, y]
            }
        }
    }

    const anneal = () => {
        // let xMin = select(range)
        // let yMin = select(range)

        let xMin = random(a, b)
        let yMin = random(a, b)
        let i = 0
        let sum = 0
        while(T_ > eps){
            T_ *= r
            sum++
        }

        while(T > eps){
            for (let i = 0; i < L; i++) {
                [xMin, yMin] = step(xMin, yMin, T)
            }
            postMessage(`translateY(${- ((i+2) / (sum) * 226)}px)`)
            i++
            T *= r
        }
        const end = new Date().getTime()
        const time = (end - start) / 1000

        return ["xMin = <strong>" + xMin.toFixed(5) + "</strong>", "yMin = <strong>" + yMin.toFixed(5) + "</strong>", "F = <strong>" + fn(xMin, yMin, fnInput).toFixed(5) + "</strong>", `Время: <strong>${time}</strong>с`]
    }

    postMessage(anneal());
}
