//素因数分解ゲーム
import { useState, useEffect } from "react";
import { makeTarget } from "./scripts/MathManager.ts";
import classes from "./css/PrimeGame.module.css";

export default function PrimeGame(){
    //値の保持に通常の変数を用いない：初期化対策(Reactの機能)
    //画面を更新してくれる
    //通常の書き方だと値は変わっても画面は更新されない

    //入力値を格納する配列
    //inputの値で割るため，空リスト防止で[1]を初期値
    const [input, setInput] = useState<number[]>([1]);
    //画面表示用の入力素数文字列
    const [inputString, setInputString] = useState("");
    //メッセージ表示用
    const [message, setMessage] = useState("");
    //使える素数
    const primes = [2,3,5,7,11,13]
    //割るターゲット
    const [Target, setTarget] = useState<number>(makeTarget(primes, 2));
    //スコア
    const [Score, setScore] = useState<number>(0);
    //制限時間:1minutes
    const targetSecond = 60;
    //残り時間を格納する
    const [Second, setSecond] = useState<number>(targetSecond);
    //ゲーム終了フラグ
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    //残り時間を更新
    const updateCountDown = () => {
        if (Second <= 0){
            setSecond(0);
            setIsGameOver(true);//0になったら終了
        }
        else setSecond(prev => prev - 1);
    }
    //1秒毎に残り時間を更新
    //ボタンクリックなど，コンポーネントがレンダリングされる毎に
    //setIntervalが実行され，タイマーが毎回新たに作成されてしまうため，
    //useEffectを使って一度だけ作成し，最後にclearする
    //useEffect関数は[]に入っている値のどれかが更新されたら実行される
    useEffect(() => {
        if (isGameOver) return;
        const timer = setInterval(updateCountDown, 1000);
        return () => clearInterval(timer);
    }, [isGameOver, Second]);
    //画面に入力素数を表示
    const onPrime = (n:number) => {
        setInput((prev) => [...prev, n]);
        setInputString((prev) => (prev === "" ? `${n}` : `${prev}×${n}`));
    }
    //自動で割る処理
    const autoDiv = () => {
        //入力値が無い場合
        if (input.length <= 1 && Target !== 1) {
            setMessage("素数を選んでください");
            return;
        }
        let result = Target;
        let i = 1;
        //割り算
        function step() {
            const prime = input[i];
            //入力値を使い切った
            if (i >= input.length) {
                //全て割り終わった
                setInput([1]);
                setInputString("");
                setMessage("");
                if (result === 1) {
                    setMessage("クリア！");
                    setTarget(makeTarget(primes, 2));
                    setScore(prev => prev + 1);
                }
                return;
            }
            //入力値で割り切れた
            else if (result % prime === 0) {
                result = result / prime;
                //inputから使った素数を消す
                const newInput = [1, ...input.slice(i + 1)];
                setInput(newInput);
                //inputStringも更新
                const inputPrimes = newInput.slice(1);
                setInputString(inputPrimes.length > 0 ? inputPrimes.join("×") : "");
                setTarget(result);
                setMessage("");
                i++;
                //500ms後にstepを実行⇒素数を1つずつ割るモーション
                setTimeout(step, 300);
            }
            else
            {
                setInput([1]);
                setInputString("");
                setMessage("割れませんでした！");
            }
        }
        step();
    }
    //入力した素数を消す
    const deleteInput = () => {
        if (input.length > 1)
        {
            //後ろから1番目までのコピーを返す
            const newInput = input.slice(0, -1);
            setInput(newInput);
            const inputPrimes = newInput.slice(1);
            setInputString(inputPrimes.join("×"));            
        }
    }
    return (
        isGameOver ? (
            <PrimeGameResultComponent score={Score} />
        ) : (
            <div className={classes.center}>
                <div className={classes.panel}>
                <div className={classes.time}>TIME: {Second} s</div>
                <div className={classes.score}>SCORE: {Score}</div>
                <h2 className={classes.title}>素因数分解ゲーム</h2>
                <div className={classes.target}><span>{Target}</span></div>
                <div className={classes.input}>入力: <span>{inputString}</span></div>
                <div className={classes.message}>{message}</div>
                <div className={classes.buttonArea}>
                    {primes.slice(0, 3).map((p) => (
                        <button
                            key={p}
                            className={classes.primeButton}
                            onClick={() => onPrime(p)}
                        >
                            {p}
                        </button>
                    ))}
                    <button className={classes.clearButton} onClick={deleteInput}>消す</button>
                </div>
                <div className={classes.buttonArea}>
                    {primes.slice(3, 6).map((p) => (
                        <button
                            key={p}
                            className={classes.primeButton}
                            onClick={() => onPrime(p)}
                        >
                            {p}
                        </button>
                    ))}
                    <button className={classes.divButton} onClick={autoDiv}>割る</button>
                </div>
            </div>
        </div>
        )
    );
}

function PrimeGameResultComponent({ score }: { score: number }) {
    const handleRetry = () => {
        window.location.reload();
    }
    
    return (
        <div className={classes.center}>
            <div className={classes.panel}>
                <h2 className={classes.title}>ゲーム終了</h2>
                <div className={classes.resultScore}>YOUR SCORE: {score}</div>
                <button className={classes.resultButton} onClick={handleRetry}>
                    もう一度プレイ
                </button>
            </div>
        </div>
    );
}
