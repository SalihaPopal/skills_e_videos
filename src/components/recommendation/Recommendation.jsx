import styles from "./recommendation.module.css"
import Image from "next/image";

export default function Recommendation() {
  return (

      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src="/Youtube_logo.png"
            alt="Youtube_logo"
            className={styles.img}
            width={360}
            height={202}
            priority={true}
          />
        </div>
        <div className={styles.details}>

          <span className={styles.videoTitle}>video.title</span>



          <div className={styles.textContainer}>
            <h2 className={styles.channelName}>Skills-e-learning</h2>
            <div className={styles.info}>
              <div className={styles.views}>video.views</div>
              <div className={styles.date}>video.date</div>
            </div>
          </div>
        </div>
      </div>
  );
}
