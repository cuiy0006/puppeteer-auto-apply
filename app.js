const puppeteer = require('puppeteer');

/* TODO: 
0. debug mode
1. query all job board - title, location, company, url
2. query all apply with indeed
3. apply all indeed job boards
*/ 
(async () => {
  const browser = await puppeteer.launch({headless: false, userDataDir:"C:\\Users\\Zhang\\PycharmProjects\\auto_apply\\userdata"});
  const page = await browser.newPage();
  link_prefix = "https://www.indeed.com/jobs?q=Data+Analyst&l=New+York%2C+NY&start="
  await page.goto(link_prefix);

  const jobboard_arr = await page.$$("div[class='jobsearch-SerpJobCard unifiedRow row result clickcard']");

  console.log("jobboards: ", jobboard_arr);
  console.log("jobboards length: ", jobboard_arr.length);

  for (let i = 0; i < jobboard_arr.length; i++) {
    const info = await (await jobboard_arr[i].getProperty('innerText')).jsonValue();
    console.log("number: ", i,  info);
    await jobboard_arr[i].click();
  }
  
  //await jobboard_arr[0].click()
  // const job_title = await jobboard.$x('//h2[@class="title"]');
  // const job_title_text = await job_title.$x('//a').textContent
  // console.log("job_title_text: ", job_title_text)
  // let value = await page.evaluate(el => el.textContent, job_title)
  // console.log("value: ", value)
  // if (jobboard) {
  //   await jobboard.click()
  // }

  //await browser.close();
})();