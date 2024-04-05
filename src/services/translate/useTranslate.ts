import { useAppSelector } from "../../lib/redux/hook";
import { fr } from "./fr";
import { en } from "./en";

function translate (key: string, lang: string, variables?: any):string {
    let langObj = fr;

    switch(lang) {
        case 'fr':
            langObj = fr;
        break;

        case 'en':
            langObj = en;
        break;

        default:
            langObj= fr
        break;
    }

    const splitKey = key.split('.');
    let value: any = {...langObj}

    for (let i = 0; i < splitKey.length; i++) {
        if(value[splitKey[i]])  {
            value = value[splitKey[i]];
        }
    }

    if(variables) {
        const splitedValue = value.split('<%');
        let result = '';

        if(splitedValue.length > 0)  {
            for(let j = 0; j < splitedValue.length; j++) {
                const s = splitedValue[j].split('>');

                if(s.length === 1) {
                    result+=s[0]
                }
                
                if(s.length === 2) {
                    result += variables[s[0]]
                    result+=s[1]
                }    
            }
        }

        return result;
    } else {
        return value;
    }
}

export function useTranslate() {
    const user = useAppSelector(state => state.user);
    const lang = user.lang;

    return (key: string, variables?: any): string => {
        return translate(key, lang, variables);
    };
}