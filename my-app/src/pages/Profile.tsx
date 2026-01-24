import classes from "./css/Profile.module.css";
import { useState, useEffect } from "react";

import { Accordion } from "./scripts/Accordion.tsx";

export default function Profile(){
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [activeImg, setActiveImg] = useState<string | null>(null);
    
    useEffect(() => {
        const imgs = import.meta.glob<{ default: string }>('./img/*.jpg', { eager: true });
        const imgsArray = Object.values(imgs).map(mod => mod.default);
        
        // ランダムに3つ選ぶ
        const shuffled = imgsArray.sort(() => Math.random() - 0.5);
        setSelectedImages(shuffled.slice(0, 3));
    }, []);
    
    const [img0, img1, img2] = selectedImages;
    return(<div className={classes.body}>
        <div className={classes.profileContainer}>
            <div className={classes.profText}>
                <div className={classes.thankYouMessage}>アクセスありがとうございます！:)✨</div>
                <div className={classes.textContainer}>
                    <div className={classes.profImgContainer}>
                        <img className={classes.profImg} src={img0} alt="profImg0" onClick={() => setActiveImg(img0)}/>
                        <img className={classes.profImg} src={img1} alt="profImg1" onClick={() => setActiveImg(img1)}/>
                        <img className={classes.profImg} src={img2} alt="profImg2" onClick={() => setActiveImg(img2)}/>
                    </div>
                    {activeImg && (
                        <div className={classes.overlay} onClick={() => setActiveImg(null)}>
                            <div className={classes.modalContent} onClick = {(e) => e.stopPropagation()}>
                                <button className={classes.closeButton} onClick={() => setActiveImg(null)}>
                                    ×閉じる
                                </button>
                                <img src={activeImg} alt="Enlarged" className={classes.zoomImg} />
                            </div>
                        </div>
                    )}
                    MyProfile<br/>
                    ニックネーム：はぎ<br/>
                    生年月日：2005年3月24日生<br/>
                    血液型：O型<br/>
                    サイズ：約164cm/約55kg<br/>
                    出身地：大阪府岸和田市<br/>
                    学歴：岡山大学工学部在学中(2026年1月現在)<br/>
                    専攻：C言語/アセンブリ言語/コンピュータアーキテクチャ<br/>
                    資格検定：普通自動二輪免許小型AT限定/実用数学技能検定準1級（2022年10月取得）/TOEIC 735点（2024年2月取得）<br/>
                    好きな食べ物：トマト🍅/グミ/チョコ🍫/コーヒー☕<br/>
                    嫌いな食べ物：無し<br/>
                    趣味：
                    <Accordion>
                        釣り🎣/キャンプ⛺/バイク🏍/ラーメン🍜/旅行👜/
                        ずとまよ/音ゲ/コミケに行くこと/
                        ウマ娘/アニメ
                    </Accordion><br/>
                    Link：
                </div>
                ※このサイトは，AI(GitHub Copilot)を用いてデザインしています．
            </div>

        </div>
        
    </div>);
}