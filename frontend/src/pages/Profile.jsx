import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Access user token from context
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userStatus: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        console.log("user:", user);
        console.log("token:", user?.token);
        console.log("userId:", userId);
        const response = await axiosInstance.get(`/api/auth/profile/${userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log("beforesefFromData:", response.data)
        // const response = await axiosInstance.get(`/api/auth/profile/${userId}`);
        setFormData({
          name: response.data.name ?? '',
          email: response.data.email ?? '',
          userStatus: response.data.userStatus ?? '',
          role: response.data.role ?? ''
        });
        console.log("aftersefFromData:", response.data)
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {

        setLoading(false);
      }
    };

    if (userId) fetchProfile();
  }, [user, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`/api/auth/profile/${userId}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // await axiosInstance.put(`/api/auth/profile/${userId}`, formData);
      alert('Profile updated successfully!');
      navigate(`/profile/${userId}`);
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // go back to previous page
  const onCancel = () => {
    navigate(-1);
  };

  // delete profile
  const onDelete = async () => {
    try {
      await axiosInstance.delete(`/api/auth/profile/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profile deleted successfully.');
      navigate(`/inventory`);
    } catch (error) {
      console.error(error);
      alert('Failed to delete item.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />

        {user?.role !== "R002" && (
          <select
            value={formData.userStatus}
            onChange={(e) => setFormData({ ...formData, userStatus: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Select role</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        )}
        {user?.role !== "R002" && (
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Select status</option>
            <option value="R001">Admin</option>
            <option value="R002">User</option>
          </select>
        )}
        <div className='flex '>
          <button
            type="button"
            className="w-full bg-600 p-2 rounded border"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
          {user?.role !== "R002" && (
            <button
              type="button"
              className="w-full bg-red-600 text-white p-2 rounded"
              onClick={onDelete}
            >
              {loading ? 'Deleting...' : 'Delete Profile'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
