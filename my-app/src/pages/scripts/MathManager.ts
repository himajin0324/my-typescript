//数学的処理を行う関数をまとめたスクリプト

//素数を生成
//digit桁まで
export const makePrime = (digit:number) => {
    const d = 10**(digit);
    //floorで小数以下切り捨て
    let n = Math.floor(Math.random() * d);
    while (!isPrime(n))
    {
        n = Math.floor(Math.random() * d);
    }
    return n;
}
//引数で指定した因数を持つ値を生成
export const makeTarget = (arrayFactor:number[], range:number) => {
    //因数配列
    const facts = [...arrayFactor];//jsでは参照渡しなのでコピー
    //因数配列を1/2ずつに分ける
    const size = Math.floor(facts.length / 2);
    const facts_small = [...facts].slice(0, size);//小さい因数
    const facts_big = [...facts].slice(size);//大きい因数
    let n = 1;
    n *= facts_small[Math.floor(Math.random() * facts_small.length)];
    while (facts_small.length > 0){
        //せいぜいrange個までの素因数
        n *= Number(facts_small.shift())**(Math.floor(Math.random() * (range + 1)));
    }
    while (facts_big.length > 0)
    {
        //せいぜいrange-1個までの素因数⇒大きい因数ほど現れにくくなる
        n *= Number(facts_big.shift())**(Math.floor(Math.random() * (range)));
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
        //配列の"先頭"から値を取り出す
        str += String(array.shift());
        if (array.length > 0)str += "×";
    }
    return str;
}
//メルセンヌ数かどうかを判定する(2^n-1の形で文字列を返す)
export const mersenne_det = (n:number) => {
    if (Number.isInteger(Math.log2(n + 1)))
    {
        const str = "2^" + String(Math.log2(n + 1)) + " - 1";
        return str;
    }
    else return 0;
}