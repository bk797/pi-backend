import groupByTrait from './group-by-trait';
import toRadar from './personality';
import {toRadarData,toRadarObject} from './to-radar.js'

const profile = {
	"name":"Sample",
	"personality": [
    {
      "trait_id": "big5_openness",
      "name": "Openness",
      "category": "personality",
      "percentile": 0.33685705648711173,
      "raw_score": 0.7352087905524989,
      "significant": true,
      "children": [
        {
          "trait_id": "facet_adventurousness",
          "name": "Adventurousness",
          "category": "personality",
          "percentile": 0.6267971288572436,
          "raw_score": 0.5163190739563067,
          "significant": true
        },
        {
          "trait_id": "facet_artistic_interests",
          "name": "Artistic interests",
          "category": "personality",
          "percentile": 0.6382085601620079,
          "raw_score": 0.6832289382476661,
          "significant": true
        }
      ]
    }	
	]
}

const groupedTraits = {
  "Openness":[
  {
    "Adventurousness":0.6267971288572436,
    "Artistic interests":0.6382085601620079,
    "name":"Sample"
  }
  ],
  "Personality":[
  {
    "Openness":0.33685705648711173,
    "name":"Sample"
  }
  ]
}

const radar = {
  "index":"trait",
  "keys":["Sample"],
  data:[
  {
    title:"Openness",
    data:[
    {
      "trait":"Adventurousness",
      "Sample":0.6267971288572436
    },
    {
      "trait":"Artistic interests",
      "Sample":0.6382085601620079
    }
    ]
  },
  {
    title:"Personality",
    data:[
    {
      "trait":"Openness",
      "Sample":0.33685705648711173
    }
    ]
  }
  ]

}

test('hello', () => {
  expect(groupByTrait([profile])).toEqual(groupedTraits);
});

test('hello', () => {
  expect(toRadar([profile])).toEqual(radar);
});
