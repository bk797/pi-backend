const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const {promisify} = require('util');

const {curry,map,prop,compose} = require('ramda');

const TYPE = {'JSON':'json','PLAIN_TEXT':'txt','HTML':'html','CSV':'csv'};
Object.freeze(TYPE);

const version = process.env.PI_VERSION;
const username = process.env.PI_USERNAME;
const password = process.env.PI_PASSWORD;
const url = process.env.PI_URL;

const personalityInsights = new PersonalityInsightsV3({version,username,password,url});

//use require(input) if input is path to file
const params = (content, content_type) => {
  return {
    content,
    content_type,
    consumption_preferences:true,
    raw_scores:true,
  }
}

//params for each typ of input
const jsonParams = json => params(json,'application/json');

const textParams = text => params(text,'text/plain;charset=utf-8');

const htmlParams = html => params(html,'text/html;charset=utf-8');

const csvParams = csv => params(csv,'text/csv');

//param factory
const getParams = (input, type) => {
  switch(type){
    case TYPE.JSON:
      return jsonParams(input);
    case TYPE.PLAIN_TEXT:
      return textParams(input);
    case TYPE.HTML:
      return htmlparams(input);
    case TYPE.CSV:
      return csvParams(input);
    default:
      throw `${type} is an invalid input type`;
  }
}

/*
  sends the api request to Watson for the given type
  returns the profile request wrapped in a promise to avoid a callback
*/
const personalityInsight = (input,type) => {
  const params = getParams(input,type);
  return new Promise((resolve,reject)=>{
    personalityInsights.profile(params,(err,profile) => {
      if(err) {
        console.log(err)
        reject(err.code);
      }else{
        resolve(profile);
      }
    })
  });
}

module.exports = {personalityInsight};