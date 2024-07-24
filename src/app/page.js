"use client"
import { useState } from "react";
import Menu from "@/components/menu/Menu";
import Navbar from "@/components/navbar/Navbar";
import styles from "./page.module.css";;
import HomePage from "../pages/HomePage";
import { darkTheme, lightTheme } from "@/utils/Theme";
import { ThemeProvider, createTheme } from "@mui/system";


export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme(darkMode ? darkTheme : lightTheme);

  return (
    <ThemeProvider theme={theme}>
    <div
    className={styles.container}
    style={{
      "--bg-color": theme.bg,
      "--bg-lighter": theme.bgLighter,
      "--text-color": theme.text,
      "--text-soft-color": theme.textSoft,
      "--hr-color": theme.hrSoft,
    }}
  >
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={styles.main}>
        <Navbar />
        <div className={styles.wrapper}>
          <HomePage />
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}
