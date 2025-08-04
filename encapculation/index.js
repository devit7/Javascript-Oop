class Counter{
    #counter = 0
    #increment(){
        return this.#counter++;
    }
 
    getIncrement(){
        this.#increment()
    }

    getCounter(){
        return console.log(this.#counter);
    }
}
// # artinya private dan hanya bisa di akses di dalam kelas itu sendiri
let count = new Counter();
count.getIncrement()
count.getIncrement()
count.getCounter()