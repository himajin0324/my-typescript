//ブラウザに保存しているデータを管理
import { MakePrime } from "./MathManager.ts";
//データ保存用
export const label = {
    number: "Number", 
    today: "TodayDate", 
    date_stored: "Date_Stored", 
    pre_number: "PreviousNumber"
};
//素数を保存するかロードするか
export const SetNum = () => {
    const n = LoadNum(label.number);
    if (n && getToday() == localStorage.getItem(label.date_stored)) return n;
    else {
        SaveNum(label.number, MakePrime());
        SaveDate(getToday());
        return n;
    }
}

//値を保存
export const SaveNum = (lab:string, n:number) => {
    localStorage.setItem(lab,String(n));
}
//日付を保存
const SaveDate = (date:string) => {
    localStorage.setItem(label.date_stored, date);
}

//保存されている素数をロード
export const LoadNum = (str:string) => Number(localStorage.getItem(str));

//今日の日付をxxxx-xx-xx形式で保存
//負荷軽め（とChatGPTが言っていた）なので毎回呼ぶ
const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;//getMonthは0はじまり
    const day = date.getDate();
    return year + "-" + month + "-" + day;
}

const removeStorage = (str:string) => {
    localStorage.removeItem(str);
}