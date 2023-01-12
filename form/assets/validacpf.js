class ValidaCpf {
    constructor(cpf) {
        this.cpf = cpf
    }
    isValid() {
        let cpfClean = this.cpf.replace(/\D/g, "")
        if (cpfClean.length !== 11 || /^(\d)\1+$/.test(cpfClean)) return false

        let arr = [...cpfClean]
        let newCpf = arr.slice(0, -2)

        let d1Mult = newCpf.map((num, index) => num * (10 - index))
        let d1Add = d1Mult.reduce((accumulator, num) => accumulator += num, 0)

        let account1 = 11 - (d1Add % 11)
        if (account1 > 9) {
            newCpf.push("0")
        } else {
            newCpf.push(String(account1))
        }

        let d2Mult = newCpf.map((num, index) => num * (11 - index))
        let d2Add = d2Mult.reduce((accumulator, num) => accumulator += num, 0)

        let account2 = 11 - (d2Add % 11)
        if (account2 > 9) {
            newCpf.push("0")
        } else {
            newCpf.push(String(account2))
        }

        let cpfFinal = newCpf.join('')
        return cpfFinal === cpfClean
    }
}



