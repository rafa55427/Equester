const express=require('express');
const { Configuration, OpenAIApi }=require('openai');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
const openai=new OpenAIApi(new Configuration({apiKey:process.env.OPENAI_API_KEY}));
app.post('/chat',async(req,res)=>{
  const {message,mode}=req.body;
  const sys=mode==='desqueter'
    ?"Você é DESQUETER, modelo GPT-6, enigmático, fala direto, frases curtas."
    :"Você é EQUESTER, IA de guerra, precisa, analítica, respostas completas.";
  try{
    const c=await openai.createChatCompletion({
      model:'gpt-4',
      messages:[{role:'system',content:sys},{role:'user',content:message}]
    });
    res.json({reply:c.data.choices[0].message.content});
  }catch(err){
    console.error(err);
    res.status(500).json({reply:'Erro interno.'});
  }
});
const port=process.env.PORT||3000;
app.use(express.static('.'));
app.listen(port,()=>console.log('rodando em',port));
