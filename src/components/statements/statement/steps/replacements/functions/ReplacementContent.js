import PdfContent from "../../pages/functions/PdfContent";

class ReplacementContent{
    constructor(){
        this.pdfContent = new PdfContent();
    }

    get_replacement_content(content, replacement){
        let tmpResult = { 'content': window.btoa(unescape(encodeURIComponent(content))), 'font': [] }; // { 'selector': '', 'font_id': '', 'content': [] }

        // get content on array
        let tmpContent = content.match(/(\/F[0-9] [+-]?([0-9]*[.])?[0-9]+ Tf)|(\((.*?)\)Tj)/g);
        // get indexes of content
        let tmpRegContentIndexes = content.matchAll(/(\/F[0-9] [+-]?([0-9]*[.])?[0-9]+ Tf)|(\((.*?)\)Tj)/g);
        let tmpContentIndexes = [];
        for (let pos of tmpRegContentIndexes) { tmpContentIndexes.push(pos.index);}

        let tmpSelector = '', tmpSelectorIndex = -1;
        for (let key in tmpContent){
            if (tmpContent[key].substr(0, 1)!='('){
                // get selector
                tmpSelector = (tmpContent[key].substr(tmpContent[key].indexOf('/F')+1, tmpContent[key].indexOf(' ', tmpContent[key].indexOf("/F")+1))).trim();
                // serach selector in result
                tmpSelectorIndex = this.#get_selector_index(tmpResult['font'], tmpSelector);
                if (tmpSelectorIndex==-1){
                    let selected_index =-1;
                    if (replacement!=undefined){
                        selected_index = this.#get_selector_index(replacement['font'], tmpSelector);
                    }
                    let font_id = '';
                    if (selected_index!=-1){
                        font_id = replacement['font'][selected_index]['font_id'];
                    }
                    tmpResult['font'].push({ 'selector': tmpSelector, 'font_id': font_id, 'content': [] });
                    tmpSelectorIndex = tmpResult['font'].length-1;
                }

                continue;
            }

            tmpResult['font'][tmpSelectorIndex]['content'].push({
                'text': tmpContent[key],
                'hex': '',
                'ascii': '',
                'pos_on_content': tmpContentIndexes[key]
            });

        }
        return tmpResult;
    }

    #get_selector_index(all, selector){
        let exists = false, exists_index = -1;
        for (let key in all){
            if (selector==all[key]['selector']){
                exists = true;
                exists_index = key;
                break;
            }
        }
        return exists_index;
    }

    char_2_hex(replacement, fonts){
        for (let key in replacement['font']){
            if (replacement['font'][key]['font_id']!='' && replacement['font'][key]['font_id']!=null){
                let font = this.#get_font_data(replacement['font'][key]['font_id'], fonts);
                
                // all content
                for (let key1 in replacement['font'][key]['content']){
                    
                    // all chars
                    let hex = '';
                    for (let i = 1; i<replacement['font'][key]['content'][key1]['text'].length-3; i++){
                        
                        let char = replacement['font'][key]['content'][key1]['text'].substr(i, 1);

                        // find char on font
                        for (let key2 in font['fonts']){
                            if (char==font['fonts'][key2]['ascii']){
                                hex += font['fonts'][key2]['hex'];
                                break;
                            }
                        }
                    }
                    replacement['font'][key]['content'][key1]['hex'] = hex;
                }

            }else{
                for (let key1 in replacement['font'][key]['content']){
                    replacement['font'][key]['content'][key1]['hex'] = '';
                    replacement['font'][key]['content'][key1]['ascii'] = '';
                }
            }

        }
        return replacement;
    }

    #get_font_data(id, fonts){
        for (let key in fonts){
            if (id==fonts[key]['id']){
                return fonts[key];
            }
        }
    }

    get_account_summary(statement, period, types){
        let result = this.pdfContent.get_account_summary(statement, period, types);

        return result;
    }

    get_important_information(statement, period){
        let result = this.pdfContent.get_importatnt_information(statement, period);

        return result;
    }

    get_transactions(statement, period, page, types){
        let result = this.pdfContent.get_transactions(statement, period, page, types);

        return result;
    }

    get_service_fees(statement, period, current_page){
        let result = this.pdfContent.get_service_fees(statement, period, current_page);

        return result;
    }

    get_daily_balances(statement, period, current_page){
        let result = this.pdfContent.get_daily_balances(statement, period);

        return result;
    }

    get_blank_page(statement, period, current_page){
        let result = this.pdfContent.get_blank_page(statement, period, current_page);

        return result;
    }
}

export default ReplacementContent;