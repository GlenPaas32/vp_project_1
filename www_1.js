const http = require ("http");
const dateEt = require("./dateTimeET");
const pageHead = '<!DOCTYPE html><html lang="et"><head><meta charset="utf-8"><title>Paas, veebiprogrammeerimine</title></head><body';
const pageBody = '<h1>Paas, veebiprogrammeerimine</h1><p>See leht on loodud <a href="https://www.tlu.ee"> Tallinna Ülikoolis </a>        veebiprogrammeerimise kuruse jaoks ja see ei sisalda tähtsat infot</p><p> Olen vägev progeja ja tegin enda kodutöö ära.</p><hr>';
const pageFoot ='\n</body>\n</html>';

http.createServer(function (req, res){
	res.writeHead(200, {"content-type": "text/html"});
	res.write(pageHead);
	res.write(pageBody);
	res.write("\n\t<p> Täna on " + dateEt.weekDay() + ".</p>");
	res.write(pageFoot);
	return res.end();
}).listen(5134);