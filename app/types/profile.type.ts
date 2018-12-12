type Trait = {
  trait_id:string,
  name:string,
  category:string,
  percentile:number,
  raw_scores?:number,
  significant?:boolean
  children?:Array<Trait>
}

type Warning = {
  warning_id:string,
  message:string
}

type Profile = {
  name?:string,
  word_count?:number,
  processed_language?:string,
  personality:Array<Trait>,
  needs?:Array<Trait>,
  values?:Array<Trait>,
  consumption_preferences?:Array<ConPrefCategory>,
  behavior?:Array<Trait>,
  warnings?:Array<Warning>
}

interface ConPref {
  name:string
}

interface ConPrefItem extends ConPref {
  consumption_preference_id:string,
  score:number
}

interface ConPrefCategory extends ConPref {
  consumption_preference_category_id:string,
  consumption_preferences: Array<ConPrefItem>
}

export {Trait,Profile};
