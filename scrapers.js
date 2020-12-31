const puppeteer = require("puppeteer");
const csv = require("csv-parser");
const fs = require("fs");
let count = 0;
const results = [];
fs.createReadStream("gmail.csv")
  .pipe(
    csv({
      headers: false,
      skipLines: 1,
    })
  )
  .on("data", (data) => {
    let stringify = JSON.stringify(data)
    console.log(JSON.parse(stringify))
    results.push(data);
    count++;
  })
  .on("end", async () => {
    console.log(count);
    console.log(results[count-1][1]);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    while(count--){
        console.log(count, results[count][1]);
        try {
          await page.goto('https://wp.pubg-glitch.com/2020/12/31/hello-world/');
          await page.type('#comment', 'Comment'+ count)
          await page.type('#author', results[count][1])
          await page.type('#email', results[count][3])
          await page.click('#submit')
        } catch (error) {
          console.log(error)
        }
        console.log('Submitted!');
        // await browser.close();
      };
  });