import { AfterViewInit, Component } from '@angular/core';
declare var lightGallery: any;
import 'lg-video.js';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements AfterViewInit {
  private albums =
    {
      video: [
        {
          'src': 'https://www.youtube.com/watch?v=07m_bT5_OrU',
          'poster': '../assets/poster/video1.PNG'
        },
        {
          'src': 'https://www.youtube.com/watch?v=668nUCeBHyY',
          'poster': '../assets/poster/video2.PNG'
        },
        {
          'src': 'https://www.youtube.com/watch?v=fN017XSZN44',
          'poster': '../assets/poster/video3.PNG'
        },
        {
          'src': 'https://www.youtube.com/watch?v=b2ymoxhKU1k',
          'poster': '../assets/poster/video4.PNG'
        },
        {
          'src': 'https://www.youtube.com/watch?v=F6nZT2Rx0tE',
          'poster': '../assets/poster/video5.PNG'
        },
        {
          'src': ' https://www.youtube.com/watch?v=QbCa-BeuJiU',
          'poster': '../assets/poster/video6.PNG'
        },
        {
          'src': 'https://www.youtube.com/watch?v=02HvIJYj3m4',
          'poster': '../assets/poster/video7.PNG'
        }
      ],
      images: [
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(1).jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(1).jpg'
        },
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(2).jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(2).jpg'
        },
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(3).jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(3).jpg'
        },
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(4).jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(4).jpg'
        },
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(5).jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(5).jpg'
        },
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(6).jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(6).jpg'
        },
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(7).jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(7).jpg'
        },
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(8).jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(8).jpg'
        },
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(9).jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(9).jpg'
        },
      ]
    }
  ngAfterViewInit() {
    lightGallery(document.getElementById('video-gallery'));
    lightGallery(document.getElementById('animated-thumbnials'), {
      thumbnail: true,
      animateThumb: false,
      showThumbByDefault: false,
      download:false
    });

  }
  onImageScrollDown() {
    console.log('Image scrolled down!!');
    var start = this.albums.images.length + 1;
    var sum = start + 5;
    if (sum > 130) {
      return;
    }
    for (var i = start; i < sum; i++) {
      this.albums.images.push(
        {
          'imgSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(' + i + ').jpg',
          'thumbSrc': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(' + i + ').jpg'
        }
      )
    }
    console.log(this.albums, 'check')
    lightGallery(document.getElementById('animated-thumbnials'), {
      thumbnail: true,
      animateThumb: false,
      showThumbByDefault: false
    });
  }
  onVideoScrollDown() {
    console.log('scrolled down');
    let start = this.albums.video.length;
    let sum = start + 3;
    if (sum > 10) {
      return;
    }
    this.albums.video.push(
      {
        'src': 'https://www.youtube.com/watch?v=Wjrrgrvq1ew',
        'poster': '../assets/poster/video8.PNG'
      },
      {
        'src': 'https://www.youtube.com/watch?v=qTcskA1R1KA',
        'poster': '../assets/poster/video9.PNG'
      },
      {
        'src': 'https://www.youtube.com/watch?v=IUN664s7N-c',
        'poster': '../assets/poster/video10.PNG'
      }
    )
    setTimeout(function () {
      lightGallery(document.getElementById('video-gallery'));
    });
  }

}
