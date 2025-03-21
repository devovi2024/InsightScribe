import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AllPosts from "../components/AllPosts";
import CreatePost from "../components/CreatePost";
import UpdateDeletePost from "../components/UpdateDeletePost";
import Category from "../components/Category";
import SubCategory from "../components/SubCategory";
import Statistics from "../components/Statistics";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("all");

  return (
    <div className="flex h-screen">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="w-3/4 p-5">
        {activeComponent === "statistics" && <Statistics/>}
        {activeComponent === "category" && <Category />}
        {activeComponent === "subcategory" && <SubCategory/>}
        {activeComponent === "all" && <AllPosts />}
        {activeComponent === "create" && <CreatePost />}
        {activeComponent === "update" && <UpdateDeletePost />}
      </div>
    </div>
  );
};

export default Dashboard;
