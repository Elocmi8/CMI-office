/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterLayer('clockZone').subscribe(() => {
    console.log('toto')
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

WA.room.onEnterLayer('FollowUs').subscribe(() => {
    currentPopup =  WA.ui.openPopup("socialmedia","Follow us on",[
            {
                label: 'Facebook',
                className: 'primary',
                callback: () => WA.nav.openTab('https://www.facebook.com/CMIRennes'),
            },
            {
                label: 'Insta',
                className: 'error',
                callback: () => WA.nav.openTab('https://www.instagram.com/cmirennes/'),
            },
			{
                label: 'Twitter',
                className: 'primary',
                callback: () => WA.nav.openTab('https://twitter.com/CMIRennes'),
            }
        ] );
})

WA.room.onLeaveLayer('FollowUs').subscribe(closePopUp)

WA.room.onEnterLayer('attenteBureau').subscribe(() => {
    currentPopup =  WA.ui.openPopup("bureaux","If there is already 2 people inside, please wait here.",[]);
})

WA.room.onLeaveLayer('attenteBureau').subscribe(closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

