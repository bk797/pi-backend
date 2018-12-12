import {Trait} from './profile.type';

type Item = {
	[name:string]:number;
}

type ProfileOf = {
	name:string,
	personality: Trait
}

type Scores = {
	[trait:string]:number|string,
	name: string
}

type ScoreByName = {
	[name:string]:number
}

type ScoreByTrait = {
	[trait:string]:Scores
}

type GroupedTraits = {
	[trait:string]:[Scores]
}

export {Item,ProfileOf,Scores,ScoreByTrait,GroupedTraits};