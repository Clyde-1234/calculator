const previous_input = document.getElementById("previous_input");
const current_input = document.getElementById("output_and_input");
const calc_screen = document.getElementById("calculator_screen");


var stringed_problem_display = "";
var interpretable_stringed_problem= "";

var previous_answer;
var is_answer_pressed= false;
var is_on= true;
var greet= false;

const operations = ["+","-","x","÷"]

function press(button){
    toString(button);
    if(stringed_problem_display.length >= 20){return} //sets the input limit.
    if (!is_on){ return}//checks if the calculator is on
    //handle case if when user pressess buttons while on answer mode
    if(is_answer_pressed){
        interpretable_stringed_problem = "";
        stringed_problem_display = "";
        if(operations.includes(button)){
            interpretable_stringed_problem += previous_answer
            stringed_problem_display += previous_answer
        }
        current_input.innerHTML = stringed_problem_display;
        is_answer_pressed = false
    }
    //handle case when an operation button is pressed after an operation input
    if(operations.includes(button)){
        if(operations.includes(stringed_problem_display.slice(-1))||stringed_problem_display.length === 0){
            return
        }
    }
    //interprets multiplication ui to operational 
    if(button === 'x'){
        stringed_problem_display += button
        interpretable_stringed_problem += "*"
    }
    //interprets division ui to operational
    else if(button === "÷"){
        stringed_problem_display += button
        interpretable_stringed_problem += "/"
    }
    //concatenate input to the stack
   else{
        stringed_problem_display += button
        interpretable_stringed_problem += button
    }
    //display stringed_proble_display
    current_input.innerHTML = stringed_problem_display



    
}
//delete most recent input
function del(){
    if (greet){return}//ignores the function when greet is true
    if(is_answer_pressed){
        stringed_problem_display= previous_answer
        is_answer_pressed = false
    }
    stringed_problem_display = stringed_problem_display.slice(0,-1)
    interpretable_stringed_problem = interpretable_stringed_problem.slice(0,-1)
    current_input.innerHTML = stringed_problem_display
}
//process input to get answer
function get_answer(){
    if (!is_on){ return}//ignore function when the program is off
    if(stringed_problem_display === ""){return}//ignore function when there is no input
    if(operations.includes(stringed_problem_display.slice(-1))){return}//ignore function when the most recent input is an operation
    previous_input.innerHTML = current_input.innerHTML
    stringed_problem_display = eval(interpretable_stringed_problem)
    current_input.innerHTML = stringed_problem_display
    previous_answer = current_input.innerHTML
    
    
    is_answer_pressed = true
}
//turn off the program
function off(){
    if (is_on){
        is_on = false;
        current_input.innerHTML = "Goodbye =("
        setTimeout(function() {
            calc_screen.classList.toggle("off");
            stringed_problem_display = ""
            interpretable_stringed_problem = ""
            current_input.innerHTML = ""
            previous_input.innerHTML = "https://tinyurl.com/2m4mjd8y"
        }, 1000)
    }
}

function ac(){
    //if the program is off, it turns it on
    if(!is_on){
        calc_screen.classList.toggle("off");
        is_on =true
    }
    //clear all input
    if(is_on){
        stringed_problem_display =""
        interpretable_stringed_problem =""
        current_input.innerHTML = stringed_problem_display
        previous_input.innerHTML = interpretable_stringed_problem
    }
}

function HI(){
    if (!is_on){ return}
    stringed_problem_display = ""
    interpretable_stringed_problem = ""
    const hi = ["Hello", "Kon'nichiwa", "Nihao","Kamusta","Hola","Hej","Привет", "geia shu","ciao","marhaba"]
    current_input.innerHTML = getRandomElement(hi)
    greet = true

}
//array randomizer
function getRandomElement(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }
//handle keyboard input
window.addEventListener('keydown', (e)=>{
    var keypressed = e.key

    if("1234567890asdm".includes(e.key)){
        if(keypressed === "a"){keypressed = "+"}
        if(keypressed === "s"){keypressed = "-"}
        if(keypressed === "m"){keypressed = "x"}
        if(keypressed === "d"){keypressed = "÷"}
        press(keypressed)
    }
    if("Enter" === keypressed){get_answer()}
    if("Backspace" === keypressed){del()}
    if(" " === keypressed){HI()}
    if("Escape" === keypressed){off()}
    if("Delete" === keypressed){ac()}
  })
