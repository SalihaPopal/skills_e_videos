// "use client";
// import Image from "next/image";
// import styles from "./card.module.css";
// import { Link } from "react-router-dom";

// export default function Card() {
//   return (
//     <Link to="/video/test">
//       <div className={styles.container}>
//         <div className={styles.imgContainer}>
//           <Image
//             src="/Youtube_logo.png"
//             alt="Youtube_logo"
//             className={styles.img}
//             width={360}
//             height={202}
//             priority={true}
//           />
//         </div>
//         <div className={styles.videoTitle}>
//           <h1>video.title</h1>
//         </div>

//         <div className={styles.details}>
//           <div className={styles.channelImgContainer}>
//             <Image
//               src="/channelImg.jpg"
//               alt=""
//               className={styles.channelImg}
//               width={36}
//               height={36}
//             />
//           </div>
//           <div className={styles.textContainer}>
//             <h2 className={styles.channelName}>Skills-e-learning</h2>
//             <div className={styles.info}>
//               <div className={styles.views}>video.views</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }



"use client";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

export default function Card() {
  return (
    <Link href="/video/test" passHref className={styles.container}>
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
        <div className={styles.videoTitle}>
          <h1>video.title</h1>
        </div>
        <div className={styles.details}>
          <div className={styles.channelImgContainer}>
            <Image
              src="/channelImg.jpg"
              alt=""
              className={styles.channelImg}
              width={36}
              height={36}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.channelName}>Skills-e-learning</h2>
            <div className={styles.info}>
              <div className={styles.views}>video.views</div>
            </div>
          </div>
        </div>
    </Link>
  );
}
