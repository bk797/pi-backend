type RadarTrait = {
	trait:string,	
	[name:string]: string | number
}

type RadarNode = {
	title:string,
	data:RadarTrait
}

type Radar = {
	keys:Array<string>,
	index:string,
	data:Array<RadarNode>
}

export {RadarNode,Radar};
