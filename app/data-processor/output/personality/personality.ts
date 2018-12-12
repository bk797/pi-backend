import {Profile,Radar} from '../../';
import groupByTrait from './group-by-trait';
import traitToRadar from './to-radar';

import {compose} from 'ramda';

/**
	Connect the parts that convert an array of Profiles to a Radar object together
**/
const toRadar: (profiles:Profile[])=> Radar = compose(traitToRadar,groupByTrait);

export default toRadar;