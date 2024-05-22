import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject<boolean>(false);
  public message = new BehaviorSubject<string>("")
  show() {
    this.isLoading.next(true);
  }

  setMessage(text: string){
    this.message.next(text);
  }
  cleanMessage(){
    this.message.next("")
  }
  hide() {
    this.isLoading.next(false);
  }
}
