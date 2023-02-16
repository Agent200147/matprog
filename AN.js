onmessage = function(e) {
    importScripts('../lib/Math.js')

    const leftBorder = e.data[0]
    const rightBorder = e.data[1]
    const fnInput = e.data[2]
    const N = e.data[3]
    const range = e.data[4]
    const start = e.data[5]

    const T = 500
    const L = 1000
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

    const temp = (t) => t - 0.001

    const locOpt = (i, j) => {
        if (j < 1 && i <= 0 && i < j){
            return false
        }

        if (i === 0){
            return [1]

        }
        else if(i === j - 1){
            return [j - 2]
        }
        else{
            return [i - 1, i + 1]
        }
    }

    function select(arr) {
        let index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    const step = (x, y, t) => {
        let x_S = select(range)
        let y_S = select(range)
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
        let x0 = select(range)
        let xMin = x0
        let y0 = select(range)
        let yMin = y0

        let f0 = fn(x0, y0, fnInput)
        let fMin

        let T = 500


        while(T > 0.00001){
            for (let i = 0; i < L; i++) {
                [xMin, yMin] = step(xMin, yMin, T)
            }

            // if(fn(x, y, fnInput) < fn(x_S, y_S, fnInput)){
            //     x_S = x
            //     y_S = y
            // }
            T *= 0.1
            // k += 1
        }

        return [xMin, yMin]
    }

    const vector = () => {
        let result = [...range]
        return result.map((item) => fn(item, item, fnInput))
    }

    const isLocMin = (item, vector) => {
        if(item === 0 && vector[item] < vector[item+1]){
            return true
        }
        else if(vector[item] < vector[item-1] && vector[item] < vector[item+1]){
            return true
        }
        else return item === vector.length - 1 && vector[item] < vector[item - 1];
    }

    const annealMain = () => {
        // const Vector = vector()
        // const minimums = []

        // for (let i = 0; i < Vector.length; i++) {
        //     isLocMin(i, Vector) ? minimums.push(Vector[i]) : false
        // }
        //
        // let x = 0
        // let y = Vector[0]

        const [x, y] = anneal()
        const f = fn(x, y, fnInput)
        const end = new Date().getTime()
        const time = (end - start) / 1000

        return ["xMin = " + x.toFixed(8), "yMin = " + y.toFixed(8), "F = " + f.toFixed(8), `Время: ${time}с`]
    }
    const workerResult = annealMain()
    // mkf(leftBorder, rightBorder, fnInput, N, start)

    postMessage(workerResult);
}