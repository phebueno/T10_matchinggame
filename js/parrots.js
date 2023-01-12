// Função comparadora para misturar o baralho
function comparador() { 
	return Math.random() - 0.5; 
}

let check = false;
let qtd_cartas = 0;
let imagens = ['bobross','explody','fiesta','metal','revertit','triplets','unicorn'];
let baralho = [];
while (check == false) {
    qtd_cartas = prompt("Olá! Com quantas cartas deseja jogar?");
        //Aceitas apenas números pares, entre 4 e 14  
        if (qtd_cartas >=4 && qtd_cartas<=14 && !(qtd_cartas%2)) {
            check = true;
        }
        else{
            alert("Por favor, digite um número válido!");
        }    
}
//Cria baralho com o número certo de cartas
baralho = imagens.slice(0, (qtd_cartas/2));
baralho = baralho.concat(baralho); //Duplica o array e se adiciona nele mesmo
baralho.sort(comparador);
//Seleciona o conteúdo do site
let cartas = document.querySelector('main');
//Espalha as cartas no main, na ordem do array definido
for (let i = 0; i < qtd_cartas; i++) {
    cartas.innerHTML+=`<div class="card">
                            <div class="front-face face">
                                <img src="imgs/back.png" alt="">
                            </div>
                            <div class="back-face face">
                                <img src="imgs/${baralho[i]}parrot.gif" alt="">
                            </div>
                        </div>`;
}