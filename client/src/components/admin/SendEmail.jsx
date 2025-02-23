import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const SendEmail = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]); // Array to store selected emails
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/read");
        setUsers(response.data.data);
        console.log("Users fetched:", response.data.data); // Debugging user data fetch
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email) // Remove if already selected
        : [...prev, email] // Add if not selected
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedEmails.length === 0 || !message) {
      alert("Please select at least one recipient and write a message.");
      return;
    }

    setIsSubmitting(true);
    console.log("Sending email to:", selectedEmails);
    console.log("Message being sent:", message);

    try {
      await axios.post("http://localhost:5000/api/v1/send-email", {
        emails: selectedEmails, // Sending an array of emails
        sms: message,
      });
      alert("Emails sent successfully!");
      setMessage("");
      setSelectedEmails([]); // Reset selected emails
    } catch (err) {
      alert("Failed to send email.");
      console.error("Error sending email:", err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
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
            {/* Select Recipients (Checkbox List) */}
            <div className="mb-3">
              <label className="form-label">Select Recipients</label>
              <div className="border rounded p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {users.map((user) => (
                  <div key={user._id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`user-${user._id}`}
                      value={user.email}
                      checked={selectedEmails.includes(user.email)}
                      onChange={() => handleCheckboxChange(user.email)}
                    />
                    <label className="form-check-label" htmlFor={`user-${user._id}`}>
                      {user.county} ({user.name})
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SendEmail;
