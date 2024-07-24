import Image from "next/image"
import styles from "./comment.module.css"

export default function Comment() {
  return (
    <div className={styles.container}>
      <Image className={styles.channelImg} src="/channelImg.jpg" alt="channel-img" width={50} height={50}/>
      <div className={styles.commentDetail}>
        <div className={styles.name}>name &nbsp;<span className={styles.date} >date</span></div>
        
      
        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nisi vitae ea, eius neque amet nulla. Quasi officiis recusandae dolorem sequi corporis eligendi velit rerum dolor, perspiciatis vero tempora totam!</p>
        </div>  
    </div>
  )
}
