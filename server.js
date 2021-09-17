const app = require('express')();
const config = require('./config.json')
app.get('/', (req, res) => res.send('LutiBot est actuelement up!\nPour plus d\'info, rendez vous  sur ' + config.site_url));

module.exports = () => {
  app.listen(2000);
}