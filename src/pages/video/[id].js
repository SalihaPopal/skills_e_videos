import VideoPage from '@/components/video/Video';
import { useRouter } from 'next/router';


export default function Video() {
 const router = useRouter();
 const { id } = router.query;


 return (
   <div>
     <VideoPage id={id} />
   </div>
 );
}
