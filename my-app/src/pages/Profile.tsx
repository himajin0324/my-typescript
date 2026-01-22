import classes from "./css/Profile.module.css";
import profileImg1 from "./img/profile (0).jpeg";
import profileImg2 from "./img/profile (1).jpg";
import profileImg3 from "./img/profile (2).jpg";
import profileImg4 from "./img/profile (3).jpg";
import profileImg5 from "./img/profile (4).jpg";
import profileImg6 from "./img/profile (5).jpg";
import profileImg7 from "./img/profile (6).jpg";
import profileImg8 from "./img/profile (7).jpg";
import profileImg9 from "./img/profile (8).jpg";
import profileImg10 from "./img/profile (9).jpg";
import { Accordion } from "./scripts/Accordion.tsx";

export default function Profile(){
    return(<div className={classes.body}>
        <div className={classes.profileContainer}>
            <div className={classes.profText}>
                <div className={classes.thankYouMessage}>アクセスありがとうございます！:)✨</div>
                <div className={classes.textContainer}>
                    たくさんの趣味たち⇒
                    <Accordion>
                    <div className={classes.profImgContainer}>
                        <img className={classes.profImg} src={profileImg1} alt="profImg1" />
                        <img className={classes.profImg} src={profileImg2} alt="profImg2" />
                        <img className={classes.profImg} src={profileImg3} alt="profImg3" />
                        <img className={classes.profImg} src={profileImg4} alt="profImg4" />
                        <img className={classes.profImg} src={profileImg5} alt="profImg5" />
                        <img className={classes.profImg} src={profileImg6} alt="profImg6" />
                        <img className={classes.profImg} src={profileImg7} alt="profImg7" />
                        <img className={classes.profImg} src={profileImg8} alt="profImg8" />
                        <img className={classes.profImg} src={profileImg9} alt="profImg9" />
                        <img className={classes.profImg} src={profileImg10} alt="profImg10" />
                    </div>
                    </Accordion><br/>
                    MyProfile:<br/>
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