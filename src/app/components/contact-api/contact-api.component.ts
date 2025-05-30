import { Component } from '@angular/core';
import { ContactApiService } from '../../tools/service/contact-api.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-contact-api',
  standalone: false,
  templateUrl: './contact-api.component.html',
  styleUrl: './contact-api.component.scss'
})
export class ContactApiComponent {

  constructor(private _contactApi : ContactApiService) {}

  messageErreur : string = "";

  posts : Post[] = [];

  etatModif : boolean = false;

  postModifie! : Post;

  ngOnInit(): void {
    this._contactApi.RecupererPosts().subscribe({
      next : (data) => {
        this.posts = data.slice(0,10);
      },
      error: (error) => {
        // En cas d'erreur http, on stocke un message pour l'afficher...
        this.messageErreur = error.message;
      },
      complete : () => {
        console.log("✅ Récupération des post ok !!!!");
      }
    })
  }

  ModifPost() : void{
    this._contactApi.ModifPost(this.postModifie).subscribe({
      next : (data) => {
        // On retrouve le post dans la liste initale et on le remplace
        const index = this.posts.findIndex((p) => p.id === data.id);
        if (index !== -1) {
          console.log("je passe dans l'update de la liste");
          console.log(data);
          this.posts[index] = data;
          this.etatModif =false;
        }
      },
      error : (error) => {
        console.error('⛔ Erreur lors de la modification :', error.message)
      },
      complete : () => {
        console.log('Modif réalisé !!!');
      }
    })
  }

  /**
   * Active l'état de modification et clone le post cliqué
   * @param post le post sélectionné pour modification
   */
  Modif(post : Post) : void {
    // on clone le post pour éviter de modifier la liste
    this.postModifie = {...post};
    this.etatModif = true;
  }
}
