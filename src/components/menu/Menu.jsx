"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { darkTheme, lightTheme } from "@/utils/Theme";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./menu.module.css";

export default function Menu({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles.container} style={{ backgroundColor: theme.bg }}>

      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/Youtube_logo.png"
              alt="youtube-logo"
              className={styles.logoImg}
              width={40}
              height={30}
            />
            <span>Skills-e-learning</span>
          </Link>

          <Link href="/" className={styles.item}>
            <HomeIcon />
            Home
          </Link>

          <Link href="/explore" className={styles.item}>
            <ExploreIcon />
            Explore
          </Link>

          <Link href="/subscriptions" className={styles.item}>
            <SubscriptionsIcon />
            Subscriptions
          </Link>

          <hr className={styles.hr} />

          <Link href="/library" className={styles.item}>
            <VideoLibraryIcon />
            Library
          </Link>

          <Link href="/history" className={styles.item}>
            <HistoryIcon />
            History
          </Link>

          <hr className={styles.hr} />

          <div className={styles.loginContainer}>
            <div className={styles.login}>
              Sign in to add videos, comment and subscribe.
            </div>
            <Link href="/signin" className={styles.button}>
              <AccountCircleIcon />
              SIGN IN
            </Link>
          </div>

          <hr className={styles.hr} />

          <div className={styles.loginContainer}>
            <div className={styles.login}>
              Click the button to add your favorite video.
            </div>
            <button className={styles.button} variant="outlined" onClick={handleClickOpen}>
              <AddCircleIcon />
              ADD VIDEO
            </button>
          </div>

          <hr className={styles.hr} />

          <div className={styles.item} onClick={() => setDarkMode(!darkMode)}>
            <SettingsBrightnessIcon />
            {darkMode ? "Light Mode" : "Dark Mode"}
          </div>
        </div>
      </div>
    </div>
  );
}







