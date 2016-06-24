import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BookmarkService{

    errorHandler = error => console.error('BookmarkService error', error);
    private baseUrl = 'https://udemy-angular2-36dea.firebaseio.com/';

    constructor(private http: Http){

    }

    addBookmark(bookmark){
        const json = JSON.stringify(bookmark);
        return this.http.post(`${this.baseUrl}/bookmarks.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    getBookmarks() {
        //template literal alternative of concatenating string
        return this.http.get(`${this.baseUrl}/bookmarks.json`)
            .toPromise()
            .then(response => this.convert(response.json()))
            .catch(this.errorHandler);
    }

    removeBookmark(bookmark){
        return this.http.delete(`${this.baseUrl}x/bookmarks/${bookmark.id}.json`)
            .toPromise()
            .catch(this.errorHandler);
    }

    updateBookmark(bookmark){
        const json = JSON.stringify({
            title: bookmark.title,
            url: bookmark.url
        });
        return this.http.patch(`${this.baseUrl}/bookmarks/${bookmark.id}.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    private convert(parserResponse){
        return Object.keys(parserResponse)
            .map(id => ({
                id: id,
                title: parserResponse[id].title,
                url: parserResponse[id].url
            }))
            .sort((a, b)=> a.title.localeCompare(b.title));
    }

}