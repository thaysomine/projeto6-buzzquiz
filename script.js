let quizData = [];
// requisição para buscar todos os quizzes
const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promisse.then(renderQuizzes);

// função para renderizar os quizzes retirados da api
function renderQuizzes(reply) {
    quizData = reply.data;
    console.log(quizData);
    const quizList = document.querySelector(".all-quizzes");
    console.log(quizList);

    for (let i=0; i< quizData.length; i++) {
        quizList.innerHTML +=`
        <div class="quiz-main">
            <img src="${quizData[i].image}" alt="modelo">
            <div class="description">${quizData[i].title}</div>
        </div>
        `;
    }
}


//função para quando o usuário clicar pra criar quizz//
function createQuizz() {
    const hide = document.querySelector('.main-content');
    hide.classList.add('hiden');
    const show = document.querySelector('screen1-creating-quizz');
    show.classList.remove('hiden');
}