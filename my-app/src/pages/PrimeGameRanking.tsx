import { useState, useEffect } from "react";
import { db } from "./scripts/firebase.ts";
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from "firebase/firestore"; // whereを追加
import classes from "./css/PrimeGame.module.css";
import { useNavigate } from "react-router-dom";

type RankingData = {
    userName: string;
    userScore: number;
    userDifficulty: string;
    createdAt?: Timestamp;
};

export default function RankingPage() {
    const [rankings, setRankings] = useState<RankingData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // 現在表示している難易度を管理（初期値はnormal）
    const [viewDifficulty, setViewDifficulty] = useState<string>("normal");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRankings = async () => {
            setIsLoading(true); // 切り替え時もロード表示にする
            try {
                const q = query(
                    collection(db, "RANKINGs"),
                    where("userDifficulty", "==", viewDifficulty), // 難易度で絞り込み
                    orderBy("userScore", "desc"),
                    limit(10)
                );
                const querySnapshot = await getDocs(q);
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
                    {["easy", "normal", "hard"].map((level) => (
                        <button
                            key={level}
                            onClick={() => setViewDifficulty(level)}
                            className={`${classes.tabButton} ${viewDifficulty === level ? classes.activeTab : ""}`}
                        >
                            {level.toUpperCase()}
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