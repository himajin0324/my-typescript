//素因数分解ゲームタイトル画面
import { useNavigate } from "react-router-dom"; //ページ遷移をプログラム的に行う関数を返す
import classes from "./css/PrimeGameTitle.module.css";

export default function PrimeGameTitle(){
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>素因数分解ゲーム</h1>
            <button className={classes.button} onClick={() => navigate("/PrimeGame")}>ゲームスタート</button>
        </div>
    );
}