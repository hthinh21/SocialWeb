import React, { useEffect, useState } from "react";
import setting from '../../assets/setting.png';
import activity_1 from '../../assets/activity_1.png';
import activity_2 from '../../assets/activity_2.png';
import bookmark_1 from '../../assets/bookmark_1.png';
import bookmark_2 from '../../assets/bookmark_2.png';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' Tr'; // Ví dụ: 1200000 -> 1.2 Tr
  } else if (num >= 10000) {
    return Math.floor(num / 1000) + ' N'; // Ví dụ: 11000 -> 11 N
  } else {
    return num.toLocaleString(); // Hiển thị số bình thường cho các giá trị nhỏ hơn 10,000
  }
};

const UserAccount = () => {
  // const { posts } = PostData();
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [activeSection, setActiveSection] = useState('posts');
  // const [visiblePosts, setVisiblePosts] = useState(12); // Khởi tạo với 12 bài viết
  const [loading, setLoading] = useState(true); 
  // const [loadedAll, setLoadedAll] = useState(false); // Trạng thái kiểm tra đã tải hết hay chưa
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const [isChangeAvatarModalOpen, setIsChangeAvatarModalOpen] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const enqueueSnackbar = useSnackbar();
  const userId = Cookies.get("userId");
  const params = useParams();
  const navigate = useNavigate();

  async function fetchUser() {
    try {
      const { data } = await axios.get(`http://localhost:1324/users/${params.id}`);

      setUser(data);
      setUsername(data.username);
      setDescription(data.description);
      setAvatar(data.avatar);
      setName(data.name);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  console.log(user);

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  const [followed, setFollowed] = useState(false);

  // const { followUser } = UserData();

  // const followHandler = () => {
  //   setFollowed(!followed);
  //   followUser(user._id, fetchUser);
  // };

  const followHandler = async () => {
    try {
      const response = await axios.post(`http://localhost:1324/users/follow/${params.id}`, 
        {loggedInUserId: userId},
        { withCredentials: true } // gửi với token
      );
      setFollowed(!followed);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const followers = user.followers;

  useEffect(() => {
    if (followers && followers.includes(userId)) setFollowed(true);
    if (params.id === userId) {
      navigate('/home');
    }
  }, [user]);

  async function followData() {
    try {
      const { data } = await axios.get(`http://localhost:1324/users/followdata/${params.id}`,
      {withCredentials: true}
      );
      setFollowersData(data.followers.length);
      setFollowingsData(data.followings.length);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    followData();
  }, [user]);

  return (
    
      <div className="container mx-auto p-5 bg-black" >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:items-start">
        {/* Profile Information */}
        <div className="w-full lg:w-[500px] h-[300px] relative flex justify-center items-center">
          <div className="w-[200px] h-[200px]">
            <img className="w-full h-full rounded-full object-cover" src={`data:image/jpeg;base64,${avatar}`}  alt="profile" onClick={() => setIsChangeAvatarModalOpen(true)} />
          </div>
        </div>

        {/* Profile Details */}
        <div className="w-full lg:w-[1080px] flex flex-col items-center lg:items-start gap-5 mt-5 lg:mt-0">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start gap-5">
            <div className="text-white text-3xl font-semibold items-center flex h-full" style={{ lineHeight: '54px' }}>{username}</div> 
            {user._id !== userId && (            
              <button
                onClick={followHandler}
                className={`py-2 px-5 text-white rounded-md ${
                  followed ? "bg-red-500" : "bg-blue-400"
                }`}
              >
                {followed ? "UnFollow" : "Follow"}
              </button>
            )}                    
          </div>
          

          {/* Stats */}
          <div className="flex gap-5 text-center lg:text-left">
            <div className="flex flex-row items-center cursor-pointer">
              <span className="text-white text-2xl">{formatNumber(user.posts ? user.posts.length : 0)} bài viết</span>
            </div>
            <div className="flex flex-row items-center cursor-pointer">
              <span className="text-white text-2xl">{formatNumber(followersData)} người theo dõi</span>
            </div>
            <div className="flex flex-row items-center cursor-pointer">
              <span className="text-white text-2xl" >Đang theo dõi {formatNumber(followingsData)} người dùng</span>
            </div>
          </div>

          {/* Modals */}
          {/* <FollowersModal
            isOpen={isFollowersModalOpen}
            onClose={() => setIsFollowersModalOpen(false)}
            followers={user.followersList}
          /> */}
          {/* <FollowingModal
            isOpen={isFollowingModalOpen}
            onClose={() => setIsFollowingModalOpen(false)}
            followings={user.followingsList}

          {/* User Bio */}
          <div className="text-center lg:text-left" style={{ fontSize: '20px' }}>
            <div className="text-white font-semibold text-[24px]">{name}</div>
            <div className="text-white text-[24px]">{description}</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-1 bg-gray-700 my-5"></div>

      {/* Tab Section */}
      <div className="flex flex-col gap-5 mb-5">
        <div className="justify-center items-center gap-[59px] inline-flex">
          <div 
            className={`justify-center items-center gap-1 flex cursor-pointer ${activeSection === 'posts' ? 'text-white' : 'text-[#949696]'}`}
            onClick={() => {
              setActiveSection('posts');
              // setVisiblePosts(12); // Reset số bài viết khi chuyển tab
              // setLoadedAll(false); // Reset trạng thái đã tải hết
            }}
          >
            <img src={activeSection === 'posts' ? activity_1 : activity_2} alt="Post icon" className="w-5 h-5 mr-1" style={{ width: '30px', height: '30px' }} />
            <div className="text-[20px] font-semibold">BÀI VIẾT</div>
          </div>
          <div 
            className={`justify-center items-center gap-1 flex cursor-pointer ${activeSection === 'bookmarks' ? 'text-white' : 'text-[#949696]'}`}
            onClick={() => {
              setActiveSection('bookmarks');
              // setVisiblePosts(12); // Reset số bài đã lưu khi chuyển tab
              // setLoadedAll(false); // Reset trạng thái đã tải hết
            }}
          >
            <img src={activeSection === 'bookmarks' ? bookmark_2 : bookmark_1} alt="Bookmark icon" className="w-5 h-5 mr-1" style={{ width: '30px', height: '30px' }} />
            <div className="text-[20px] font-semibold">ĐÃ LƯU</div>
          </div>
        </div>

        </div>

        
      </div>
  );
};



export default UserAccount;