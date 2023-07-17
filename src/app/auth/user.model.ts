export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token(){
        //如果沒有存在日期或是存在的日期已經小於現在的日期回傳空值
        if(!this._tokenExpirationDate || new Date()> this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}