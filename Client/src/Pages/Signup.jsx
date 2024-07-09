import React from 'react'
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserCredential } from '../Store/Slice/AuthSlice';
import { signup } from '../API/userApi';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitData = async (e) => {
    e.preventDefault();
    if (!data.name.trim().length) {
      toast.error('Enter name!');
      return;
    } else if (!data.email.trim().length) {
      toast.error('Enter email!');
      return;
    } else if (!data.password.trim().length) {
      toast.error('Enter password!');
      return;
    }

    try {
      let res = await signup(data);
      console.log(res)
      if (res?.data?.success) {
        toast.success('Registered successfully!');
        dispatch(setUserCredential(res.data.token))
        navigate('/');
      } else {
        toast.error(res.response.data.message)
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }

  return (
    <div className="flex flex-col h-screen  bg-cover bg-center bg-gray-200 justify-center items-center" style={{ backgroundImage: `url('/sky.jpg')` }}>
      <div
        className="w-full max-w-sm
        px-6 py-10 sm:px-10 sm:py-6 
        bg-white rounded shadow-md lg:shadow-lg"
      >
        <h2 className="text-center font-semibold text-3xl lg:text-4xl text-[#27649e]">
          Signup
        </h2>
        <label
          htmlFor="email"
          className="block mt-8 text-xs font-semibold text-gray-600"
        >
          Name
        </label>
        <input
          onChange={(e) => setData({ ...data, name: e.target.value })}
          autoComplete="email"
          className="block w-full py-1 px-1 text-sm
                text-gray-800 appearance-none 
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
          required=""
        />
        <label
          htmlFor="email"
          className="block mt-6 text-xs font-semibold text-gray-600"
        >
          E-mail
        </label>
        <input
          onChange={(e) => setData({ ...data, email: e.target.value })}
          autoComplete="email"
          className="block w-full py-1 px-1 text-sm 
                text-gray-800 appearance-none 
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
          required=""
        />
        <label
          htmlFor="password"
          className="block mt-6 text-xs font-semibold text-gray-600"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          autoComplete="current-password"
          className="block w-full py-1 px-1 mb-4 text-sm
                text-gray-800 appearance-none 
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
          required=""
        />
        <button
          onClick={submitData}
          className="w-full py-3 mt-10 bg-[#27649e] rounded-sm
                font-medium text-white uppercase
                focus:outline-none hover:bg-[#25557f] hover:shadow-lg"
        >
          Signup
        </button>
        <div className="sm:flex sm:flex-wrap mt-5 sm:mb-4 text-sm text-center">
          <a onClick={() => navigate('/login')} className="flex-2 text-gray-700 cursor-pointer">
            Already an user?
          </a>
        </div>
      </div>
    </div>
  )
}

export default Signup
