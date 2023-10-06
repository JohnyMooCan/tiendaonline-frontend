import { Component } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router } from "@angular/router";

import { environment } from 'src/environments/environment';
import OpenAI from "openai";

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

  constructor(private scroller: ViewportScroller, private router: Router){

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

    const targetIndex = 'mensaje-' + String(this.chatConversation.length);
    console.log(targetIndex);

    this.router.navigate([], { fragment: targetIndex });
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
      dangerouslyAllowBrowser: true,
      organization: "org-MWeRoQSGB5djT76Ny6IZMIAG"
    });
    const mensaje = this.promptText;
    this.promptText = '';
    const chatCompletion =  await openai.chat.completions.create({
      messages: [{ 
        role: "system",
        content: mensaje
        }],
        model: "gpt-3.5-turbo",
    }).then(function (data) {
      //Do something with the data.
      return data.choices[0].message.content;
      
    })
      .catch(function (err) {
        //The API returned an error
        console.log("Error Chat GPT")
        console.log(err)
        return "Error al procesar, favor de intentar de nuevo o mas tarde.";
      });
      this.promptText = '';
      //console.log("Respuesta Char GPT")
      //console.log(chatCompletion);
      this.response = chatCompletion;

      this.pushChatContent(this.response, 'ChatGPT', 'justify-content-start');

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
