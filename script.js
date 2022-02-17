let quizData = []; 

let numQuestions = 1;  //constante p guardar o número de perguntas que o usuário escolher na criação do quizz
let levelQuestions; //constante p guardar nível que o usuário escolher na criação do quizz

let idHolder = null;
let saveData;

// requisição para buscar todos os quizzes
const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promisse.then(renderQuizzes);

// função para renderizar os quizzes retirados da api
function renderQuizzes(reply) {
    quizData = reply.data;
    console.log(quizData);
    const quizList = document.querySelector(".all-quizzes");
    console.log(quizList);

    for (let i = 0; i < quizData.length; i++) {
        quizList.innerHTML += `
        <div onclick="goToQuiz(this)" class="quiz-main" id="${quizData[i].id}">
            <img src="${quizData[i].image}" alt="modelo">
            <div class="description">${quizData[i].title}</div>
        </div>
        `;
    }
}

//função para acessar quiz desejado
function goToQuiz(acessQuiz) {
    idHolder = acessQuiz.id;
    console.log(idHolder);
    console.log(acessQuiz);
    const searchQuiz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idHolder}`);
    searchQuiz.then(renderPageTwo);
}

// função para acessar pag do quiz clicado
function renderPageTwo(reply) {
    saveData = reply.data;
    console.log(reply);

    document.querySelector(".main-content").classList.add("hiden");
    document.querySelector(".quiz-page").classList.remove("hiden");
    
    renderBanner(); // função para renderizar banner
    renderQuestions();// função para renderizar perguntas
}

// função para renderizar banner
function renderBanner() {
    const bannerImage = document.querySelector(".quiz-page-image");
    bannerImage.innerHTML = `
    <img src="${saveData.image}">
    <div class="quiz-page-description">${saveData.title}</div>
    `;
}
// função para renderizar perguntas
function renderQuestions() {
    const questions = saveData.questions
    const quizQuestions = document.querySelector(".quiz-questions");
    questions.forEach(question => {
        quizQuestions.innerHTML += `
        <section class="question-card">
                <div class="question-description">${question.title}</div>
                <div class="all-answers">${renderAnswers(question)}</div>
            </section>
        `;
    });
}
// função para renderizar as respostas
function renderAnswers(question) {
    const answers = question.answers
    console.log(answers);
    let quizAnswers = "";
    answers.forEach(answer => {
        quizAnswers += `
        <div class="answer">
            <img src="${answer.image}">
            <h3>${answer.text}</h3>
        </div>
        `; 
    });
    return quizAnswers;
}







//função para quando o usuário clicar pra criar quizz
function createQuizz() {
    const hide = document.querySelector('.main-content');
    hide.classList.add('hiden');
    const show = document.querySelector('.first-page');
    show.classList.remove('hiden');
}

//função p salvar as informações básicas da criação do quizz

function saveBasicInfoQuizz() {
    const title = document.querySelector(".title-quizz").value;
    const urlImg = document.querySelector(".image-url-quizz").value;
    const qtQuestion = Number(document.querySelector(".qt-questions-quizz").value);
    const levels = document.querySelector(".level-quizz").value;

    numQuestions = qtQuestion;
    levelQuestions = levels;

    if ((title.length < 20) || (title.length > 65) || (qtQuestion < 4) || (levels < 3) || (validateURL(urlImg) === false)) {
        alert("Preencha os dados corretamente!");
    } else {
        quiz = {
            title: title,
            image: urlImg,
            quenstions: [],
            levels: [],
        }

        questionsQuizz();
    }
}

// função p validar url (acho q vamos usar mais vezes)

function validateURL(url) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

// criando as perguntas do quizz
function questionsQuizz() {
    const hide = document.querySelector('.first-page');
    hide.classList.add('hiden');
    const show = document.querySelector('.second-page');
    show.classList.remove('hiden');
    console.log(numQuestions);

    const questionsQuizz = document.querySelector(".screen2-creating-quizz");
    //questionsQuizz.innerHTML = `<h1>Crie suas perguntas</h1>`;

    for (let i = 0; i < numQuestions; i++) {
        questionsQuizz.innerHTML += `
        <h2>Pergunta ${i+1}</h2>
        <input type="text" placeholder="Texto da pergunta" class="question-text-quiz">
        <input type="text" placeholder="Cor de fundo da pergunta" class="color-question-quiz">
        <h2>Resposta correta</h2>
        <input type="text" placeholder="Resposta correta" class="right-answer-quiz">
        <input type="text" placeholder="URL da imagem" class="right-answer-img-quiz">
        <h2>Respostas incorretas</h2>
        <input type="text"  class="spaceCss" placeholder="Resposta incorreta 1">
        <input type="text" placeholder="URL da imagem 1">
        <input type="text"  class="spaceCss" placeholder="Resposta incorreta 2">
        <input type="text" placeholder="URL da imagem 2">
        <input type="text"  class="spaceCss" placeholder="Resposta incorreta 3">
        <input type="text" placeholder="URL da imagem 3">
        `
    }

}