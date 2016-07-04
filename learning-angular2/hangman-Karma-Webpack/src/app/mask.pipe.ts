import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'mask'})
export class MaskPipe implements PipeTransform {

    transform(value: string, selection: string){
        let masked = '';
        for(let i = 0; i < value.length; i++){
            const c = value.charAt(i);
            if(selection.includes(c)){
                masked += c;
            }else{
                masked += '*';
            }
        }
        // return '*'.repeat(value.length);
        return masked;
    }

    
}