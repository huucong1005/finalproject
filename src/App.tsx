import './App.css'
import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { Provider } from 'react-redux';

import { Login } from './component/login/login'
import { HomePage } from './component/homepage/homepage';
import { store } from './redux/store';
import SignUp from './component/login/signUp';
import { Category } from './component/homepage/category';
import { Test } from './component/homepage/test';
import { Result } from './component/homepage/result';
import HomeHistoryPoint from './component/homepage/historyPoint';
import AdminCateList from './component/admin/adminCate';
import AdminCateAdd from './component/admin/adminCateAdd';
import AdminCateEdit from './component/admin/adminCateEdit';
import AdminTestList from './component/admin/adminTest';
import AdminTestEdit from './component/admin/adminTestEdit';
import AdminTestAdd from './component/admin/adminTestAdd';
import AdminTestDetail from './component/admin/adminTestDetail';
import { AboutUs } from './component/homepage/aboutUs';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/sign-up",
      element: <SignUp/>,
    },
    {
      path: "/homepage",
      element: <HomePage/>,
    },
    {
      path: "/category",
      element: <Category/>,
    },
    {
      path: "/test",
      element: <Test/>,
    },
    {
      path: "/result",
      element: <Result/>,
    },
    {
      path: "/history",
      element: <HomeHistoryPoint/>,
    },
    {
      path: "/about-us",
      element: <AboutUs/>,
    },



/////////////////////////

    {
      path: "/admin-cate",
      element: <AdminCateList/>,
    },
    {
      path: "/admin-cate-add",
      element: <AdminCateAdd/>,
    },
    {
      path: "/admin-cate-edit",
      element: <AdminCateEdit/>,
    },
    {
      path: "/admin-test",
      element: <AdminTestList/>,
    },
    {
      path: "/admin-test-add",
      element: <AdminTestAdd/>,
    },
    {
      path: "/admin-test-edit",
      element: <AdminTestEdit/>,
    },
    {
      path: "/admin-test-detail",
      element: <AdminTestDetail/>,
    },
  ])
 

  return (
    <div className="App">
      <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      </React.StrictMode>
    </div>
  )
}

export default App
