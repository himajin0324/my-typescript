//素因数分解ゲーム
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeTarget } from "./scripts/MathManager.ts";
import { db } from "./scripts/firebase.ts";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import classes from "./css/PrimeGame.module.css";


export default function PrimeGame(){
    const location = useLocation();
    //難易度(String)：デフォ値はノーマル
    const difficulty = location.state?.level || "normal";
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
    //難易度別使える素数
    const difficultySettings: Record<string, { primes: number[], range: number }> = {
        easy: {
            primes: [2, 3, 5, 7],
            range: 2
        },
        normal: {
            primes: [2, 3, 5, 7, 11, 13],
            range: 2
        },
        hard: {
            primes: [2, 3, 5, 7, 11, 13, 17, 19, 23],
            range: 2
        }
    };
    const setting = difficultySettings[difficulty] || difficultySettings.normal;
    //割るターゲット
    const [Target, setTarget] = useState<number>(makeTarget(setting.primes, setting.range));
    //スコア
    const [Score, setScore] = useState<number>(0);
    //制限時間:1minutes
    const targetSecond = 60;
    //残り時間を格納する
    const [second, setSecond] = useState<number>(targetSecond);
    //ゲーム終了フラグ
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    //残り時間を更新
    const updateCountDown = () => {
        if (second <= 0){
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
    }, [isGameOver, second]);
    //画面に入力素数を表示
    const onPrime = (n:number) => {
        //無限に入力できてしまうので修正する
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
                    setTarget(makeTarget(setting.primes, setting.range));
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
    switch (difficulty) {
        case "easy":
            return (
                isGameOver ? (
                    <SetDatabaseComponent score={Score} difficulty={difficulty} />
                ) : (
                    <div className={classes.center}>
                        <div className={classes.panel}>
                            <div className={classes.time}>TIME: {second} s</div>
                            <div className={classes.score}>SCORE: {Score}</div>
                            <div className={`${classes.difficulty} ${classes[difficulty]}`}>LEVEL: {difficulty.toUpperCase()}</div>
                            <div className={classes.target}><span>{Target}</span></div>
                            <div className={classes.input}>入力: <span>{inputString}</span></div>
                            <div className={classes.message}>{message}</div>
                            <div className={classes.buttonArea}>
                                {setting.primes.slice(0, 2).map((p) => (
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
                                {setting.primes.slice(2, 4).map((p) => (
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
        case "normal":
            return (
                isGameOver ? (
                    <SetDatabaseComponent score={Score} difficulty={difficulty} />
                ) : (
                    <div className={classes.center}>
                        <div className={classes.panel}>
                            <div className={classes.time}>TIME: {second} s</div>
                            <div className={classes.score}>SCORE: {Score}</div>
                            <div className={`${classes.difficulty} ${classes[difficulty]}`}>LEVEL: {difficulty.toUpperCase()}</div>
                            <div className={classes.target}><span>{Target}</span></div>
                            <div className={classes.input}>入力: <span>{inputString}</span></div>
                            <div className={classes.message}>{message}</div>
                            <div className={classes.buttonArea}>
                                {setting.primes.slice(0, 3).map((p) => (
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
                                {setting.primes.slice(3, 6).map((p) => (
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
        case "hard":
            return (
                isGameOver ? (
                    <SetDatabaseComponent score={Score} difficulty={difficulty} />
                ) : (
                    <div className={classes.center}>
                        <div className={classes.panel}>
                            <div className={classes.time}>TIME: {second} s</div>
                            <div className={classes.score}>SCORE: {Score}</div>
                            <div className={`${classes.difficulty} ${classes[difficulty]}`}>LEVEL: {difficulty.toUpperCase()}</div>
                            <div className={classes.target}><span>{Target}</span></div>
                            <div className={classes.input}>入力: <span>{inputString}</span></div>
                            <div className={classes.message}>{message}</div>
                            <div className={classes.buttonArea}>
                                {setting.primes.slice(0, 3).map((p) => (
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
                                {setting.primes.slice(3, 6).map((p) => (
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
                            <div className={classes.buttonArea}>
                                {setting.primes.slice(6, 9).map((p) => (
                                    <button
                                        key={p}
                                        className={classes.primeButton}
                                        onClick={() => onPrime(p)}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                    </div>
                </div>
                )
            );
        default:
            return (
                isGameOver ? (
                    <SetDatabaseComponent score={Score} difficulty={difficulty} />
                ) : (
                    <div className={classes.center}>
                        <div className={classes.panel}>
                            <div className={classes.time}>TIME: {second} s</div>
                            <div className={classes.score}>SCORE: {Score}</div>
                            <div className={`${classes.difficulty} ${classes[difficulty]}`}>LEVEL: {difficulty.toUpperCase()}</div>
                            <div className={classes.target}><span>{Target}</span></div>
                            <div className={classes.input}>入力: <span>{inputString}</span></div>
                            <div className={classes.message}>{message}</div>
                            <div className={classes.buttonArea}>
                                {setting.primes.slice(0, 3).map((p) => (
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
                                {setting.primes.slice(3, 6).map((p) => (
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

}
function SetDatabaseComponent({ score, difficulty }: { score: number, difficulty: string }) {
    const [name, setName] = useState<string>("");
    const [isSaved, setIsSaved] = useState<boolean>(false);//二重送信防止用
    //Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // フォーム送信のデフォルト動作を防ぐ
            handleSave();
        }
    };
    const handleSave = async () => {
        if (isSaved) return;
        //名前が未設定の場合"のなめ"
        const finalName = name.trim() || "のなめ";
        try {
            await addDoc(collection(db, "RANKINGs"), {
                userName: finalName,
                userScore: score,
                userDifficulty: difficulty,
                createdAt: serverTimestamp(),
            });
            alert("ランキングに登録されました！");
            setIsSaved(true);
        }
        catch (error){
            console.error("保存失敗:", error);
            alert("保存失敗");
        }
    }
    if (isSaved){
        return (<PrimeGameResultComponent score={score} />);
    }
    return (
        <div className={classes.center}>
            <div className={classes.panel}>
                <h2 className={classes.title}>記録に挑戦！</h2>
                <div className={classes.resultScore}>SCORE: {score}</div>
                
                <div className={classes.inputArea}>
                    <input
                        type="text"
                        placeholder="なまえをいれてね"
                        className={classes.nameInput}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isSaved}
                        maxLength={10} // あまり長いとランキングが壊れるので制限
                        autoFocus
                    />
                    <button 
                        onClick={handleSave} 
                        disabled={isSaved}
                        className={classes.saveButton}
                    >
                        {isSaved ? "送信中..." : "ランキングに登録"}
                    </button>
                </div>
                {isSaved && <p className={classes.message}>データを送っているよ...</p>}
            </div>
        </div>
    );
}

function PrimeGameResultComponent({ score }: { score: number }) {
    const navigate = useNavigate();
    const handleRetry = () => {
        navigate("/PrimeGameTitle");
    }
    return (
        <div className={classes.center}>
            <div className={classes.panel}>
                <h2 className={classes.title}>ゲームエンド</h2>
                <div className={classes.resultScore}>YOUR SCORE: {score}</div>
                <button className={classes.resultButton} onClick={handleRetry}>
                    トップに戻る
                </button>
            </div>
        </div>
    );
}
