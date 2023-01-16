function iniciaRelogio() {
  cron = setInterval(timer, 1000);
}

function timer() {
    segundos++;  
    document.querySelector('.relogio').innerText = segundos;  
}
//Reiniciar jogo?
function jogarNovamente(novo_jogo){
    let c = false;
    while (c == false){
        let novo_jogo = prompt("Deseja jogar novamente?");
        if (novo_jogo == "sim"){
            c = true;
            location. reload();            
        }
        else if(novo_jogo =="não"){
            c = true;
        }
        else alert("Desculpe, eu não te entendi. Digite novamente!");        
    }
}
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
        //contador de jogadas:
        jogadas++;
        //Só entra aqui na segunda escolha de carta
        if (img_carta.src==carta_virada.querySelector('img').src){
            img_carta=''; //Acertou!
            let total_de_cartas = document.querySelectorAll('.front-face');
            if (total_de_cartas.length==qtd_cartas) {
                // Fim de jogo                  
                clearInterval(cron);
                setTimeout(alert,500,`Você ganhou em ${jogadas} jogadas! A duração do jogo foi de ${segundos} segundos!` );//Tempo de girar a carta
                setTimeout(jogarNovamente, 1000);
            }
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
    img_carta.parentNode.parentNode.querySelector(':nth-child(1)').classList.remove('front-face');
    nova_carta.parentNode.parentNode.querySelector(':nth-child(1)').classList.remove('front-face');
    //Reabilita os cliques
    document.removeEventListener("click", handler, true);    
    img_carta='';
}

//Montagem do site e variáveis globais
let cron;
let minute = 0;
let segundos = 0;
let jogadas = 0;
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
//Inicia relógio
iniciaRelogio();
//Cria baralho com o número certo de cartas
baralho = imagens.slice(0, (qtd_cartas/2));
baralho = baralho.concat(baralho); //Duplica o array e se adiciona nele mesmo
baralho.sort(comparador);
//Seleciona o conteúdo do site
let cartas = document.querySelector('main');
//Espalha as cartas no main, na ordem do array definido
for (let i = 0; i < qtd_cartas; i++) {
    cartas.innerHTML+=`<div class="card" data-test="card">
                            <div class="face" onclick="selecionaCarta(this)">
                                <img data-test="face-down-image" src="imgs/back.png" alt="">
                            </div>
                            <div class="escondido face">
                                <img data-test="face-up-image" src="imgs/${baralho[i]}parrot.gif" alt="">
                            </div>
                        </div>`;
}