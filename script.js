let quizData = []; 

let numQuestions = 1;  //constante p guardar o número de perguntas que o usuário escolher na criação do quizz
let levelQuestions; //constante p guardar nível que o usuário escolher na criação do quizz
let newQuiz = [];

let idHolder = null;
let saveData;
let lock = false;

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
    const answersUnrandomized = question.answers
    const answers = answersUnrandomized.sort(()=> Math.random() - 0.5);
    console.log(answers);
    let quizAnswers = "";
    answers.forEach(answer => {
        quizAnswers += `
        <div onclick="chooseAnswer(this)" class="answer ${answer.isCorrectAnswer}">
            <img src="${answer.image}">
            <h3>${answer.text}</h3>
        </div>
        `; 
    });
    console.log(quizAnswers)
    return quizAnswers;
}

// função para selecionar a resposta clicada e realizar as mudanças necessarias
function chooseAnswer(answerElement) {
    console.log(answerElement);
    answerElement.classList.add("select")
    let parentElement = answerElement.parentNode;
    let selectAnswer = parentElement.querySelectorAll(".answer")

    selectAnswer.forEach(answer => {
        let elementSelect = answer.classList.contains("select")
        if (elementSelect === false) {
            answer.classList.add("fog");
            answer.setAttribute("onclick","");
        } else {
            answer.setAttribute("onclick","");
        }
    });
    // chamar a função para revelar respostas
    answerResult(answerElement);
}
function answerResult(answerElement) {
    let parentElement = answerElement.parentNode;
    let selectAnswer = parentElement.querySelectorAll(".answer h3");
    console.log(selectAnswer);

    let aleatoria = parentElement.querySelector(".true h3");
    aleatoria.style.color="green";

    let para = parentElement.querySelectorAll(".false h3"); 
    para.forEach(answer => {
            answer.style.color="red";
    });
}

// função para voltar a pag inicial ao clicar no botão
function goToHome() {
    window.location.reload(true);
}



//--------------------------------------------------------------------------------------------------------
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

    if ((title.length < 20) || (title.length > 65) || (qtQuestion < 3) || (levels < 2) || (validateURL(urlImg) === false)) {
        alert("Preencha os dados corretamente!");
    } else {
        newQuiz = {
            title: title,
            image: urlImg,
            questions: [],
            levels: [],
        }
        console.log(newQuiz);
        questionsQuizz();
    }
}

// função p validar url (acho q vamos usar mais vezes)

function validateURL(url) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

// renderizando as perguntas do quizz a partir da quantidade definida pelo user na tela anterior
function questionsQuizz() {
    const hide = document.querySelector('.first-page');
    hide.classList.add('hiden');
    const show = document.querySelector('.second-page');
    show.classList.remove('hiden');
    console.log(numQuestions);

    const questionsQuizz = document.querySelector(".screen2-creating-quizz");

    for (let i = 0; i < numQuestions; i++) {
        questionsQuizz.innerHTML += `
        <div onclick="toggleQuestions(${i + 1})" class="question-name">
            <h2>Pergunta ${i + 1}</h2>
            <button><ion-icon class="iconeQuiz" name="create-outline"></ion-icon></button>
        </div>
        <div class="container${i + 1} hiden">
            <div class="containerReal">
                <input type="text" class="n${i + 1}question-text-quiz" placeholder="Texto da pergunta">
                <input type="text" placeholder="Cor de fundo da pergunta" class="n${i + 1}color-question-quiz">
                <h2>Resposta correta</h2>
                <input type="text" placeholder="Resposta correta" class="n${i + 1}right-answer-quiz">
                <input type="text" placeholder="URL da imagem" class="n${i + 1}right-answer-url-quiz">
                <h2>Respostas incorretas</h2>
                <input type="text"  class="spaceCss n${i + 1}incorrect-answer1" placeholder="Resposta incorreta 1">
                <input type="text" class="n${i + 1}incorrect-answer1-url-quiz" placeholder="URL da imagem 1">
                <input type="text"  class="spaceCss n${i + 1}incorrect-answer2" placeholder="Resposta incorreta 2">
                <input type="text" class="n${i + 1}incorrect-answer2-url-quiz" placeholder="URL da imagem 2">
                <input type="text"  class="spaceCss n${i + 1}incorrect-answer-3" placeholder="Resposta incorreta 3">
                <input type="text" class="n${i + 1}incorrect-answer3-url-quiz" placeholder="URL da imagem 3">
            </div>
        </div>
        
        `
    }
    questionsQuizz.innerHTML += `<button class="next" onclick="saveQuestions()">Prosseguir pra criar níveis</button>
    `
}

// função pra agrupar as respostas em cada pergunta na tela 3-2
function toggleQuestions(questionNumber) {
    let question = document.querySelector(".container" + questionNumber);
    question.classList.toggle('hiden');
}

//função pra validar input hexadecimal
function validateHexa(color) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(color);
}

//função pra chamar a função de validação pra cada resposta(i) na tela de respostas 3-2
function saveQuestions() {
    for (i = 0; i < numQuestions; i++) {
        checkQuestions(i + 1);
        console.log("teste2")
    }
    quizLevels();
}

//função validação pra cada resposta(i) na tela de respostas 3-2
function checkQuestions(numQuest) {
    let checkAnswer3 = true;
    let checkAnswer4 = true;
    let answers = [];

    const questionTitle = document.querySelector(".n" + numQuest + "question-text-quiz").value;
    const questionColor = document.querySelector(".n" + numQuest + "color-question-quiz").value;

    const questionCorrectAnswer = document.querySelector(".n" + numQuest + "right-answer-quiz").value;
    const questionCorrectAnswerURLImage = document.querySelector(".n" + numQuest + "right-answer-url-quiz").value;

    const questionIncorrectAnswer1 = document.querySelector(".n" + numQuest + "incorrect-answer1").value;
    const questionIncorrectAnswer1URLImage = document.querySelector(".n" + numQuest + "incorrect-answer1-url-quiz").value;

    const questionIncorrectAnswer2 = document.querySelector(".n" + numQuest + "incorrect-answer2").value;
    const questionIncorrectAnswer2URLImage = document.querySelector(".n" + numQuest + "incorrect-answer2-url-quiz").value;

    if ((questionIncorrectAnswer2 === '') || (questionIncorrectAnswer2URLImage === '')) {
        checkAnswer3 = false;
    }

    const questionIncorrectAnswer3 = document.querySelector(".n" + numQuest + "incorrect-answer2").value;
    const questionIncorrectAnswer3URLImage = document.querySelector(".n" + numQuest + "incorrect-answer2-url-quiz").value;

    if ((questionIncorrectAnswer3 === '') || (questionIncorrectAnswer3URLImage === '')) {
        checkAnswer4 = false;
    }


    if ((questionTitle.length < 20) || (questionCorrectAnswer === '') || (validateURL(questionCorrectAnswerURLImage) === false) || (validateHexa(questionColor) === false) || (questionIncorrectAnswer1 === '') || (validateURL(questionIncorrectAnswer1URLImage) === false)) {
        alert("Preencha os dados corretamente!");
    } else {
        alert('ok')

        const answer1 = {
            text: questionCorrectAnswer,
			image: questionCorrectAnswerURLImage,
			isCorrectAnswer: true
        }

        const answer2 = {
            text: questionIncorrectAnswer1,
			image: questionIncorrectAnswer1URLImage,
			isCorrectAnswer: false
        }

        const answer3 = {
            text: questionIncorrectAnswer2,
			image: questionIncorrectAnswer2URLImage,
			isCorrectAnswer: false
        }

        const answer4 = {
            text: questionIncorrectAnswer3,
			image: questionIncorrectAnswer3URLImage,
			isCorrectAnswer: false
        }

        //Checando quais respostas foram preenchidas pra dar o push no objeto

        if ((checkAnswer3 === true) && (checkAnswer4 === true)) {
            answers.push(answer1, answer2, answer3, answer4);
        }

        if ((checkAnswer3 === true) && (checkAnswer4 === false)) {
            answers.push(answer1, answer2, answer3);
        }

        if ((checkAnswer3 === false) && (checkAnswer4 === false)) {
            answers.push(answer1, answer2);
        }

    }

    const object = {
        title: questionTitle,
        color: questionColor,
        answers: answers,
    }

newQuiz.questions.push(object);
console.log(newQuiz)
}

// renderizando os niveis do quizz a partir da quantidade definida pelo user na tela anterior
function quizLevels() {
    const hide = document.querySelector('.second-page');
    hide.classList.add('hiden');
    const show = document.querySelector('.third-page');
    show.classList.remove('hiden');

    const levelsQuizz = document.querySelector(".screen3-creating-quizz");

    for (let i = 0; i < levelQuestions; i++) {
        levelsQuizz.innerHTML += `
        <div onclick="toggleLevels(${i + 1})" class="question-name">
            <h2>Nível ${i + 1}</h2>
            <button><ion-icon class="iconeQuiz" name="create-outline"></ion-icon></button>
        </div>
        <div class="containers${i + 1} hiden">
            <div class="containerReal">
                <input type="text" class="n${i + 1}title-level" placeholder="Título do nível">
                <input type="text" class="n${i + 1}min-level" placeholder="% de acerto mínima">
                <input type="text" class="n${i + 1}url-level" placeholder="URL da imagem do nível">
                <input type="text" class="n${i + 1}description-level" placeholder="Descrição do nível">
            </div>
        </div>
        `
    }

    levelsQuizz.innerHTML += `<button class="next" onclick="saveLevels()">Finalizar Quizz</button>`
}

// função pra agrupar as características em cada nivel na tela 3-3
function toggleLevels(questionLevel) {
    let level = document.querySelector(".containers" + questionLevel);
    level.classList.toggle('hiden');
}

//função validação pra cada nivel(i) na tela de niveis 3-3
function checkLevels(numLevel) {
    //let checkAnswer3 = true;
    //let checkAnswer4 = true;

    const levelTitle = document.querySelector(".n" + numLevel + "title-level").value;
    const levelMinRight = document.querySelector(".n" + numLevel + "min-level").value;

    const levelURLimg = document.querySelector(".n" + numLevel + "url-level").value;
    const levelDescription = document.querySelector(".n" + numLevel + "description-level").value;

    
    if ((levelTitle.length < 10) || (levelMinRight < 0) || (levelMinRight > 100) || (validateURL(levelURLimg) === false) || (levelDescription < 30)) {
        alert("Preencha os dados corretamente!");
    } else {
        alert('ok');



    }
}

//função pra chamar a função de validação pra cada resposta(i) na tela de respostas 3-2
function saveLevels() {
    for (i = 0; i < levelQuestions; i++) {
        checkLevels(i + 1);
        console.log("teste2")
    }
    sucessCreatingQuiz();
}

function sucessCreatingQuiz() {
    const hide = document.querySelector('.third-page');
    hide.classList.add('hiden');
    const show = document.querySelector('.fourth-page');
    show.classList.remove('hiden');
}