import React,{useState,useRef,useEffect} from 'react'
import './login.css'
import {Link} from 'react-router-dom'
import {userRegister,userLogin} from '../../axios'
import {useDispatch,useSelector} from 'react-redux';
import{setUser} from '../../store/user-slice';
import {useNavigate} from 'react-router-dom';

const LoginSign = ({location}) => {
  const history = useNavigate();
    const dispatch = useDispatch();
    const registerTab = useRef(null);
    const loginTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginemail,setloginemail] = useState('');
    const [name,setsignname] = useState('');
    const [loginpassword,setloginpassword] = useState();
    const [password, setsignpass] = useState('')
    const [email, setsignemail] = useState('')
    const [avatar, setavatar] = useState("https://www.comingsoon.net/assets/uploads/2021/08/pokemon-legends-arceus.png")
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    

    const tabs = (e,tab) => {
          if(tab === 'login'){
               switcherTab.current.classList.add('shiftToNeutral');
               switcherTab.current.classList.remove('shiftToRight')
               
               registerTab.current.classList.remove("shiftToNeutralForm");
               loginTab.current.classList.remove("shiftToLeft");
             
          }

          if(tab === 'register'){
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutral')
            
           
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
          }
    }


    const registerDataChange = (e) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
           
            setavatar(reader.result);
          }
        };
  
        reader.readAsDataURL(e.target.files[0]);
    
    };

    
    const logins = async (e) => {
        e.preventDefault();
        const {data} = await userLogin({loginemail,loginpassword});
        alert(data.success)
        dispatch(setUser(data))
     }

     const registerS = async (e) => {
      e.preventDefault();
         const {data} = await userRegister({name,email,password,avatar});
         if(data.success){
              alert('success')
         }else{
           alert('false')
         }
     }
   
    
    return (
        <>
            <div className='logincontainer'>
             <div className='loginsignupbox'>
             <div>
                 <div className='login_signup_toggle'>
                    <p onClick={(e) => tabs(e,'login')}>Login</p>
                    <p onClick={(e) => tabs(e,'register')}>REgister</p>
                 </div>
                 <button ref={switcherTab}></button>
                 </div>
            <form className='loginform' ref={loginTab} onSubmit={logins}>
              <div>
                <input type='email' placeholder='email' value={loginemail} onChange={e => setloginemail(e.target.value)}/>
                <input type='password' placeholder='Password' onChange={e => setloginpassword(e.target.value)}/>
                <Link to='/password/fotgot'>forgot password ?</Link>
                <input type='submit' className='loginbtn' value='Login'/>
                </div> 
            </form>

            <form className='signupform' ref={registerTab} onSubmit={registerS}>
              <div>
                <input type='email' placeholder='email' value={email} onChange={e => setsignemail(e.target.value)}/>
                <input type='text' placeholder='Name' value={name} onChange={e => setsignname(e.target.value)}/>
                <input type='password' placeholder='Password' onChange={e => setsignpass(e.target.value)}/>

                <div id="registerImage">
                  <img src={avatar} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
              
                <input type='submit' className='loginbtn' value='Register'/>
                </div> 
            </form>
            </div>
            </div>
        </>
    )
}

export default LoginSign
