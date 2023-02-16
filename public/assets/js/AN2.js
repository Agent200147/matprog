import calculator_formula from "./calculator_formula"
import { derivative, sqrt } from 'mathjs'
export default {
    method(f, variable, Tmax, L, k, r, eps, gamma, stopper = 100, range = {start: [-10.0, -10.0],
        end: [10.0, 10.0]}) {
        this.f = f
        this.variable = variable
        this.Tmax = Tmax
        this.L = L
        this.k = this.variable.size
        this.r = r
        this.eps = eps
        this.gamma = gamma
        this.range = range
        this.stopper = stopper
        this.history = {i:[], x: [], f: []} 14
        return (this.SimulatedAnnealing())
    },
    randomPoint(){
        let x = []
        for(let i = 0; i < this.k; i++){
            x.push(Math.random() * (this.range.end[i] - this.range.start[i] + 1)
                + this.range.start[i])
        }
        return x
    },
    SimulatedAnnealing(){
        const t0 = performance.now()
        let Ti = this.Tmax
        let xi = this.randomPoint(), xii
        let fi = calculator_formula.calculator(this.f, xi, this.variable, 0), fii
        let index_stop = 1
        let iter = 0
        let t0_0, t0_1, time_user = 0
        this.saveHistory(iter, xi, fi)
        stop_iteration: while(Ti > this.gamma){
            t0_0 = performance.now()
            if(index_stop >= this.stopper){
                index_stop = 1
                if(!confirm("Continue the calculations?")) {
                    t0_1 = performance.now()
                    time_user += t0_1 - t0_0
                    break stop_iteration
                }
            }
            let i = 0
            while(i < this.L){
                xii = this.randomPoint()
                fii = calculator_formula.calculator(this.f, xii, this.variable, 0)
                let delta = fii - fi
                if(delta <= 0) {
                    xi = xii
                    fi = fii
                    this.saveHistory(iter, xi, fi)
                } else if (Math.exp(-delta / Ti) > Math.random()) {
                    xi = xii
                    fi = fii
                    this.saveHistory(iter, xi, fi)
                }
                i++
                index_stop++
                iter++
            }
            Ti *= this.r
        }
        const t1 = performance.now()
        return {x_opt: xi, f_opt: fi, time: t1-t0-time_user, history: this.history}
    },
    saveHistory(i, x, f){
        this.history.i.push(i)
        this.history.x.push(x)
        this.history.f.push(f)
    }
}