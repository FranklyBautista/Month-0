function pedirDatos() {
  const expresion = process.argv.slice(2).join("");

  if (!expresion) {
    console.log("Por favor introduzca un valor (por ejemplo)");
    console.log("node calculadora.js `2+3*41`");
    process.exit(1);
  }

  console.log("La salida de la variable es: "+expresion);


  return expresion;
}

const singleCharacterTokens ={
    "+": "PLUS",
    "-": "MINUS",
    "**": "POW",
    "*": "STAR",
    "/": "SLASH",
    "%": "PERCENT",
    "(": "LPAREN",
    ")": "RPAREN"
}

let valor = pedirDatos();

function tokenizador(valor){
    let tokens = [];

    let separador = valor.split("")


    separador.forEach(element => {
        if(element in singleCharacterTokens){
             tokens.push({type:singleCharacterTokens[element], value: element})
        }else if(!isNaN(element)){
            tokens.push({type:"Number", value: element})
        }
        else{
            tokens.push({type:"EOF"})
        }
       
    });
    
    for(let i=0; i<tokens.length-1; i++){
         if(tokens[i].type === "Number" && tokens[i+1].type === "Number"){
            let combinedValue = tokens[i].value +tokens[i+1].value;
            tokens.splice(i,2,{type:"Number",value: combinedValue});
        } 
    }
    console.log(tokens)

}

probando

tokenizador(valor)
