import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaUserShield, FaBoxOpen, FaSave } from "react-icons/fa";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Security breach: Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Identity verified: Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const inputStyles = "w-full p-4 bg-[#0f172a] border border-gray-800 rounded-2xl text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-700";
  const labelStyles = "block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-[1px] w-12 bg-green-500"></span>
              <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.4em]">User Management</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Account Profile</h1>
          </div>
          
          <Link
            to="/user-orders"
            className="flex items-center gap-3 bg-[#1e293b] hover:bg-green-500 hover:text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-black/20"
          >
            <FaBoxOpen className="text-lg" />
            Order History
          </Link>
        </div>

        {/* --- Main Profile Console --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1e293b]/20 border border-gray-800 p-8 rounded-[2rem] backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                <FaUserShield className="text-4xl text-black" />
              </div>
              <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{userInfo.username}</h3>
              <p className="text-gray-500 text-xs font-bold truncate">{userInfo.email}</p>
              <div className="mt-6 pt-6 border-t border-gray-800/50">
                <span className="inline-block px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-black uppercase rounded-full">
                  Verified Operative
                </span>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-[#1e293b]/10 border border-gray-800 p-8 md:p-12 rounded-[2rem] backdrop-blur-md">
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyles}>Display Name</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className={inputStyles}
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Registry Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className={inputStyles}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800/50">
                  <div>
                    <label className={labelStyles}>New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={inputStyles}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Verify Access Key</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={inputStyles}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={loadingUpdateProfile}
                    className="group relative w-full md:w-auto flex items-center justify-center gap-3 bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-5 px-12 rounded-2xl hover:bg-green-500 transition-all shadow-2xl shadow-white/5 active:scale-95 disabled:opacity-50"
                  >
                    {loadingUpdateProfile ? (
                      <Loader size="small" />
                    ) : (
                      <>
                        <FaSave className="text-lg group-hover:rotate-12 transition-transform" />
                        Save Configuration
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;