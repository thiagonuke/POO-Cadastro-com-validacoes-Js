class Candidate {

    constructor(){
      this.id = 1;
      this.arrayCandidates = [];
      this.arrayvaga = [];
    }




    salvar(){
      let candidate = this.lerDados();
      
      if(this.ValidaCampos(candidate)){
        this.adicionar(candidate);
        alert('Candidato salvo com sucesso!');
      
      this.listaTabela();
      console.log(this.arrayCandidates);  
      }  
    }
    
    listaTabela(){
      let tbody = document.getElementById('tbody');
      tbody.innerText = '';

      for (let i = 0; i < this.arrayCandidates.length; i++){
        let tr = tbody.insertRow();

        let td_nome = tr.insertCell();
        let td_datanasc = tr.insertCell();
        let td_sobrenome = tr.insertCell();
        let td_cpf = tr.insertCell();
        let td_idade = tr.insertCell();
        let td_opcao = tr.insertCell();
        let td_vaga = tr.insertCell();

        td_nome.innerText = this.arrayCandidates [i].nome;
        td_sobrenome.innerText = this.arrayCandidates [i].sobrenome;
        td_cpf.innerText = this.arrayCandidates [i].cpf;
        td_datanasc.innerText = this.arrayCandidates [i].datanasc;
        td_idade.innerText = this.arrayCandidates [i].idade;
        td_opcao.innerText = this.arrayCandidates [i].maioridade;
        td_vaga.innerText = this.arrayCandidates [i].vaga;
      }
    }


    lerDados(){
      let candidate ={};

      candidate.nome = this.nome;
      candidate.nome = document.getElementById('nome').value;
      candidate.sobrenome = document.getElementById('sobrenome').value;
      candidate.cpf = document.getElementById('cpf').value;
      candidate.datanasc = document.getElementById('datanasc').value;
      candidate.idade = document.getElementById('idade').value;
      candidate.maioridade = document.getElementById('opcao').value;
      candidate.vaga = document.getElementById('vaga').value;

      return candidate;
    }

    adicionar(candidate){
      this.arrayCandidates.push(candidate);
      this.id++

    }

    ValidaCampos(candidate){
      let msg = '';

      if(candidate.nome == ''){
        msg += '- Preencha o nome \n';
      }
      if(candidate.sobrenome == ''){
        msg += '- Preencha o Sobrenome \n';
      }
      if(candidate.cpf == ''){
        msg += '- Preencha o cpf \n';
      }
      if(candidate.datanasc == ''){
        msg += '- Preencha a Data de Nascimento \n';
      }
      if(candidate.idade == ''){
        msg += '- Preencha a Idade \n';
      }
      if(candidate.vaga == ''){
        msg += '- Preencha a Vaga Requerida\n';
      }

      if(msg != ''){
        alert(msg);
        return false;
      }
      
      return true;
    }


}


var candidate = new Candidate();

var btn = document.querySelector('#show-or-hide');
var container = document.querySelector('.area-tabela');

btn.addEventListener('click', function(){

  if(container.style.display === 'block'){
    container.style.display = 'none';
  } else{
    container.style.display = 'block';
  }
});




class Validator{
    constructor(){
        this.validations = [
            'data-required',
            'data-min-length', 
            'data-max-length', 
            
        ]
    }
    // iniciando validaçao

validate(form){

  // limpar validação
  let currentValidations = document.querySelectorAll('form .error-validation');

  if(currentValidations.length > 0){
    this.cleanvalidations(currentValidations);
  }

//inputs
  let inputs = form.getElementsByTagName('input');

    // Trandormar em array

  let inputsArray = [...inputs];

    
        // loop nos arrays
  inputsArray.forEach(function(input){
        
    //loop nas validações de input   
    for (let i = 0; this.validations.length > i; i++){
        //verifica se existe validação no input
        if(input.getAttribute(this.validations[i]) !=null){
            //limpar string e virar metodo
            let method = this.validations[i].replace('data-', '').replace('-', '');

            // valor input
            let value = input.getAttribute(this.validations[i]);

            //metodo:
            this[method](input, value);
        }
  }

  }, this);
  }
    // verificação numero min de caracter
  minlength(input, minValue){
    let inputLength = input.value.length;

    let errorMessage = `Preencha o campo com pelo menos ${minValue} caracteres`;
    if(inputLength < minValue){
        this.printMessage(input, errorMessage);
    }
  }

    // max de caracteres validaçao
  maxlength(input, maxValue) {
    let inputLength = input.value.length;

    let errorMessage = `Preencha o campo com menos ${maxValue} caracteres`;
    if(inputLength > maxValue){
        this.printMessage(input, errorMessage);
    }
  }

    // imprimir erros 
  printMessage(input, msg){
    let errorQty = input.parentNode.querySelector('.error-validation');
    if (errorQty === null){
    let template = document.querySelector('.error-validation').cloneNode(true);

    template.textContent = msg;

    let inputParent = input.parentNode;

    template.classList.remove('template');

    inputParent.appendChild(template);
    }
  }  
  
    // required
  required(input){
    let inputValue = input.value;
  
    if (inputValue === ''){
      let errorMessage = 'Campo obrigatorio*'
  
      this.printMessage(input, errorMessage);
  
    }
      
  }


  

  //clear validations
  cleanvalidations(validations){
    validations.forEach(el => el.remove());
  }
  
}    




let form = document.getElementById("form-register");
let submit = document.getElementById("btn");

let validator = new Validator();

// verificações de validação

submit.addEventListener('click', function(e){

    e.preventDefault();

    validator.validate(form);
});

