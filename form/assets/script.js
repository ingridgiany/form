class Login {
    constructor(){
        this.formulario = document.querySelector(".form")

        this.eventos()
    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    // Os dados serão validados aqui...
    handleSubmit(event){
        event.preventDefault()

        const camposValidos = this.camposSaoValidos()
        const senhasValidas = this.senhasSaoValidas()

        if(camposValidos && senhasValidas) {
            alert('Formulário enviado.')
            this.formulario.submit()
        }
    }

    senhasSaoValidas(){
        let valid = true

        const senha = this.formulario.querySelector('.pass')
        const repetirSenha = this.formulario.querySelector('.repeatpass')

        if(senha.value !== repetirSenha.value){
            this.criaErro(senha, 'Campo senha e repetir senha precisam ser iguais.')
            this.criaErro(repetirSenha, 'Campo senha e repetir senha precisam ser iguais.')
            valid = false
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres.')
            valid = false
        }

        return valid
    }

    camposSaoValidos(){
        let valid =  true 

        for(let erroText of this.formulario.querySelectorAll('.error-text')){
            erroText.remove()
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText
            if(!campo.value) {
                this.criaErro(campo, `Campo "${label}" não pode estar em branco.`)
                valid = false    
            }

            if(campo.classList.contains('cpfSent')){
                if(!this.validaCPF(campo)) valid = false
            }

            if(campo.classList.contains('user')){
                if(!this.validaUsuario(campo)) valid = false
            }
    
        }
        return valid
    }

    validaUsuario(campo){
        let valid = true

        if(campo.value.length < 3 || campo.value.length > 12){
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.')
            valid = false
        }

        if(!campo.value.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, 'Nome de usuário precisa conter apenas letras e/ou números.')
            valid = false
        }

        return valid
    }


    validaCPF(campo){
        const cpf = new ValidaCpf(campo.value)

        if(!cpf.isValid()){
            this.criaErro(campo, 'CPF inválido.')
            return false
        }
        return true
    }

    criaErro(campo, msg){
        const div =  document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }
}

const valida = new Login()