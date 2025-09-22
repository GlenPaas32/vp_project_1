const http = require("http");
const fs = require("fs");
const url = require("url");
const dateEt = require("./dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html><html lang="et"><head><meta charset="utf-8"><title>Paas, veebiprogrammeerimine</title></head><body>';
const pageBody = '<h1>Paas, veebiprogrammeerimine</h1><p>See leht on loodud <a href="https://www.tlu.ee"> Tallinna Ülikoolis </a> veebiprogrammeerimise kuruse jaoks ja see ei sisalda tähtsat infot</p><p> Olen vägev progeja ja tegin enda kodutöö ära.</p><hr>';
const pageFoot = '\n</body>\n</html>';


http.createServer(function(req, res){
	console.log("Päring: " + req.url);
	let currentUrl = url.parse(req.url, true);
	console.log("Parsituna: " + currentUrl.pathname);
	
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBody);
		res.write(`
    <h2>Praegu on</h2>
    <ol>
      <li>Nädalapäev: ${dateTimeET.weekDay()}</li>
      <li>Kuupäev: ${dateTimeET.fullDate()}</li>
      <li>Kellaaeg: ${dateTimeET.fullTime()}</li>
      <li>Päevaosa: ${dateTimeET.partOfDay()}</li>
    </ol>
  `);
		res.write(pageFoot);
		return res.end();
	}
	
	else if(currentUrl.pathname === "/vanasonad"){
		res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageHead);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>\n\t<p>Kahjuks tأ¤naseks أ¼htki vanasأµna vأ¤lja pakkuda pole!</p>");
				res.write(pageFoot);
				return res.end();
			} else {
				let folkWisdom = data.split(";");
				let folkWisdomOutput = "\n\t<ol>";
				for (let i = 0; i < folkWisdom.length; i ++){
					folkWisdomOutput += "\n\t\t<li>" + folkWisdom[i] + "</li>";
				}
				folkWisdomOutput += "\n\t</ol>";
				res.write(pageHead);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>");
				res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
				res.write(folkWisdomOutput);
				res.write(pageFoot);
				return res.end();
			}
		});	
	}
}).listen(5134, () => {
  console.log("Server töötab: http://localhost:5134");
});