function Script() {
    let pass1 = document.f1.pass1.value
    let pass2 = document.f1.pass2.value

    if (pass1 === pass2) {
        return true
    } else {
       alert("Las dos claves son distintas")
    }
}

export default Script