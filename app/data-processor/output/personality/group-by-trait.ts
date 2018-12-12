import {Profile,Trait} from '../../';
import {Item,ProfileOf,Scores,ScoreByTrait,GroupedTraits} from '../../'

import {merge,reduce,map} from 'ramda';

//can make either raw_score or perscentile
const SCORE = 'percentile';

/*
	gets the name, and score from a Trait and returns a [name]:score object
*/
const traitToScore: (trait: Trait) => Item = (trait) => Object.assign({},{[trait.name]:trait[SCORE]})

/*
	gathers the scores of the children and return an object identified by the Trait name
	example return: {"pTrait":{name:"personName","pChild1":score1,"pChild2":score2}}
*/
const traitScores: (name:string,trait:Trait) => ScoreByTrait = (name,trait) => {
	if(!trait.children) throw new Error(`This trait does not have any children`);
	let scores = {name};
	const appendScore: (acc:Scores,t:Trait) => Scores = (acc,t) => merge(acc,traitToScore(t));
	const a = reduce(appendScore,scores,trait.children);
	return {[trait.name]:a};
}

/*
	gather the scores from each of the children's subtraits
	example return: {"pTrait1":Scores,"pTrait2":Scores}
*/
const childScores: ({name,personality}:Profile) => ScoreByTrait = ({name,personality}) => {
	if(!name) throw new Error('Please provide a name to this profile');
	const getScores:(acc:ScoreByTrait,item:Trait)=> ScoreByTrait = (acc,item) => merge(acc,traitScores(name,item));
	return reduce(getScores,{},personality);
} 

/*
	gather the scores from the [Trait] array in "Personality" 
	a different method is needed from childScores as "Personality" is an index and not a trait
	example return: {"Personality":{"trait1":score1,"trait2":score2}}
*/
const personalityScores: ({name,personality}:Profile) => ScoreByTrait = ({name,personality}) => {
	if(!name) throw new Error('Please provide a name to this profile');
	const getScores: (acc:Scores,item:Trait) => Scores = (acc,item) => merge(acc,traitToScore(item));
	const traits = reduce(getScores,{name},personality);
	return {"Personality":traits};
}

/*
	aggregates the personality scores and all childrens scorse
*/
const getScores: (profile: Profile) => ScoreByTrait = profile => {
	return merge(childScores(profile),personalityScores(profile));
}

/*
	Gathers each of the scores for each trait
*/
const groupKeys: (acc:GroupedTraits,obj:ScoreByTrait)=> GroupedTraits = (acc,obj) => {
	for(const key in obj){
		if(acc[key]) acc[key].push(obj[key]);
		else acc[key] = [obj[key]];
	}
	return acc;
}

/*
	Organizes the Personality Traits of the profiles by trait
	example output: {"trait1":[{name:"person1","child_trait1":score,,"child_trait2":score}]}
*/
const groupByTrait: (profiles:Profile[]) => GroupedTraits = profiles => {
	let data = {};
	const a: ScoreByTrait[] = map(getScores,profiles);
	return reduce(groupKeys,{},a);
}

export default groupByTrait;