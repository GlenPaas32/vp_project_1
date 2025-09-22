const fs = require("fs");
const dateTimeET = require("./dateTimeET");
const textRef = "txt/vanasonad.txt";

function pickOneSentence(rawText){
	let vanaSonaList = rawText.split(";");
	let vanaSonaSumma = vanaSonaList.length
	let vanaSonaTanaseks = vanaSonaList[Math.round(Math.random() * (vanaSonaList.length - 1))];
	console.log(vanaSonaTanaseks);
	}
	
function readTextFile(){
	fs.readFile(textRef, "utf8", (err, data) => {
		if(err){ 
		console.log(err);
		} else {
			pickOneSentence(data);
		}
	});
}
console.log("Täna on " + dateTimeET.weekDay() + " " + dateTimeET.fullDate());
console.log("Kell on " + dateTimeET.fullTime());
console.log("On " + dateTimeET.partOfDay() + ".");
console.log("Tänane vanasõna on:");
readTextFile();