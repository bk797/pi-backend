const {map,reduce,dissoc,merge,curry,compose} = require('ramda');

const NAME = 'name';

//{traitName:[{name:personName,childTrait:traitScore,...},...]}
// -> [{trait:traitName,person:personScore,...},...]
const reduceValues = ([title,attr]) => {
	const traits = map(getTraits,attr);
	const groupedTraits = reduce(groupTraits,{},traits);
	return Object.assign({title},{data:reduce(nameTraits,[],Object.entries(groupedTraits))})
}

//return [{trait:traitName,person:score,...}]
const nameTraits = (acc,[key,value]) => {
	value["trait"] = key;
	return acc.concat(value);
}

//return [traitName:{person:score,person:score,...}]
const groupTraits = (acc,obj) => {
	for(const [key,value] of Object.entries(obj)){
		if(acc[key]) acc[key] = merge(acc[key],value);
		else acc[key] = value;
	}
	return acc;
}

//return {traitName:{person:score}...}
const getTraits = attr => {
	const {name} = attr;
	const scores = dissoc(NAME,attr);
	const traits = reduce(setTrait(name),{},Object.entries(scores));
	return traits;
}

const setTrait = curry((name,acc,[trait,score]) => merge(acc,{[trait]:{[name]:score}}));

const toRadarData = (traits) => {
	const radarData = {};
	for (const trait of Object.entries(traits)) {
		radarData[trait[0]] = reduceValues(trait);
	}
	return radarData;
}

//{trait:traitName,personName:score,...} -> [personName]
const getNames = (data) => {
	const traits = data["data"][0];
	const names = [];
	for (const t in traits) {
		if(t !== "trait"){
			names.push(t);
		}
	}	
	return names;
}

//{title:data,...} -> [{title,data}...]
const toArray = obj => {
	const append = (arr,[title,data]) => arr.concat(Object.assign(data,{title}));
	const entries = Object.entries(obj);
	return reduce(append,[],entries);
}

//{[{trait:traitName,person:personScore,...},...],...}
// -> {index:"trait",keys:[personName],data:{[radarObject]}}
const toRadarObject = (data) => {
	return {
		index: "trait",
		keys: getNames(data["Personality"]),
		data: toArray(data)
	}
}

const traitToRadar = compose(toRadarObject,toRadarData);

export {toRadarData,toRadarObject};

export default traitToRadar;