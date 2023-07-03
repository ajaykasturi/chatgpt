import OPENAI_API_KEY from "./key.js";


let result="";
let speed = 10;
function scrollToBottom() {
    document.getElementById("responseid").scrollTop =document.getElementById("responseid").scrollHeight;
}
function typeWriter(i) {
    if (i < result.length) {
        scrollToBottom();
        document.querySelector(".response").value += result.charAt(i);
        //console.log(result.charAt(i));
        i++;
        setTimeout(typeWriter, speed,i);
    }

}
document.querySelector("i").addEventListener("click",function(event){
    letsGo();
});
document.querySelector(".prompt").addEventListener("keydown",function(event){
    if(event.key.toLowerCase()==='enter'){
        letsGo();
    }else{
        console.log("something went wrong");
    }
});
function letsGo(){
    let quest = document.querySelector(".prompt").value;
    document.querySelector(".response").value="";
    // document.getElementById("responseid").addEventListener("input", function(){textarea.scrollTop = textarea.scrollHeight;});
    runCompletion(quest);
    document.getElementById("prompt").setSelectionRange(0, 0);
    document.querySelector(".prompt").value='';
}

async function runCompletion(question){
    try{
        const response = await fetch('https://api.openai.com/v1/completions',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'OpenAI-Organization': 'org-Wnyvx3sONeZuPGwSQ2ZYvfrs'
            },
            body: JSON.stringify({
                'model': "text-davinci-003",
                'prompt': question,
                'max_tokens': 1000,
                'temperature': 0.2
            }),
        });
        if(response.ok){
            const data = await response.json();
            //document.querySelector(".response").value
            result = (data.choices[0].text.trim());
            //console.log(result);
            //console.log(data.choices[0].text);
             
        } else{
            document.querySelector(".response").value="Unable to process your request1";
            //console.log("fail");
        }
    }
    catch(error){
        document.querySelector(".response").value="Unable to process your request2";
        //console.log(error);
        //change the response area unable to process your request
    }
    // typeWriter(result);
    typeWriter(0);
}
