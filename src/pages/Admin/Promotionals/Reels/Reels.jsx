import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'; // (Optional) For progress updates
import ReelProgress from '../../../../components/Progress/ReelProgress';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import AddReelsModal from '../../../../components/Modal/AddReelsModal/AddReelsModal';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';

const Reels = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoUrl, setVideoUrl] = useState(null);
    const axioseSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();
    const { refetch, data: data = [], isLoading, error } = useQuery({
        queryKey: ['story', branchID],
        queryFn: async () => {
            const res = await axioseSecure.get(`/admin/restaurant/${res_id}/branch/${branchID}/all-reels`);
            // console.log(res.data[0].videoFile);
            return res?.data;
            // return [
            //     {
            //         _id: "234783bfd",
            //         img: "https://plus.unsplash.com/premium_photo-1669312747277-b1acd3eb2f98?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://images.unsplash.com/photo-1711216818794-cd4f226dc88d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://images.unsplash.com/photo-1707344088547-3cf7cea5ca49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D",
            //     },
            //     {
            //         _id: "234783bfc",
            //         img: "https://images.unsplash.com/photo-1711926641543-a37d9a020571?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D",
            //     },
            // ]
        },

    });

    const handleVideoSelect = (event) => {
        setSelectedVideo(event.target.files[0]);
        console.log(selectedVideo);
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
            <div className='flex mb-5'>

                <div className='w-full flex-1'>
                    <SetTitle title="Reels" />
                    <SectionTitle h1="Reels" />

                </div>
                {/* Create Story Modal  */}
                {/* <AddStoryModal /> */}
                <AddReelsModal refetch={refetch} />
            </div>
            {/* <input type="file" accept="video/*" onChange={handleVideoSelect} />
            <button onClick={handleUpload} disabled={!selectedVideo}>
                Upload Video
            </button> */}
            {/* {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>} */}
            {/* {(uploadProgress > 0 && uploadProgress !== 100) && <ReelProgress value={uploadProgress} />} */}
            {/* {videoUrl && <video src={videoUrl} controls width="320" height="240" />} */}
            <div className='flex flex-wrap gap-5'>
                {
                    data && Array.isArray(data) && data.map(reelURL => <video key={reelURL._id} src={reelURL.videoFile} controls width="320" height="240" />)

                }
            </div>
        </div>
    );
};

export default Reels;
