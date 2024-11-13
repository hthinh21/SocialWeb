import{ useState } from 'react';
import Spinner from '../components/Spiner';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

   
    const handleLogin = () => {
        setLoading(true);
        axios
          .post('http://localhost:1324/login', { username, password }, { withCredentials: true }) 
          .then((response) => {
            const { userId, token } = response.data; 
            console.log("User ID:", userId);
            console.log("Token:", token);
    
            // Ghi cookie
            Cookies.set('token', token, { expires: 1 / 24, secure: true, sameSite: 'Strict' });
            Cookies.set('userId', userId, { expires: 1 / 24, secure: true, sameSite: 'Strict' });      

            enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
            navigate('/home');
          })
          .catch((error) => {
            enqueueSnackbar(error.response?.data?.message || 'Đăng nhập thất bại', { variant: 'error' });
          })
          .finally(() => {
            setLoading(false);
          });
    };

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4 text-center'>Login</h1>
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Username</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleLogin}>
                    Đăng nhập
                </button>
                <Link to={`/register`} className='flex justify-center'>
                    <button className='rounded-md bg-teal-300 p-2 m-2'>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
