import classes from "./css/GetPrimeForm.module.css";
import { useRef, useState } from "react";
import { isPrime, fact, get_Prime_Place } from "./scripts/MathManager.ts";
import { label, LoadNum, SaveNum } from "./scripts/DataManager.ts";

export default function GetPrimeForm(){
    const inputRef = useRef<HTMLInputElement>(null);
    const [result, setResult] = useState<React.JSX.Element | null>(null);
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
        //判定は1回のみ
        if (LoadNum(label.pre_number) != inputNum)
        {
            //入力値が素数
            if (isPrime(inputNum) == true){
                setResult(<div>
                    {inputNum}は素数<br></br>
                    {get_Prime_Place(inputNum)}番目の素数です
                </div>);
            }
            else {
                setResult(<div>
                    {inputNum}は素数でない<br></br>
                    {fact(inputNum)}
                </div>);
            }
            SaveNum(label.pre_number, inputNum);
        }
    }

    return(<div>
        <center><h1>素数チェッカー</h1></center>
        <div className={classes.container}>
            <div className={classes.concBox}>
                {result}  
            </div>
            <input
                type="text"
                ref={inputRef}
                className={classes.inputBox}
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