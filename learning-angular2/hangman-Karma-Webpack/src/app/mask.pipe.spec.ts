/**
 * not needed if you use:
 * typings install --save --global dt~jasmine
 * (look typings.json file)
 */
// import { describe, expect, it } from '@angular/core/testing';
import { MaskPipe } from './mask.pipe';

describe('MaskPipe', () => {
    const maskPipe = new MaskPipe();

    it('should hide everyting when no letter selected', () => {
        const masked = maskPipe.transform('ANGULAR', '');
        expect(masked).toBe('*******');
    })

    it('should reveal only the selected letter', () => {
        const masked = maskPipe.transform('ANGULAR', 'A');
        expect(masked).toBe('A****A*');
    })

    it('should reveal only the selected letter', () => {
        const masked = maskPipe.transform('ANGULAR', 'ABCL');
        expect(masked).toBe('A***LA*');
    })

    it('should reveal everything when all letter selected', () => {
        const masked = maskPipe.transform('ANGULAR', 'ANGULR');
        expect(masked).toBe('ANGULAR');
    })
});