import OPENAI_API_KEY from "./key.js";

document.querySelector("i").addEventListener("click",function(event){
    letsGo();
});
document.querySelector(".prompt").addEventListener("keydown",function(event){
    if(event.key.toLowerCase()=='enter'){
        letsGo();
    }else{
        console.log("something went wrong");
    }
});
function letsGo(){
    let quest = document.querySelector(".prompt").value;
    document.querySelector(".response").value="";
    runCompletion(quest);
    document.querySelector(".prompt").setAttribute("placeholder","again write your prompt here...");
}
async function runCompletion(question){
    try{
        const response = await fetch('https://api.openai.com/v1/completions',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                'model': "text-davinci-003",
                'prompt': question,
                'max_tokens': 500,
                'temperature': 0.2
            }),
        });
        if(response.ok){
            const data = await response.json();
            document.querySelector(".response").value=(data.choices[0].text).trim();
            //console.log(data.choices[0].text);
        } else{
            document.querySelector(".response").value="Unable to process your request";
            //console.log("fail");
        }
    }
    catch(error){
        document.querySelector(".response").value="Unable to process your request";
        //console.log(error);
        //change the response area unable to process your request
    }
}
