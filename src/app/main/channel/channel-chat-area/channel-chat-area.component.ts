import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  query,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Message } from '../../../../models/message.class';
import { ThreadService } from '../../../services/thread.service';

@Component({
  selector: 'app-channel-chat-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-chat-area.component.html',
  styleUrl: './channel-chat-area.component.scss',
})
export class ChannelChatAreaComponent implements AfterViewInit {
  allMessages: Message[] = [];

  @ViewChild('messageContainer') private messageContainer?: ElementRef;
  containerClasses: { [key: string]: boolean } = {};

  @ViewChildren('messageContainer') messagesLoaded?: QueryList<any>;

  @ViewChild('myDiv') myDiv!: ElementRef;

  constructor(
    private threadService: ThreadService,
    private firestore: Firestore
  ) {}

  ngAfterViewInit(): void {
    this.subMessages();
    this.scrollToBottom();
  }

  scrollToBottom() {
    // if (this.messageContainer) {
    //   const hasScrollbar =
    //     this.messageContainer.nativeElement.scrollHeight >
    //     this.messageContainer.nativeElement.clientHeight;
    //   if (hasScrollbar) {
    //     this.containerClasses = {
    //       'overflow-auto': true,
    //       'justify-content-end': false,
    //     };
    //   } else {
    //     this.containerClasses = {
    //       'overflow-auto': false,
    //       'justify-content-end': true,
    //     };
    //   }
    //   console.log('test');
    // }
  }

  openThread(thread: any) {
    console.log('test');

    this.threadService.openThread(thread);
  }
  subMessages() {
    const q = query(
      collection(this.firestore, 'Channels', 'Entwicklerteam', 'messages'),
      limit(1000)
    );
    onSnapshot(q, (list) => {
      this.allMessages = [];
      list.forEach((element) => {
        this.allMessages.push(this.setNoteObject(element.data(), element.id));
        this.scrollToBottom();
      });
    });
  }

  setNoteObject(obj: any, id: string): Message {
    return {
      id: id,
      message: obj.message || '',
      weekday: obj.weekday || '',
      year: obj.year || '',
      month: obj.month || '',
      day: obj.day || '',
      hour: obj.hour || '',
      minute: obj.minute || '',
      user: obj.user || '',
    };
  }

  renderMessages() {
    //     if (this.myDiv) {
    //       this.myDiv.nativeElement.innerHTML = this.allMessages
    //         .map(
    //           (element, index) => /*html*/ `
    // <div
    //       class="messageResiveContainer"
    //     >
    //       <div class="messageResive">
    //         <div><img src="./../../../../assets/img/profile-imgs/male2.png" /></div>
    //         <div class="messageInfo">
    //           <div class="messageTitle">
    //             <div class="messageUserName">
    //               <p>${element.user}</p>
    //               <p>14:25 Uhr</p>
    //             </div>
    //             <div></div>
    //           </div>
    //           <span>${element.message}</span>
    //           <div>
    //             <a>2 Antworten</a>
    //             <p>Letzte Antwort 14:56</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div id="hover" class="hoverResive d-none">
    //         <div class="hoverContent">
    //           <p>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="21"
    //               height="20"
    //               viewBox="0 0 21 20"
    //               fill="none"
    //             >
    //               <path
    //                 d="M10.9365 20C16.4594 20 20.9365 15.5228 20.9365 10C20.9365 4.47715 16.4594 0 10.9365 0C5.41368 0 0.936523 4.47715 0.936523 10C0.936523 15.5228 5.41368 20 10.9365 20Z"
    //                 fill="#4BD37B"
    //               />
    //               <path
    //                 d="M15.6032 4L8.60319 11.2L6.26986 8.8L3.93652 11.2L8.60319 16L17.9365 6.4L15.6032 4Z"
    //                 fill="white"
    //               />
    //             </svg>
    //           </p>
    //           <p>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="21"
    //               height="20"
    //               viewBox="0 0 21 20"
    //               fill="none"
    //             >
    //               <path
    //                 d="M9.27417 0L10.9408 3.33333L12.6075 0H9.27417ZM15.2408 0.333333L15.0075 4.06667L18.1075 2L15.2408 0.333333ZM3.77417 2L6.9075 4.06667L6.67417 0.333333L3.77417 2Z"
    //                 fill="#4AA9FF"
    //               />
    //               <path
    //                 d="M7.0742 20.0002H3.14087V15.7002L7.74087 16.7669C6.64087 17.9335 7.0742 20.0002 7.0742 20.0002Z"
    //                 fill="#EBA352"
    //               />
    //               <path
    //                 d="M6.70754 20H2.30754C2.30754 20 2.3742 17.8667 1.64087 16.0333L7.14087 16.8333C6.50754 18.4667 6.70754 20 6.70754 20ZM6.2742 14.1333H7.94087V6.73333C7.94087 6.23333 7.5742 5.83333 7.10754 5.83333C6.64087 5.83333 6.2742 6.23333 6.2742 6.76667V14.1333ZM4.30754 14.1333H6.2742V6.1C6.2742 5.5 5.84087 5 5.2742 5C4.74087 5 4.2742 5.5 4.2742 6.1V14.1333H4.30754Z"
    //                 fill="#FFDD67"
    //               />
    //               <path
    //                 d="M2.60768 14.1334H4.34102V6.56676C4.34102 6.03343 3.94102 5.6001 3.47435 5.6001C3.00768 5.6001 2.60768 6.03343 2.60768 6.56676V14.1334ZM1.80768 6.73343C1.37435 6.73343 1.04102 7.13343 1.04102 7.63343V14.1334H2.60768V7.63343C2.60768 7.13343 2.24102 6.73343 1.80768 6.73343Z"
    //                 fill="#FFDD67"
    //               />
    //               <path
    //                 d="M7.10765 5.8H6.94098C7.34098 5.86667 7.64098 6.26667 7.64098 6.7V14.1333H7.94098V6.73333C7.94098 6.23333 7.57432 5.8 7.10765 5.8ZM5.30765 5C5.24098 5 5.20765 5 5.17432 5.03333C5.64098 5.1 6.00765 5.56667 6.00765 6.1V11.4667L6.30765 11.8V6.1C6.27432 5.5 5.84098 5 5.30765 5ZM3.47432 5.6H3.34098C3.74098 5.66667 4.04098 6.06667 4.04098 6.53333V11.4333L4.34098 11.7667V6.56667C4.30765 6.03333 3.94098 5.6 3.47432 5.6ZM1.80765 6.73333C1.74098 6.73333 1.70765 6.73333 1.67432 6.76667C2.04098 6.83333 2.30765 7.2 2.30765 7.63333V11.4667L2.60765 11.8V7.63333C2.60765 7.13333 2.24098 6.73333 1.80765 6.73333Z"
    //                 fill="#EBA352"
    //               />
    //               <path
    //                 d="M10.7409 10.7335C10.2409 10.1669 9.24086 10.4335 8.54086 11.9002C8.04086 12.9002 7.90753 12.7002 7.64086 12.7669V11.8669C7.64086 11.8669 1.00752 11.4335 1.00752 12.4335C1.00752 12.4335 0.707524 14.9002 1.34086 16.4335C2.30752 18.7335 7.24086 19.3335 8.77419 15.4335C9.07419 14.6669 9.50753 13.8335 9.84086 13.0002C10.2742 12.0002 11.3075 11.4002 10.7409 10.7335Z"
    //                 fill="#FFDD67"
    //               />
    //               <path
    //                 d="M10.4075 10.5C11.4742 11.3 9.50752 12.8333 8.57419 15.2C7.24085 18.6 3.34085 18.6 1.70752 17.0333C3.20752 18.8 7.37419 19.1333 8.77419 15.4333C9.70752 13.0333 11.9742 11.2 10.4075 10.5Z"
    //                 fill="#EBA352"
    //               />
    //               <path
    //                 d="M7.94068 12.7331C6.64068 12.2665 3.90734 13.1665 4.27401 15.7665C4.27401 13.3331 6.44068 12.7665 7.64068 12.7665C7.80734 12.7665 7.94068 12.7331 7.94068 12.7331ZM14.8073 19.9998H18.7407V15.6998L14.1407 16.7665C15.2407 17.9331 14.8073 19.9998 14.8073 19.9998Z"
    //                 fill="#EBA352"
    //               />
    //               <path
    //                 d="M15.1743 20H19.5743C19.5743 20 19.5076 17.8667 20.2409 16.0333L14.7409 16.8333C15.3743 18.4667 15.1743 20 15.1743 20ZM15.6076 14.1333H13.9409V6.73333C13.9409 6.23333 14.3076 5.83333 14.7743 5.83333C15.2409 5.83333 15.6076 6.23333 15.6076 6.76667V14.1333ZM17.5743 14.1333H15.6076V6.1C15.6076 5.5 16.0409 5 16.6076 5C17.1409 5 17.6076 5.5 17.6076 6.1V14.1333H17.5743Z"
    //                 fill="#FFDD67"
    //               />
    //               <path
    //                 d="M19.2741 14.1334H17.5408V6.56676C17.5408 6.03343 17.9408 5.6001 18.4074 5.6001C18.8741 5.6001 19.2741 6.03343 19.2741 6.56676V14.1334ZM20.0741 6.73343C20.5074 6.73343 20.8408 7.13343 20.8408 7.63343V14.1334H19.2741V7.63343C19.2741 7.13343 19.6408 6.73343 20.0741 6.73343Z"
    //                 fill="#FFDD67"
    //               />
    //               <path
    //                 d="M14.7743 5.8H14.9409C14.5409 5.86667 14.2409 6.26667 14.2409 6.7V14.1333H13.9409V6.73333C13.9409 6.23333 14.3076 5.8 14.7743 5.8ZM16.5743 5C16.6409 5 16.6743 5 16.7076 5.03333C16.2409 5.1 15.8743 5.56667 15.8743 6.1V11.4667L15.5743 11.8V6.1C15.6076 5.5 16.0409 5 16.5743 5ZM18.4076 5.6H18.5409C18.1409 5.66667 17.8409 6.06667 17.8409 6.53333V11.4333L17.5409 11.7667V6.56667C17.5743 6.03333 17.9409 5.6 18.4076 5.6ZM20.0743 6.73333C20.1409 6.73333 20.1743 6.73333 20.2076 6.76667C19.8409 6.83333 19.5743 7.2 19.5743 7.63333V11.4667L19.2743 11.8V7.63333C19.2743 7.13333 19.6409 6.73333 20.0743 6.73333Z"
    //                 fill="#EBA352"
    //               />
    //               <path
    //                 d="M11.1408 10.7335C11.6408 10.1669 12.6408 10.4335 13.3408 11.9002C13.8408 12.9002 13.9742 12.7002 14.2408 12.7669V11.8669C14.2408 11.8669 20.8742 11.4335 20.8742 12.4335C20.8742 12.4335 21.1742 14.9002 20.5408 16.4335C19.5742 18.7335 14.6408 19.3335 13.1075 15.4335C12.8075 14.6669 12.3742 13.8335 12.0408 13.0002C11.6075 12.0002 10.5742 11.4002 11.1408 10.7335Z"
    //                 fill="#FFDD67"
    //               />
    //               <path
    //                 d="M11.4742 10.5C10.4075 11.3 12.3742 12.8333 13.3075 15.2C14.6409 18.6 18.5409 18.6 20.1742 17.0333C18.6742 18.8 14.5075 19.1333 13.1075 15.4333C12.1742 13.0333 9.90754 11.2 11.4742 10.5Z"
    //                 fill="#EBA352"
    //               />
    //               <path
    //                 d="M13.9409 12.7331C15.2409 12.2665 17.9743 13.1665 17.6076 15.7665C17.6076 13.3331 15.4409 12.7665 14.2409 12.7665C14.0743 12.7665 13.9409 12.7331 13.9409 12.7331Z"
    //                 fill="#EBA352"
    //               />
    //             </svg>
    //           </p>
    //           <p>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="25"
    //               height="24"
    //               viewBox="0 0 25 24"
    //               fill="none"
    //             >
    //               <mask
    //                 id="mask0_65979_17710"
    //                 style="mask-type: alpha"
    //                 maskUnits="userSpaceOnUse"
    //                 x="0"
    //                 y="0"
    //                 width="25"
    //                 height="24"
    //               >
    //                 <rect x="0.936523" width="24" height="24" fill="#D9D9D9" />
    //               </mask>
    //               <g mask="url(#mask0_65979_17710)">
    //                 <path
    //                   d="M12.9365 22C11.5532 22 10.2532 21.7375 9.03652 21.2125C7.81986 20.6875 6.76152 19.975 5.86152 19.075C4.96152 18.175 4.24902 17.1167 3.72402 15.9C3.19902 14.6833 2.93652 13.3833 2.93652 12C2.93652 10.6167 3.19902 9.31667 3.72402 8.1C4.24902 6.88333 4.96152 5.825 5.86152 4.925C6.76152 4.025 7.81986 3.3125 9.03652 2.7875C10.2532 2.2625 11.5532 2 12.9365 2C13.6865 2 14.4157 2.07917 15.124 2.2375C15.8324 2.39583 16.5032 2.625 17.1365 2.925C17.0699 3.09167 17.0199 3.26667 16.9865 3.45C16.9532 3.63333 16.9365 3.81667 16.9365 4C16.9365 4.23333 16.9615 4.45417 17.0115 4.6625C17.0615 4.87083 17.1282 5.06667 17.2115 5.25C16.5949 4.86667 15.9282 4.5625 15.2115 4.3375C14.4949 4.1125 13.7365 4 12.9365 4C10.7199 4 8.83236 4.77917 7.27402 6.3375C5.71569 7.89583 4.93652 9.78333 4.93652 12C4.93652 14.2167 5.71569 16.1042 7.27402 17.6625C8.83236 19.2208 10.7199 20 12.9365 20C15.1532 20 17.0407 19.2208 18.599 17.6625C20.1574 16.1042 20.9365 14.2167 20.9365 12C20.9365 11.3333 20.8574 10.6917 20.699 10.075C20.5407 9.45833 20.3199 8.875 20.0365 8.325C20.3032 8.54167 20.5949 8.70833 20.9115 8.825C21.2282 8.94167 21.5699 9 21.9365 9C22.0199 9 22.1074 8.99583 22.199 8.9875C22.2907 8.97917 22.3782 8.96667 22.4615 8.95C22.6115 9.43333 22.7282 9.92917 22.8115 10.4375C22.8949 10.9458 22.9365 11.4667 22.9365 12C22.9365 13.3833 22.674 14.6833 22.149 15.9C21.624 17.1167 20.9115 18.175 20.0115 19.075C19.1115 19.975 18.0532 20.6875 16.8365 21.2125C15.6199 21.7375 14.3199 22 12.9365 22ZM16.4365 11C16.8699 11 17.2282 10.8583 17.5115 10.575C17.7949 10.2917 17.9365 9.93333 17.9365 9.5C17.9365 9.06667 17.7949 8.70833 17.5115 8.425C17.2282 8.14167 16.8699 8 16.4365 8C16.0032 8 15.6449 8.14167 15.3615 8.425C15.0782 8.70833 14.9365 9.06667 14.9365 9.5C14.9365 9.93333 15.0782 10.2917 15.3615 10.575C15.6449 10.8583 16.0032 11 16.4365 11ZM9.43652 11C9.86986 11 10.2282 10.8583 10.5115 10.575C10.7949 10.2917 10.9365 9.93333 10.9365 9.5C10.9365 9.06667 10.7949 8.70833 10.5115 8.425C10.2282 8.14167 9.86986 8 9.43652 8C9.00319 8 8.64486 8.14167 8.36152 8.425C8.07819 8.70833 7.93652 9.06667 7.93652 9.5C7.93652 9.93333 8.07819 10.2917 8.36152 10.575C8.64486 10.8583 9.00319 11 9.43652 11ZM12.9365 17.5C14.1199 17.5 15.1657 17.175 16.074 16.525C16.9824 15.875 17.6365 15.0333 18.0365 14H7.83652C8.23652 15.0333 8.89069 15.875 9.79902 16.525C10.7074 17.175 11.7532 17.5 12.9365 17.5ZM20.9365 5H19.9365C19.6532 5 19.4157 4.90417 19.224 4.7125C19.0324 4.52083 18.9365 4.28333 18.9365 4C18.9365 3.71667 19.0324 3.47917 19.224 3.2875C19.4157 3.09583 19.6532 3 19.9365 3H20.9365V2C20.9365 1.71667 21.0324 1.47917 21.224 1.2875C21.4157 1.09583 21.6532 1 21.9365 1C22.2199 1 22.4574 1.09583 22.649 1.2875C22.8407 1.47917 22.9365 1.71667 22.9365 2V3H23.9365C24.2199 3 24.4574 3.09583 24.649 3.2875C24.8407 3.47917 24.9365 3.71667 24.9365 4C24.9365 4.28333 24.8407 4.52083 24.649 4.7125C24.4574 4.90417 24.2199 5 23.9365 5H22.9365V6C22.9365 6.28333 22.8407 6.52083 22.649 6.7125C22.4574 6.90417 22.2199 7 21.9365 7C21.6532 7 21.4157 6.90417 21.224 6.7125C21.0324 6.52083 20.9365 6.28333 20.9365 6V5Z"
    //                   fill="black"
    //                 />
    //               </g>
    //             </svg>
    //           </p>
    //           <p onclick="this.openThread('test')" class="cursor-pointer">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="25"
    //               height="24"
    //               viewBox="0 0 25 24"
    //               fill="none"
    //             >
    //               <mask
    //                 id="mask0_65979_17714"
    //                 style="mask-type: alpha"
    //                 maskUnits="userSpaceOnUse"
    //                 x="0"
    //                 y="0"
    //                 width="25"
    //                 height="24"
    //               >
    //                 <rect x="0.936523" width="24" height="24" fill="#D9D9D9" />
    //               </mask>
    //               <g mask="url(#mask0_65979_17714)">
    //                 <path
    //                   d="M7.93652 14H17.9365C18.2199 14 18.4572 13.904 18.6485 13.712C18.8405 13.5207 18.9365 13.2833 18.9365 13C18.9365 12.7167 18.8405 12.479 18.6485 12.287C18.4572 12.0957 18.2199 12 17.9365 12H7.93652C7.65319 12 7.41552 12.0957 7.22352 12.287C7.03219 12.479 6.93652 12.7167 6.93652 13C6.93652 13.2833 7.03219 13.5207 7.22352 13.712C7.41552 13.904 7.65319 14 7.93652 14ZM7.93652 11H17.9365C18.2199 11 18.4572 10.904 18.6485 10.712C18.8405 10.5207 18.9365 10.2833 18.9365 10C18.9365 9.71667 18.8405 9.479 18.6485 9.287C18.4572 9.09567 18.2199 9 17.9365 9H7.93652C7.65319 9 7.41552 9.09567 7.22352 9.287C7.03219 9.479 6.93652 9.71667 6.93652 10C6.93652 10.2833 7.03219 10.5207 7.22352 10.712C7.41552 10.904 7.65319 11 7.93652 11ZM7.93652 8H17.9365C18.2199 8 18.4572 7.90433 18.6485 7.713C18.8405 7.521 18.9365 7.28333 18.9365 7C18.9365 6.71667 18.8405 6.479 18.6485 6.287C18.4572 6.09567 18.2199 6 17.9365 6H7.93652C7.65319 6 7.41552 6.09567 7.22352 6.287C7.03219 6.479 6.93652 6.71667 6.93652 7C6.93652 7.28333 7.03219 7.521 7.22352 7.713C7.41552 7.90433 7.65319 8 7.93652 8ZM21.2365 20.3L18.9365 18H4.93652C4.38652 18 3.91586 17.8043 3.52452 17.413C3.13252 17.021 2.93652 16.55 2.93652 16V4C2.93652 3.45 3.13252 2.979 3.52452 2.587C3.91586 2.19567 4.38652 2 4.93652 2H20.9365C21.4865 2 21.9575 2.19567 22.3495 2.587C22.7409 2.979 22.9365 3.45 22.9365 4V19.575C22.9365 20.025 22.7325 20.3373 22.3245 20.512C21.9159 20.6873 21.5532 20.6167 21.2365 20.3ZM4.93652 4V16H19.7615L20.9365 17.175V4H4.93652Z"
    //                   fill="black"
    //                 />
    //               </g>
    //             </svg>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //       `
    //         )
    //         .join('');
    //     }
  }
}
