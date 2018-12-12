type Message = {
  content:string,
  id?:string,
  created?:number,
  updated?:number,
  contenttype?:string,
  language?:string,
  parentid?:string,
  reply?:boolean,
  forward?:boolean
}

type Content = {
  contentItems: Array<Message>
}

type Input = Content | string;

type Params = {
  content:Input,
  content_type:string,
  consumption_preferences:boolean,
  raw_scores:boolean
}

type UserContent = {
  [name:string]:Content
}

export {Message,Content,Input,Params,UserContent};