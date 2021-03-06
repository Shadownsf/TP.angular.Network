import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { PostSocketService,ChannelService } from 'services';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Display the channel list, the social feed and the notification bar for logged users.
 * Affiche la liste des channels sur la gauche, les posts au centre, et une barre de notifications sur la gauche
 */
@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];

    constructor(
        private channelService: ChannelService,
        private postSocket: PostSocketService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    async ngOnInit() {
        // utiliser le channelService pour récupérer la liste
        this.channelService.getAll()
            .then((value)=> {
                if(value != undefined)
                {
                    this.channels = value;
                    this.router.navigate(["/channel/" + value[0].id]);
                }
            });

        this.postSocket.onNewChannel((channel:Channel)=>{
            this.channels.push(channel);
        });
        // this.route.firstChild.params permet de connaître les paramètre de l'url
    }
}
