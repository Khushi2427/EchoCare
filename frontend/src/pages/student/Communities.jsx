import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import CommunityChat from "./CommunityChat"; // Import the chat component

const Communities = () => {
  const { communityId } = useParams(); // Get communityId from URL if present
  const navigate = useNavigate();
  
  const [allCommunities, setAllCommunities] = useState([]);
  const [myCommunities, setMyCommunities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communityDetails, setCommunityDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // 🔄 Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [allRes, mineRes] = await Promise.all([
        axios.get("http://localhost:5002/api/communities", { headers }),
        axios.get("http://localhost:5002/api/communities/my", { headers })
      ]);

      setAllCommunities(allRes.data);
      setMyCommunities(mineRes.data);
      
      // If we have a communityId in URL, find and set it as selected
      if (communityId) {
        const allComms = [...allRes.data, ...mineRes.data];
        const foundCommunity = allComms.find(c => c._id === communityId);
        if (foundCommunity) {
          setSelectedCommunity(communityId);
          setCommunityDetails(foundCommunity);
        }
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [communityId]); // Refetch when communityId changes

  // ➕ Create community
  const createCommunity = async () => {
    if (!name) return;

    try {
      await axios.post(
        "http://localhost:5002/api/communities",
        { name, description },
        { headers }
      );

      setName("");
      setDescription("");
      fetchData();
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  // ➕ Join community
  const joinCommunity = async (id) => {
    try {
      await axios.post(
        `http://localhost:5002/api/communities/${id}/join`,
        {},
        { headers }
      );
      fetchData();
      
      // If joining from the chat view, navigate to that community
      if (selectedCommunity === id || communityId === id) {
        navigate(`/student/communities/${id}`);
      }
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  // ❌ Leave community
  const leaveCommunity = async (id) => {
    if (!window.confirm("Leave this community?")) return;

    try {
      await axios.post(
        `http://localhost:5002/api/communities/${id}/leave`,
        {},
        { headers }
      );
      fetchData();
      
      // If leaving the currently selected community, clear selection
      if (selectedCommunity === id || communityId === id) {
        setSelectedCommunity(null);
        setCommunityDetails(null);
        navigate("/student/communities");
      }
    } catch (error) {
      console.error("Error leaving community:", error);
    }
  };

  // Handle opening a community
  const handleOpenCommunity = (community) => {
    setSelectedCommunity(community._id);
    setCommunityDetails(community);
    navigate(`/student/communities/${community._id}`);
  };

  // If we're viewing a specific community (chat view)
  if (communityId && selectedCommunity) {
    return (
      <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
        {/* Left Sidebar - Communities List */}
        <div className="lg:w-1/4 border-r bg-white overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🌐 Communities</h2>
            
            {/* CREATE COMMUNITY */}
            <div className="border p-4 mb-6 rounded-lg">
              <h3 className="font-medium mb-2">Create Community</h3>
              <input
                placeholder="Community name"
                className="border p-2 w-full mb-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="border p-2 w-full mb-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                onClick={createCommunity}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>

            {/* MY COMMUNITIES */}
            <h3 className="font-semibold mb-2">My Communities</h3>
            {myCommunities.length === 0 ? (
              <p className="text-gray-500 text-sm mb-4">No joined communities</p>
            ) : (
              <div className="space-y-2 mb-6">
                {myCommunities.map((c) => (
                  <div
                    key={c._id}
                    className={`p-3 rounded-lg cursor-pointer ${
                      selectedCommunity === c._id
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleOpenCommunity(c)}
                  >
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-gray-600 truncate">
                      {c.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ALL COMMUNITIES */}
            <h3 className="font-semibold mb-2">Discover Communities</h3>
            <div className="space-y-2">
              {allCommunities
                .filter(c => !myCommunities.some(m => m._id === c._id))
                .map((c) => (
                  <div
                    key={c._id}
                    className="p-3 rounded-lg border hover:bg-gray-50"
                  >
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-gray-600 mb-2">
                      {c.description}
                    </div>
                    <button
                      onClick={() => joinCommunity(c._id)}
                      className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
                    >
                      Join
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Side - Chat */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">{communityDetails?.name || "Community Chat"}</h1>
                <p className="text-sm text-gray-600">
                  {communityDetails?.description || "Loading..."}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  to="/student/communities"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ← Back to All
                </Link>
                <button
                  onClick={() => leaveCommunity(selectedCommunity)}
                  className="text-red-600 hover:text-red-800 text-sm border border-red-200 px-3 py-1 rounded"
                >
                  Leave Community
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <CommunityChat communityId={selectedCommunity} />
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading communities...</div>
      </div>
    );
  }

  // Default view (list view - no specific community selected)
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        🌐 Community Connect
      </h2>

      {/* CREATE COMMUNITY */}
      <div className="border p-4 mb-6 rounded-lg">
        <h3 className="font-medium mb-2">Create Community</h3>
        <input
          placeholder="Community name"
          className="border p-2 w-full mb-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={createCommunity}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </div>

      {/* MY COMMUNITIES */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">My Communities</h3>
        {myCommunities.length === 0 ? (
          <div className="text-center p-8 border rounded-lg">
            <p className="text-gray-500">You haven't joined any communities yet</p>
            <p className="text-sm text-gray-400 mt-2">Join a community below to start chatting!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myCommunities.map((c) => (
              <div
                key={c._id}
                className="border p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{c.name}</h4>
                    <p className="text-gray-600 mt-1">{c.description}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleOpenCommunity(c)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Open Chat
                    </button>
                    <button
                      onClick={() => leaveCommunity(c._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Leave
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ALL COMMUNITIES */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Discover Communities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCommunities
            .filter(c => !myCommunities.some(m => m._id === c._id))
            .map((c) => (
              <div
                key={c._id}
                className="border p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-lg">{c.name}</h4>
                <p className="text-gray-600 mt-1 mb-3">{c.description}</p>
                <button
                  onClick={() => joinCommunity(c._id)}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Join Community
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Communities;