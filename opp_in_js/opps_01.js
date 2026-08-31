class Opp {
    constructor() {
        console.log("constructor Method");
    }
    prototype() {
        console.log("Prototype Method");
    }
    static Static() {
        console.log("Static Method");
    }
}

let a = new Opp()
a.prototype()
Opp.Static()