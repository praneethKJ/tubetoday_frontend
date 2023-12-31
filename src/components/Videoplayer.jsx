import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const VideoPlayer = () => {
  const params = useParams();
  const [videoInfo, setVideoInfo] = useState(null);
  const [loader, setLoader] = useState(false);

  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await fetch(`https://cloudinaryprojectbackend.onrender.com/api/upload/${params.id}`);
      const { clickedData } = await response.json();
      console.log(clickedData);
      setVideoInfo(clickedData);
      setLoader(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while fetching video");
      setLoader(false);
    }


  };

  useEffect(() => {
    fetchData();
  }, []);
   const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return date.toLocaleString(undefined, options);
   }
  return (
    <div className="container-lg flex justify-center py-4">
      {loader && <Loader />}

      {videoInfo && (
        <div>
          <h1 className="font-bold text-xl pb-1">{videoInfo.title}</h1>
          <p className="text-ellipsis overflow-hidden max-w-[700px] pb-2">{videoInfo.description}</p>
          <video
            width="650"
            height="450"
            controls
            autoPlay
            // "muted" add this if want to play automatically but due to brower restriction in mute
            loop
            poster={videoInfo.imageUrl}
            preload="auto"
          >
            <source src={videoInfo.videoUrl} />
          </video>
          <p className="text-sm mt-2"><strong>Uploaded on: </strong>{formatDate(videoInfo.createdAt)}</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;