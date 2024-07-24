import styles from "./navbar.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";

export default function Navbar({setShowSignIn}) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.searchContainer}>
          <input className={styles.input} placeholder="Search"/>
          <SearchIcon />
        </div>
        <Link Link href="/signin">
        <button className={styles.button}>
          <AddCircleIcon />
          ADD VIDEO
        </button>
        </Link>

        <Link Link href="/signin">
        <button className={styles.button}>
          <AccountCircleIcon />
          SIGN IN
        </button>
        </Link>
      </div>
    </div>
  );
}
