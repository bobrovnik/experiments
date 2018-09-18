var request = require("request");
const winston = require('winston');
const sendmail = require('sendmail')();
const jsdom = require("jsdom");
var schedule = require('node-schedule');
const { JSDOM } = jsdom;
const logger = new (winston.Logger)({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  

let prevDealsContent = '';

const triggerCheckRequest = () => {
    request({
        uri: "https://www.jucy.com.au/jucy-deals/relocate-specials/",
    }, function(error, response, body) {
        const html = new JSDOM(body);
    
        const document = html.window.document;
        const dealsWrapElement = document.querySelector('.deals-wrap');
        logger.info(`content parsed; ${dealsWrapElement.textContent}`);
    
        if(dealsWrapElement.textContent !== prevDealsContent) {
            prevDealsContent = dealsWrapElement.textContent;
            logger.info(`content changed; ${dealsWrapElement.textContent}`);

            sendmail({
                from: 'jucy-deals-checker@nodomain.com',
                to: 'sgolovenko@gmail.com, anna.chebotar88@gmail.com',
                subject: 'jucy deals checker',
                html: dealsWrapElement.textContent,
            }, function(err, reply) {

                logger.info(`message sent`);
            });
        }
    });
}

var j = schedule.scheduleJob('*/15 * * * *', triggerCheckRequest);

