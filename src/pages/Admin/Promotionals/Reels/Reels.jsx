import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'; // (Optional) For progress updates

const Reels = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoUrl, setVideoUrl] = useState(null);

    const handleVideoSelect = (event) => {
        setSelectedVideo(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedVideo) return;

        const storage = getStorage();
        const storageRef = ref(storage, `videos/${selectedVideo.name}`); // Custom video path

        const uploadTask = uploadBytesResumable(storageRef, selectedVideo);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(Math.round(progress));
            },
            (error) => {
                console.error('Upload failed:', error);
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                setVideoUrl(downloadUrl);

                // (Optional) Store video URL in Firestore (replace with MongoDB logic)
                // const db = getFirestore(); // Assuming Firestore is initialized
                // const videosColRef = collection(db, 'videos');
                // await addDoc(videosColRef, { videoUrl });

                console.log('Video uploaded:', downloadUrl);
            }
        );
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleVideoSelect} />
            <button onClick={handleUpload} disabled={!selectedVideo}>
                Upload Video
            </button>
            {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
            {videoUrl && <video src={videoUrl} controls width="320" height="240" />}
        </div>
    );
};

export default Reels;
