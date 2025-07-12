 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/Layout";
import {
  Droplet,
  Hospital,
  Phone,
  Trash2,
  Pencil,
  Calendar,
  PackageOpen,
} from "lucide-react";

const cardStyle = {
  backgroundColor: "#ffe4e6", // pink-100
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  borderRadius: "1rem",
  border: "1px solid #fbcfe8", // pink-200
  display: "flex",
  flexDirection: "column",
  transition: "box-shadow 0.3s ease",
  marginBottom: "1.5rem",
  fontSize: "25px"
};

const cardHoverStyle = {
  boxShadow: "0 10px 15px rgba(0,0,0,0.2)",
};

const cardContentStyle = {
  padding: "1rem",
  flex: 1,
};

const headingStyle = {
  fontSize: "1.25rem",
  fontWeight: "700",
  color: "#dc2626", // red-600
  marginBottom: "1rem",
};

const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.25rem",
  fontWeight: "500",
};

const iconTextStyle = {
  fontWeight: "500",
};

const actionBarStyle = {
  borderTop: "1px solid #ddd",
  display: "flex",
};

const buttonStyle = {
  flex: 1,
  padding: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.25rem",
  cursor: "pointer",
  border: "none",
  background: "transparent",
  fontWeight: "600",
  transition: "background-color 0.3s ease",
};

const editButtonStyle = {
  color: "#2563eb", // blue-600
};

const editButtonHover = {
  backgroundColor: "#eff6ff", // blue-50
};

const deleteButtonStyle = {
  color: "#dc2626", // red-600
};

const deleteButtonHover = {
  backgroundColor: "#fee2e2", // red-50
};

const iconColors = {
  blood: "#ef4444", // red-500
  amount: "#db2777", // pink-600
  place: "#f43f5e", // rose-600
  date: "#6366f1", // indigo-600
  phone: "#2563eb", // blue-600
};

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/posts");
        setPosts(data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <Layout>
      <div
        style={{
          padding: 16,
          display: "grid",
          gap: 24,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(260px, 1fr))",
        }}
      >
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              ...cardStyle,
              ...(hoveredCard === post._id ? cardHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredCard(post._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={cardContentStyle}>
              <h2 style={headingStyle}>{post.problemname}</h2>

              <p style={rowStyle}>
                <Droplet size={22} color={iconColors.blood} />
                <span style={iconTextStyle}>Blood:</span> {post.blood}
              </p>

              <p style={rowStyle}>
                <PackageOpen size={22} color={iconColors.amount} />
                <span style={iconTextStyle}>Amount:</span> {post.amount}
              </p>

              <p style={rowStyle}>
                <Hospital size={22} color={iconColors.place} />
                <span style={iconTextStyle}>Place:</span> {post.place}
              </p>

              <p style={rowStyle}>
                <Calendar size={22} color={iconColors.date} />
                <span style={iconTextStyle}>Date:</span> {post.date}
              </p>

              <p style={rowStyle}>
                <Phone size={22} color={iconColors.phone} />
                {post.phone1}
              </p>

              <p style={rowStyle}>
                <Phone size={22} color={iconColors.phone} />
                {post.phone2}
              </p>
            </div>

            <div style={actionBarStyle}>
              <button
                style={{ ...buttonStyle, ...editButtonStyle }}
                onClick={() => navigate(`/edit-post/${post._id}`)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = editButtonHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <Pencil size={20} /> Edit
              </button>
              <button
                style={{ ...buttonStyle, ...deleteButtonStyle }}
                onClick={() => deletePost(post._id)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = deleteButtonHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <Trash2 size={20} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AllPost;
