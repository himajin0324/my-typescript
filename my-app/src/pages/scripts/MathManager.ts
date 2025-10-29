//数学的処理を行う関数をまとめたスクリプト
//素数を生成
//Math.random()は小数の乱数を生成するので10001の積をとることで~10000までの素数を生成している
//いつか桁数も調節できるようにしたい
export const MakePrime = () => {
    let n = Math.floor(Math.random() * 10001);
    while (!isPrime(n))
    {
        n = Math.floor(Math.random() * 10001);
    }
    return n;
}
//素数:true/false
export const isPrime = (n:number) => {
    if (n<2) return false;
    //nの約数は√n以下に必ず存在するため、i*i<=n
    for (let i = 2; i * i <= n; i++)
    {
        if (n % i == 0) return false;
    }
    return true;
}
//count番目の素数
export const get_Prime_Place = (n:number) => {
    let count = 0;
    for (let i = 2; i <= n; i++){
        if (isPrime(i))count++;
    }
    return count;
}
//素因数分解:stringで結果出力
export const fact = (n:number) => {
    let i = 2;
    const array:number[] = [];
    let str = "";
    //負の値が渡された→-1で割る
    if (n < 0)
    {
        array.push(-1);
        n /= -1;
    }
    while(i <= n){
        //割り切れた！=iはnの因数
        if (n % i == 0)
        {
            //配列の最後尾に値を追加
            array.push(i);
            n /= i;
        }
        else{
            i++;
        }
    }
    while (array.length > 0){
        str += String(array.shift());
        if (array.length > 0)str += "×";
    }
    return str;
}