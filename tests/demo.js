/*
 *  Support write testing code in both "Expect" and "BDD-Style".
 *  You can check more document about writing testing cases.
 *  And [this](http://nightwatchjs.org/api#expect-api) maybe helpful.
 */
// const {ids, cookie} = require('../config/task');
const config = require('../config/task');

const tasks = {};
const runTask = (client, {id, cookie, host}) => {
  const url = `${host}/#/items/edit/limit?item.id=${id}`;
  client
  .url(url)
  .maximizeWindow()
  .setCookie(cookie, () => {
    const searchBtn = '.ui-button'
    
    // Launch browser and open bing.com.
    client.url(url).maximizeWindow()
    client.pause(3000);

    // Make sure both "body" and search input are available.
    client.expect.element('body').to.be.present;

    client.expect.element(searchBtn).to.be.visible;
    client.pause(1500);  // Just wait 2s.

    // Type "what is microsoft" in searching input and submit.
    client.click(searchBtn);
    client.pause(3000);

    // Let's save these answers to a screenshot.
    client.expect.element('body').to.be.present;
    client.saveScreenshot(`reports/${id}.png`);  // Take a screenshot and save to "reports/answer.png".
    client.end();
  });
}
const setTask = (ids, cookie, host, account) => {
  for(const key in ids) {
    const index = +key + 1;
    tasks[[`当前的账号是${account},运行的是商品id是${ids[key]},顺序为第${index}个`]] = (client) => {
      runTask(client, {id: ids[key], cookie, host});
    };
  }
}

for(const key in config) {
  const task = config[key];
  setTask(task.ids, task.cookie, task.host, key);
}


module.exports = tasks;
