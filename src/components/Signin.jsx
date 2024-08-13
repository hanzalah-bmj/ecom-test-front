import React, { useState } from 'react';
import useData from '../hooks/useData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';

export default function Signin() {
  const [logUName, setLogUName] = useState('');
  const [logPwd, setLogPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoginUser, setLogin } = useData();
  const url = 'http://localhost:5000/user';

  function login() {
    setLoading(true);

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
          } else if (res.data.userRole === 'Customer') {
            navigate('/users/');
          } else {
            // Handle other roles if needed
          }
        } else {
          alert('Invalid Email OR Password');
        }
      })
      .catch((err) => {
        console.error('Error during login:', err);

        // Log the error details to the console
        console.error('Error response:', err.response);

        // Show a more specific error message based on the response status
        if (err.response && err.response.status === 401) {
          alert('Invalid Email OR Password');
        } else {
          alert('An error occurred during login. Please try again.');
        }
      })
      .finally(() => {
        setLoading(false);
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
          </p>
          <form
            action="#"
            method="POST"
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    value={logUName}
                    onChange={(e) => setLogUName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    value={logPwd}
                    onChange={(e) => setLogPwd(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Get started'} <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
