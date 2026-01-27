//ベースはgeminiで生成
//一部人力

import { useState, useEffect } from "react";
import { db } from "./scripts/firebase.ts";
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from "firebase/firestore"; // whereを追加
import classes from "./css/PrimeGame.module.css";
import { useNavigate } from "react-router-dom";

//データベースのラベル
type RankingData = {
    userName: string;
    userScore: number;
    userDifficulty: string;
    createdAt?: Timestamp;
};

export default function RankingPage() {
    //ランキングデータ
    const [rankings, setRankings] = useState<RankingData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // 現在表示している難易度を管理（初期値はnormal）
    const [viewDifficulty, setViewDifficulty] = useState<string>("normal");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRankings = async () => {
            setIsLoading(true); //切り替え時もロード表示にする
            try {
                //データベースから取り出す条件
                const q = query(
                    collection(db, "RANKINGs"),
                    where("userDifficulty", "==", viewDifficulty), //難易度で絞り込み
                    orderBy("userScore", "desc"), //スコア降順
                    limit(10) //上から10個
                );
                //取得
                const querySnapshot = await getDocs(q);
                //データベースからドキュメントリスト(docs)形式で取り出す⇒data()で配列形式に
                //as RankingDataで，メンバ名とDBのフィールド名が一致するものを自動的に代入
                const data = querySnapshot.docs.map(doc => doc.data() as RankingData);
                setRankings(data);
            } catch (error) {
                console.error("ランキング取得失敗:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRankings();
    }, [viewDifficulty]); // viewDifficultyが変化するたびに実行！

    return (
        <div className={classes.center}>
            <div className={classes.panel}>
                <h2 className={classes.title}>RANKING TOP 10</h2>

                {/* --- 難易度切り替えタブ --- */}
                <div className={classes.tabArea}>
                    {["easy", "normal", "hard"].map((difficulty) => (
                        <button
                            key={difficulty}
                            onClick={() => setViewDifficulty(difficulty)}
                            className={`${classes.tabButton} ${viewDifficulty === difficulty ? classes.activeTab : ""}`}
                        >
                            {difficulty.toUpperCase()}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <p className={classes.message}>ロード中...</p>
                ) : (
                    <div className={classes.rankingList}>
                        {rankings.length > 0 ? (
                            rankings.map((item, index) => (
                                <div key={index} className={classes.rankingItem}>
                                    <div className={classes.rankInfo}> {/* 左側：順位と名前 */}
                                        <span className={classes.rank}>{index + 1}位</span>
                                        <span className={classes.rankName}>{item.userName}</span>
                                    </div>
                                    
                                    <div className={classes.scoreInfo}> {/* 右側：スコアと日付 */}
                                        <span className={classes.rankScore}>{item.userScore}点</span>
                                        {item.createdAt && (
                                            <span className={classes.rankDate}>
                                                {item.createdAt.toDate().toLocaleDateString('ja-JP', {
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={classes.message}>まだデータがありません</p>
                        )}
                    </div>
                )}

                <button className={classes.resultButton} onClick={() => navigate("/PrimeGameTitle")}>
                    タイトルへ戻る
                </button>
            </div>
        </div>
    );
}