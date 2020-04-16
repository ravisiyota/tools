const fs = require('fs');

!fs.existsSync(__dirname + '/xml-files') && fs.mkdirSync(__dirname + '/xml-files');

for (let count = 500; count >= 0; count--) {
    const xml = '<?xml version="1.0" encoding="UTF-8"?><bookstore><book category="cooking"><title lang="en">Everyday Italian</title><author>Giada De Laurentiis</author><year>2005</year><price>30.00</price></book><book category="children"><title lang="en">Harry Potter</title><author>J K. Rowling</author><year>2005</year><price>29.99</price></book><book category="web"><title lang="en">XQuery Kick Start</title><author>James McGovern</author><author>Per Bothner</author><author>Kurt Cagle</author><author>James Linn</author><author>Vaidyanathan Nagarajan</author><year>2003</year><price>49.99</price></book><book category="web" cover="paperback"><title lang="en">Learning XML</title><author>Erik T. Ray</author><year>2003</year><price>39.95</price></book></bookstore>';
    fs.appendFile(__dirname + `/xml-files/${count}.xml`, xml, () => { console.log(`File created ${count}.xml`) });
}
