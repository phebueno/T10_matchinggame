// Função comparadora para misturar o baralho
function comparador() { 
	return Math.random() - 0.5; 
}
// Função para desabilitar temporariamente a página
function handler(e) {
    e.stopPropagation();
    e.preventDefault();
    }
// Seleção de carta
function selecionaCarta(carta){
    carta.classList.add('front-face');
    const carta_virada = carta.parentNode.querySelector(':nth-child(2)'); //passa pelo elemento pai pra identificar o irmão da carta
    carta_virada.classList.add('back-face');
    if (img_carta==''){
        img_carta = carta_virada.querySelector('img');
    }
    else{
        //Só entra aqui na segunda escolha de carta
        if (img_carta.src==carta_virada.querySelector('img').src){
            img_carta=''; //Acertou!
        }
        else{
            //Desabilita os cliques
            document.addEventListener("click", handler, true);
            setTimeout(resetar,1000,carta_virada.querySelector('img'));//Errou, vai resetar a dupla
        }        
    }
}
// Função para identificar a tentativa
function resetar(nova_carta){            
    img_carta.parentNode.classList.remove('back-face');
    nova_carta.parentNode.classList.remove('back-face');
    img_carta.parentNode.classList.add('escondido');
    nova_carta.parentNode.classList.add('escondido');
    img_carta.parentNode.parentNode.querySelector(':nth-child(1)').classList.remove('front-face');
    nova_carta.parentNode.parentNode.querySelector(':nth-child(1)').classList.remove('front-face');
    img_carta='';
    //Reabilita os cliques
    document.removeEventListener("click", handler, true); 
}

//Montagem do site e variáveis globais
let img_carta = '';
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
                            <div class="face" onclick="selecionaCarta(this)">
                                <img src="imgs/back.png" alt="">
                            </div>
                            <div class="escondido face">
                                <img src="imgs/${baralho[i]}parrot.gif" alt="">
                            </div>
                        </div>`;
}