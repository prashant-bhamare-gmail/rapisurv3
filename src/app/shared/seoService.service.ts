import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class SEOService {
    constructor(private title: Title, private meta: Meta) { }


    updateTitle(title: string) {
        this.title.setTitle(title);
    }

    updateOgUrl(url: string) {
        this.meta.updateTag({ property: 'og:url', content: url })
    }

    updateDescription(desc: string) {
        this.meta.updateTag({ property: 'og:description', content: desc })
    }

    updateImage(image: string) {
        this.meta.updateTag({ property: 'og:image', content: image })
    }

    setMeta(title: string, description: string, image: string, url: string) {
        this.meta.addTags([
            { property: 'og:title', content: title },
           // { property: 'og:url', content: url },
            { property: 'og:description', content: description },
            { property: 'og:image', content: image },
        ], true)
    }

}