import classes from "./css/Profile.module.css";
import profileImg1 from "./img/profile1.jpg";
import profileImg2 from "./img/profile2.jpeg";
import profileImg3 from "./img/profile3.jpg";
import { Accordion } from "./scripts/Accordion.tsx";

export default function Profile(){
    return(<div className={classes.body}>
        <div className={classes.profileContainer}>
            <div className={classes.profImgContainer}>
                <img className={classes.profImg} src={profileImg1} alt="profImg1" />
                <img className={classes.profImg} src={profileImg2} alt="profImg2" />
                <img className={classes.profImg} src={profileImg3} alt="profImg3" />
            </div>
            <div className={classes.profText}>
                <div className={classes.textContainer}>
                    MyProfile:<br/>
                    ニックネーム：はぎ<br/>
                    生年月日：2005年3月24日生<br/>
                    血液型：O型<br/>
                    出身地：大阪府岸和田市<br/>
                    学歴：岡山大学工学部所属<br/>
                    サイズ：<br/>
                    資格検定：普通自動二輪免許小型AT限定/実用数学技能検定準1級（2022年10月取得）/TOEIC 735点（2024年2月取得）<br/>
                    好きな食べ物：トマト🍅/グミ/チョコ/コーヒー☕<br/>
                    嫌いな食べ物：無し<br/>
                    趣味：
                    <Accordion>
                        釣り🎣/キャンプ⛺/バイク🏍/ラーメン🍜/旅行👜/ずとまよ/音ゲー/コミケに行くこと
                    </Accordion><br/>
                    Link：
                </div>
            </div>

        </div>
        
    </div>);
}