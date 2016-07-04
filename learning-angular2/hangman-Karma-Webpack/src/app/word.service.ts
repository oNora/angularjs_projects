export class WordService{

    private words = [
        'ANGULAR',
        'DEPENDENCY',
        'INJECTION',
        'COMPONENT',
        'TEMPLATE',
        'SERVICE'
    ];

    getWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }

}