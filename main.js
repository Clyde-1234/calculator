const previous_input = document.getElementById("previous_input");
const current_input = document.getElementById("output_and_input");
const calc_screen = document.getElementById("calculator_screen");

/*main premise as to how the numbers are constructed:
numbers are made by block;
when a new operation is in, the current block is moved to a list
when the equal is pressed, it is calculated by compiling the list and operation to a single line and solve using eval()
*/
const operations = ["+","-","x","÷"]; 

var is_on = true;
var is_current_input_an_operation = false;
var is_decimal = false;
var just_answered = false;

var operation_used = "";
var number_block_list = [];
var number_block_under_edit = "";

var unprocessed_stringified_problem = "";

function number_pressed(number){
    if(!is_on){return}
    if(just_answered){
        number_block_under_edit = "";
        just_answered = false;
    }
    number_block_under_edit += number;
    is_current_input_an_operation = false;
    update_current_input();
}

function add_decimal(){
    if(!is_on){return}

    if(just_answered){
        number_block_under_edit = "";
        just_answered = false;
    }
    if(is_decimal){return}
    number_block_under_edit += ".";
    is_current_input_an_operation = false;
    is_decimal = true;
    update_current_input();
}

function operation_pressed(op){
    if(!is_on){return}
    if(is_current_input_an_operation){return} //prevents the user from making multiple operations simultaneously

    if(number_block_under_edit === "" && number_block_list.length === 0){
        if(op === "-"){number_block_under_edit += "-"}}
        
    else{
        is_decimal = false;
        number_block_list.push(number_block_under_edit);
        number_block_under_edit = "";
        operation_used += op;
    }

    is_current_input_an_operation = true;
    update_current_input();

}



function equals(){
    if(!is_on){return}

    if(number_block_under_edit.length === 0 && number_block_under_edit === ""){return} //handle case if the equals sign is pressed when no inputs are given.
    previous_input.innerHTML = unprocessed_stringified_problem;
    var processed_stringified_problem = "";

    //compile the list of number block to form a single line with the corresponding operation
    for(i = 0; i < unprocessed_stringified_problem.length; i++){
        if(unprocessed_stringified_problem.charAt(i) === "x"){processed_stringified_problem+="*"}
        else if(unprocessed_stringified_problem.charAt(i) === "÷"){processed_stringified_problem+="/"}
        else{processed_stringified_problem += unprocessed_stringified_problem.charAt(i)}
    }

    var answer = eval(processed_stringified_problem);
    operation_used = "";
    unprocessed_stringified_problem = "";
    number_block_list = [];
    is_decimal = false;
    number_block_under_edit = answer + "";
    just_answered = true;
    update_current_input();
    if(isNaN(answer) || answer === Infinity){number_block_under_edit = ""}  
}



function delete_key(){
    if(number_block_under_edit ===""){
        if(!(operation_used.length > 0)){return}
        operation_used = operation_used.slice(0,-1);
        is_current_input_an_operation = false;
        if(number_block_list.length > 0){number_block_under_edit = number_block_list.pop()}}

    else if(number_block_under_edit.charAt(number_block_under_edit.length - 1) === "."){
        number_block_under_edit = number_block_under_edit.slice(0,-1);
        is_decimal = false}

    else if(!isNaN(number_block_under_edit)){number_block_under_edit = number_block_under_edit.slice(0,-1)}

    else{number_block_under_edit = ""}

    update_current_input();
}



function all_clear(){
    if(!is_on){
        calc_screen.className = "";
        is_on = true;
    }
    is_current_input_an_operation = false;
    is_decimal = false;
    number_block_list = [];
    number_block_under_edit = "";
    unprocessed_stringified_problem = "";
    operation_used = "";
    previous_input.innerHTML = "";
    update_current_input();
}



function bye_pressed(){
    is_on = false;
    current_input.innerHTML = "GOOODBYE =(";
    setTimeout(() =>{
        all_clear();
        is_on = false;
        calc_screen.className= "off";
        current_input.innerHTML = "";
        previous_input.innerHTML = "https://tinyurl.com/2m4mjd8y"}, 2000)
}


//updates ui based on the current program state. works by compiling the block list and operations in a single line
function update_current_input(){
    var stringified_problem = "";
    for(let i = 0; i < number_block_list.length; i++ ){
        stringified_problem += number_block_list[i];
        stringified_problem += operation_used.charAt(i);
    }
    stringified_problem += number_block_under_edit;
    unprocessed_stringified_problem = stringified_problem;
    current_input.innerHTML = stringified_problem;
}



function HI(){
    if (!is_on){ return}
    all_clear();
    const hi = ["Hello", "Kon'nichiwa", "Nihao","Kamusta","Hola","Hej","Привет", "geia shu","ciao","marhaba"];
    current_input.innerHTML = getRandomElement(hi);
}



//array randomizer for HI function
function getRandomElement(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

