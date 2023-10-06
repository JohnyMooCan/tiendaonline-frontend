import { Component } from '@angular/core';
import OpenAI from "openai";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.css']
})
export class ChatGPTComponent {

  styledisplay: string = 'none';

  chatConversation: Array<any> = [];
  response: any;
  promptText = '';

  constructor(){

  }
  

  checkResponse() {
    this.pushChatContent(this.promptText, 'Tú', 'justify-content-end mb-4 pt-1');
    this.cargaChatGPT();
  }


  pushChatContent(content: string, person: string, cssClass: string) {
    const imgBot: string = './../../../assets/images/Chat-GPT-Icon.png';
    const imgYou: string = './../../../assets/images/User-icon.png';

    const urlImg: string = (person == 'ChatGPT') ? imgBot : imgYou;
    const chatToPush: any = { person: person, response: content, cssClass: cssClass, imgSr: urlImg };
    this.chatConversation.push(chatToPush);
  }


  getText(data: string) {
    return data.split('\n').filter(f => f.length > 0);
  }

  async cargaChatGPT() {
    if (this.promptText.length < 2)
      return;

    this.response = undefined;


    const openai = new OpenAI({
      apiKey: environment.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "system", content: this.promptText,}],
      model: "gpt-3.5-turbo",
    }).then(function (data) {
      //Do something with the data.
      return data;
      
    })
      .catch(function (err) {
        //The API returned an error
        console.log("Error Chat GPT")
        console.log(err)
      });
      this.promptText = '';
      //console.log("Respuesta Char GPT")
      //console.log(chatCompletion);
      this.response = chatCompletion;

      this.pushChatContent(this.response.choices[0].message.content, 'ChatGPT', 'justify-content-start');

  }
  closeChat(eliminar: boolean) {
    if(eliminar){
      this.chatConversation = [];
    }

    this.styledisplay = 'display:none;';
  }
  openChat() {
    this.styledisplay = "display:block;";
  }

}
