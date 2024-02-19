import React, { useState } from 'react';
import useData from '../hooks/useData';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react'

export default function Signin() {
  const [logUName, setLogUName] = useState();
  const [logPwd, setLogPwd] = useState();
  const navigate = useNavigate();
  const { setLoginUser, setLogin } = useData();
  const url = 'http://localhost:5000/signin';

  function login() {
    console.clear();

    const person = {
      userName: logUName,
      pwd: logPwd,
    };

    axios
      .post(url, person)
      .then((res) => {
        if (res.data) {
          setLoginUser(res.data.userName);
          setLogin(true);

          // Check user role and redirect accordingly
          if (res.data.userRole === 'Administrator') {
            navigate('/admin/home');
          } else if (res.data.userRole === 'Costumer') {
            navigate('/users/account');
          } else {
            // Handle other roles if needed
          }
        } else {
          alert('Invalid Email OR Password');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </a>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {setLogUName(e.target.value);}}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {setLogPwd(e.target.value);}}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  onClick={login}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}




// <div className='container mt-5'>
//   <div className='border border-2 p-3 d-flex flex-column'>
//     <h1 className='text-center'>Sign In</h1>

//     <input
//       className='d-block m-auto mt-3 mx-5'
//       type='text'
//       placeholder='Write Unique UserName'
//       onChange={(e) => {
//         setLogUName(e.target.value);
//       }}
//     />
//     <input
//       className='d-block m-auto mt-3 mx-5'
//       type='password'
//       placeholder='Password'
//       onChange={(e) => {
//         setLogPwd(e.target.value);
//       }}
//     />

//     <button className='btn btn-primary d-block mt-3 mx-5' onClick={login}>
//       Login
//     </button>

//     <span className='d-block text-center mt-3'>
//       {' '}
//       <Link to={'/signup'}>don't have an account ?</Link>{' '}
//     </span>
//   </div>
// </div>