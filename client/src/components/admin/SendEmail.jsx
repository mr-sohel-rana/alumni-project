import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const SendEmail = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle form submission state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/read");
        setUsers(response.data.data);
        console.log("Users fetched:", response.data.data); // Debugging user data fetch
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching users:", err); // Log the error
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !message) {
      alert("Please select an email and write a message.");
      return;
    }

    setIsSubmitting(true); // Set submitting state to true
    console.log("Sending email to:", email); // Debugging: log email being sent
    console.log("Message being sent:", message); // Debugging: log message being sent

    try {
      await axios.post("http://localhost:5000/api/v1/send-email", {
        email,
        sms: message, // Ensure you're sending 'sms' instead of 'message'
      });
      alert("Email sent successfully!");
      setMessage(""); // Reset message after sending
      setEmail(""); // Reset email after sending
    } catch (err) {
      alert("Failed to send email.");
      console.error("Error sending email:", err.response?.data?.message || err.message); // Log the error details
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  if (loading) return <div className="text-center text-muted mt-4">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
          <h2 className="text-center mb-3">Send an Email</h2>

          <form onSubmit={handleSubmit}>
            {/* Select Recipient */}
            <div className="mb-3">
              <label className="form-label">Select Recipient</label>
              <select
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-select"
              >
                <option value="">Select a recipient</option>
                {users.map((user) => (
                  <option key={user._id} value={user.email}>
                    {user.county} ({user.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Email Field (Read-only) */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="form-control bg-light"
              />
            </div>

            {/* Message Field */}
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                name="text"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Sending..." : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SendEmail;
