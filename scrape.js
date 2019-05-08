const puppeteer = require('puppeteer');
const url = 'https://www.waa.ca/flights/departures/';
const $ = require('cheerio');
const fs = require('fs');
const YWGDestinations = {
    "Cities": []
}

const uniqueSet = new Set();
puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto(url);
    let html = await page.content();
    await $('.city',html).each(function(i, elem) {
        if(uniqueSet.has($(this).text()))return true;
         uniqueSet.add($(this).text());
     });
    YWGDestinations.Cities = await [...uniqueSet].sort();
            
    await fs.writeFile('YWGDestinations.json', JSON.stringify(YWGDestinations), function(err){
        if (err) throw err;
        console.log("Successfully Written to File.");
    });
    await browser.close();
});