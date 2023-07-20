import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/core/misc/image.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public imageUrl!:string;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.imageService.imageUrl$.subscribe((url: string) => {
      this.imageUrl = url;
    });
  }

}
