import { Component } from '@angular/core';
import { ImageService } from './core/misc/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'santaMaria-llamado';

  firstColor!:string;
  secondColor!:string;

  constructor(
    private imageService: ImageService
  ) {}

  loadEmpresa(color:string, logo:string) {
     this.firstColor = color;
     this.imageService.setImageUrl(logo);
  }
}
