let textt=document.getElementById("textInput");
let charr=document.getElementById("charCount");
let wordcount=document.getElementById("wordCount");
let sentencess=document.getElementById("sentenceCount");
let excludespace=document.getElementById("excludeSpaces");
let charLimit=document.getElementById("charLimit");
let warning=document.getElementById("warningMessage");
let readingTime=document.getElementById("readingTime");
let densityContainer=document.getElementById("densityContainer");
textt.addEventListener("input",updateStats);
excludespace.addEventListener("change",updateStats);
charLimit.addEventListener("input",updateStats);


function updateStats(){
    let text=textt.value;
    let characters;
    if(excludespace.checked){
        let nospace=text.split(" ");
        characters=nospace.join("").length;

    }
    else{
        characters=text.length;
    }
    charr.textContent=characters;


    let words=0;
    if(text!==""){
        let wordss=text.split(" ");
        words=wordss.length;
    }
    wordcount.textContent=words;


    let sentences=0;
    for(let i=0;i<text.length;i++){
        if(text[i]==="."||text[i]==="!"||text[i]==="?"){
            sentences++;
        }

    }
    sentencess.textContent = sentences;


    if(words==0){
        readingTime.textContent="Approx. reading time: 0 min";
    }else{
        readingTime.textContent="Approx. reading time: " + Math.ceil(words / 200)+" min";
    }


    let limit=Number(charLimit.value);
    if(limit>0&&characters>limit){
        warning.textContent="Character limit exceeded!";
    }
    else{
    warning.textContent="";
    }


    let letterCounts = {};
    for(let i=0;i<text.length;i++){
        let letter=text[i].toLowerCase();
        if(letter>="a"&&letter<="z"){
            if(letterCounts[letter]){
                letterCounts[letter]++;
            }
            else{
                letterCounts[letter]=1;
            }
        }
   }
    let totalLetters=0;
    for(let letter in letterCounts){
        totalLetters+=letterCounts[letter];
    }
    densityContainer.innerHTML="";
    for(let letter in letterCounts){
        let percentage =
        (letterCounts[letter]/totalLetters)*100;
        densityContainer.innerHTML += "<p>"+letter.toUpperCase() + " : "+ letterCounts[letter]+ " ("+percentage.toFixed(1) +"%)" +
        "</p>";
    }

}