import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { BookmarkService } from './bookmark.service';
import { BookmarkListComponent } from './bookmark-list.component';
import { BookmarkEditComponent } from './bookmark-edit.component';

@Component({
    selector: 'bookmark-app',
    directives: [BookmarkEditComponent, BookmarkListComponent],
    providers: [HTTP_PROVIDERS, BookmarkService],
    template: `
        <bookmark-edit
            (save)="save($event)"
            (clear)="clear()"
            [bookmark]="editableBookmark">
        </bookmark-edit>
        <bookmark-list
            [bookmarks]='bookmarks'
            (remove)="remove($event)"
            (edit)="edit($event)">
        </bookmark-list>
    `,
})

export class AppComponent {

    bookmarks = [];
    editableBookmark = {};

    constructor(private bookmarkService: BookmarkService){
        // the errorHandler should be first
        this.bookmarkService.errorHandler = error => window.alert('Ooops! The server request failed.');

        this.reload();
    }

    clear(){
        this.editableBookmark = {};
    }

    save(bookmark) {
        // console.info('should save', bookmark);

        if (bookmark.id) {
            this.bookmarkService.updateBookmark(bookmark)
                .then(() => this.reload());
        } else {
            this.bookmarkService.addBookmark(bookmark)
                .then(() => this.reload());
        }
        this.clear();
    }

    remove(bookmark){
        this.bookmarkService.removeBookmark(bookmark)
            .then(() =>  this.reload());
    }

    edit(bookmark){
        // Object.assign - in this case is safety to use it - all properties are string
        this.editableBookmark = Object.assign({}, bookmark);
    }

    private reload(){
        return this.bookmarkService.getBookmarks()
            .then(bookmarks => this.bookmarks = bookmarks);
    }
}


