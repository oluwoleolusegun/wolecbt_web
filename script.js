'use strict';

//Storing data into variables
let start_btn = document.querySelector(".start_btn button");
let info_box = document.querySelector(".info_box");
let exit_btn = info_box.querySelector(".buttons .quit");
let continue_btn = info_box.querySelector(".buttons .restart");
let quiz_box = document.querySelector(".quiz_box");
let option_list = document.querySelector(".option_list")
let named = document.getElementById("name-input")
let displayName = document.getElementById("displayName")
let name_box = document.querySelector(".name_box")
let prev_btn = quiz_box.querySelector(".prev_btn");
let next_btn = quiz_box.querySelector(".next_btn");
let submit_btn = quiz_box.querySelector(".submit_btn");
let result_box = document.querySelector(".result_box");
let quit_quiz = result_box.querySelector(".buttons .quit");
let que_text = document.querySelector(".que_text");
let timeDisplay = document.querySelector(".timer_sec");
let correctAns = document.querySelector(".correct_ans");
let errorMessage = document.getElementById("error-txt")
let namedValue = " ";
// Hiding the boxes from displaying at start
document.querySelector(".quiz_box").hidden = true;
document.querySelector(".result_box").hidden = true;
document.querySelector(".info_box").hidden = true;

//The start button
start_btn.onclick = () => {
    if (!named.value) {
        start_btn = null;
        errorMessage.innerHTML = `Enter a name`
    }
    else {
        document.querySelector(".info_box").hidden = false;
        console.log(named.value)
        displayName.innerHTML = `<b>${named.value}</b>`;
        namedValue = named.value
        named.value = " ";
        document.querySelector(".name_box").hidden = true;
    }
}

//The exit button
exit_btn.onclick = () => {
    window.location.reload();
}


// The timer activates immediately the continue button is clicked
let timer = null;
let counter = 90;
continue_btn.onclick = () => {
    document.querySelector(".info_box").hidden = true;
    document.querySelector(".quiz_box").hidden = false;

    // displays the first question and start counting from 1
    showQuestions(que_count);
    queCounter(1);
    // `The timer function`
    timer = setInterval(() => {
        timeDisplay.innerHTML = counter;
        counter--;
        if (counter == 0) {
            clearInterval(timer);
            //displays the result box after timer reaches zero
            showResultBox();
        }
    }, 1000);
}

/* que_count = index of the array
que_numb = number of a question in the array
userScore = points accumulated by player
sel_ans = empty array which stores selected answers 
*/
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let sel_ans = [];


prev_btn.onclick = () => {
    if (que_count) {
        que_count--;
        que_numb--;
        userScore = 0;
        showQuestions(que_count);
        queCounter(que_numb)
    } else {
        console.log("start of questions")
    }
}
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb)
    } else {
        console.log("End of questions")
    }
}
submit_btn.onclick = () => {
    clearInterval(timer);
    showResultBox()
}

function showQuestions(index) {
    if (que_count == 0) {
        document.querySelector(".prev_btn").hidden = true;
    } else {
        document.querySelector(".prev_btn").hidden = false;
    }
    if (que_count == questions.length - 1) {
        document.querySelector(".next_btn").hidden = true;
    } else {
        document.querySelector(".next_btn").hidden = false;
    }

    if (que_count == questions.length - 1) {
        document.querySelector(".submit_btn").hidden = false;
    } else {
        document.querySelector(".submit_btn").hidden = true;
    }

    que_text.innerHTML = `<span>${questions[index].num}. ${questions[index].question}</span>`;
    option_list.innerHTML = " ";
    for (let i = 0; i < questions[index].options.length; i++) {
        let opt = questions[index].options[i];
        if (sel_ans[que_count] == opt) {
            option_list.innerHTML += `
        <div class="option"><input type="radio" checked name="options" onchange="selectedAnswer('${opt}')">
        ${opt}</div>
`
        } else {
            option_list.innerHTML += `
    
        <div class="option"><input type="radio"  name="options" onchange="selectedAnswer('${opt}')">
        ${opt}</div>
    
`
        }

    }

}

function selectedAnswer(opt) {
    sel_ans[que_count] = opt;
    console.log(sel_ans)
}
function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = `  <span>
<p>${index}</p>of<p>${questions.length}</p>Questions
</span>`
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}


function showResultBox() {
    //the loop runs accordiing to the number of questions (also the number of the sel_ans array)
    for (let i = 0; i < questions.length; i++) {

        //checks if the answer provided in the questions array is equall to the sel_ans based on  same index
        if (questions[i].answer == sel_ans[i]) {
            userScore += 10; //if answer is correct add 5 point to points variable
            console.log(userScore)
        }
    }
    document.querySelector(".quiz_box").hidden = true;
    document.querySelector(".info_box").hidden = true;
    document.querySelector(".result_box").hidden = false;
    const scoreText = result_box.querySelector(".score_text");
    if (userScore >= 70) {
        let scoreTag = `<span  style="display: flex; flex-direction: column;"> <b style="font-size: 30px;"> ${namedValue}</b> and   you scored <p style="font-size: 45px;">${userScore}%</p><img src="./99592-checkmark.gif" alt="" width = 200px> </span>`
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 50) {
        let scoreTag = `<span  style="display: flex; flex-direction: column;"> <b style="font-size: 30px;"> ${namedValue}</b> and congrats!!! 🏆 , you scored only <p style="font-size: 45px;">${userScore}%</p></span>`
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 40) {
        let scoreTag = `<span  style="display: flex; flex-direction: column;"> <b style="font-size: 30px;"> ${namedValue}</b> and nice job  , you scored only <p style="font-size: 45px;">${userScore}%</p></span>`
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = `<span  style="display: flex; flex-direction: column;">  <b style="font-size: 30px;"> ${namedValue}</b> <img src="./76705-error-animation.gif" alt="" width = 200px> you got  <p style="font-size: 45px;">${userScore}%</p></span>`
        scoreText.innerHTML = scoreTag;
    }

}


quit_quiz.onclick = () => {
    window.location.reload();
}
