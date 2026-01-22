import { Link } from "react-router-dom";
import classes from "./css/FooterMenu.module.css";

export default function FooterMenu(){
    return(<div>
        <div className={classes.title}>Variousなサイト</div>
        <nav>
            <ul className={classes.menu}>
                <li className={classes.menuList}><Link to="/Profile" className={classes.menuLink}>Home</Link></li>
                <li className={classes.menuList}><Link to="/TodayPrime" className={classes.menuLink}>今日の素数</Link></li>
                <li className={classes.menuList}><Link to="/GetPrimeForm" className={classes.menuLink}>素数チェッカー</Link></li>
                <li className={classes.menuList}><Link to="/PrimeGameTitle" className={classes.menuLink}>PrimeGame</Link></li>
            </ul>
        </nav>
    </div>);
}