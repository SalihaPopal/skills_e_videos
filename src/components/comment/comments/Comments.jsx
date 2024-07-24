import Image from "next/image"
import styles from "./comments.module.css"
import Comment from "../comment/Comment"

export default function Comments() {
  return (
    <div  className={styles.container}>
      <div className={styles.newComment}>
        <Image className={styles.channelImg} src="/channelImg.jpg" alt="channel-img" width={50} height={50}/>
        <input className={styles.input} placeholder="Add a comment..." name="newComment" id="newComment" type="newComment" />
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
}
