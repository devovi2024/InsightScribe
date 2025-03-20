import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AllPosts from "../components/AllPosts";
import CreatePost from "../components/CreatePost";
import UpdateDeletePost from "../components/UpdateDeletePost";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("all");

  return (
    <div className="flex h-screen">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="w-3/4 p-5">
        {activeComponent === "all" && <AllPosts />}
        {activeComponent === "create" && <CreatePost />}
        {activeComponent === "update" && <UpdateDeletePost />}
      </div>
    </div>
  );
};

export default Dashboard;
