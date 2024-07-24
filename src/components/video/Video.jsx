import styles from "./video.module.css";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Image from "next/image";
import Comments from "@/components/comment/comments/Comments";
import Recommendation from "@/components/recommendation/Recommendation";


export default function VideoPage({id}) {
  
  return (

    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.videoWrapper}>
          <iframe 
            style={{
              width: "100%",
              height: "520px",
              border: "none",
            }}
            title="Youtube video player"
            src={`https://www.youtube.com/embed/{id}`}

            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <div className={styles.title}>
          <h1>title</h1>
        </div>
        <div className={styles.details}>
          <div className={styles.info}>5 views. 13/July/2024 </div>
          <div className={styles.buttons}>
            <button className={styles.btn}>
              <ThumbUpOffAltOutlinedIcon />
              &nbsp; 5
            </button>
            <button className={styles.btn}>
              <ThumbDownOffAltOutlinedIcon background-color="var(--bg-color)" />
              &nbsp; 0
            </button>
            <button className={styles.btn}>
              <ShareOutlinedIcon />
              &nbsp;Share
            </button>
            <button className={styles.btn}>
              <AddTaskOutlinedIcon />
              &nbsp;Save
            </button>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.channel}>
          <div className={styles.channelInfo}>
            <Image
              className={styles.channelImg}
              src="/channelImg.jpg"
              width={50}
              height={50}
              alt="channel-img"
            />

            <div className={styles.channelDetail}>
              <span className={styles.channelName}>Skills-e-learning</span>
              <span className={styles.channelSubscribe}>Subscribers: 34</span>
              <p className={styles.description}>
                You can add your favorite videos to help us learn new skills
              </p>
            </div>
          </div>
          <button className={styles.subscriptionBtn}>Subscribe</button>
        </div>
        <hr className={styles.hr} />
        <Comments />
      </div>
      <div className={styles.recommendation}>
        
        <Recommendation />
        <Recommendation />
        <Recommendation />
        <Recommendation />
    
      </div>
    </div>
  );
}
