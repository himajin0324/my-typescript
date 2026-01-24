import classes from "./css/GetPrimeForm.module.css";
import { useRef, useState, useEffect } from "react";
import { isPrime, fact, get_Prime_Place, mersenne_det } from "./scripts/MathManager.ts";
import { LoadNum, SaveNum, } from "./scripts/DataManager.ts";

//前回入力した値，次の入力値と同じであれば判定を行わない
//リロードでリセットされる
let previousNum: number | null = null;

export default function GetPrimeForm(){
    const inputRef = useRef<HTMLInputElement>(null);
    const [result, setResult] = useState<React.JSX.Element | null>(null);
    //ページに戻ってきたときだけ実行
    useEffect(() => {
        previousNum = null;
    }, []);
    const handleClick = () => {
        //入力値がnull or NaN（数値以外）
        if (!inputRef.current)return;
        const inputNum = Number(inputRef.current.value);
        //入力値がNaN（数値以外）-(10^9)~10~9（安全値）
        if (isNaN(inputNum) || 
            -(10**9) >= inputNum || 
            inputNum >= 10**9){
            setResult(<div>
                正常値を入力してください．
            </div>);
            return;
        }
        console.log("previousNum：", previousNum);
        //判定は1回のみ
        if (previousNum === null || previousNum !== inputNum)
        {
            //入力値が素数
            if (isPrime(inputNum) == true){
                //メルセンヌ数の判定
                const mer = mersenne_det(inputNum);
                if (mer != 0)
                {
                    setResult(<div>
                        {inputNum}は素数<br></br>
                        {get_Prime_Place(inputNum)}番目の素数です<br></br>
                        メルセンヌ素数({mer})です!!!<br></br>
                        神出鬼没(？)な素数
                    </div>);
                }
                else
                {
                    setResult(<div>
                        {inputNum}は素数<br></br>
                        {get_Prime_Place(inputNum)}番目の素数です
                    </div>);
                }
            }
            else {
                setResult(<div>
                    {inputNum}は素数でない<br></br>
                    {fact(inputNum)}
                </div>);
            }
            previousNum = inputNum;
        }
    }

    return(<div>
        <h1 className={classes.title}>素数チェッカー</h1>
        <div className={classes.container}>
            <div className={classes.text}>入力した値が素数かどうかを判定することができます．</div>
            <div className={classes.concBox}>
                {result}
            </div>
            <input
                type="text"
                ref={inputRef}
                className={classes.inputBox}
                placeholder="整数値を入力してください"
                onKeyDown={e => {
                    //Enterキーでも入力OK
                    if (e.key === "Enter") handleClick();
                }}
            />
            <button onClick={handleClick} className={classes.button}>素数判定</button>
        </div>
    </div>
    );
}