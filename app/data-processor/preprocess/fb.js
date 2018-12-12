const {readFileSyncJSON} = require('../../helper/file');

const {compose,map,filter,equals,curry,prop,props,objOf,zipObj} = require('ramda');

// const msgToContent = ({content,timestamp_ms}) => {content,created:timestamp_ms};

//{messages[]} -> {contentItems:[]}
const jsonToContentItems = ({messages}) => {
	const userContents = {};
	for(const msg of messages){
		const name = msg.sender_name;
		const content = msg.content;
		const created = msg.timestamp_ms;
		const contentItem = {content, created};
		if(userContents[name]) {
			userContents[name]["contentItems"].push(contentItem);
		}
		else {
			userContents[name] = {"contentItems":[contentItem]};
		}
	}
	return userContents;
}

const contentItems = compose(jsonToContentItems,readFileSyncJSON);

module.exports = {contentItems};

