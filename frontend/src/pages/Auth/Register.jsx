import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Account created successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const inputClass = "w-full p-4 bg-[#0f172a] border border-gray-700 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300";
  const labelClass = "block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] px-4 py-12">
      <section className="relative w-full max-w-[450px]">
        {/* Background Decorative Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative bg-[#1e293b]/40 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
              Create Account
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Join the Maktarisia Network
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className={labelClass}>Username</label>
              <input
                type="text"
                className={inputClass}
                placeholder="CyberNinja_99"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                className={inputClass}
                placeholder="operator@network.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  className={inputClass}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Confirm</label>
                <input
                  type="password"
                  className={inputClass}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full mt-4 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-[0.98] disabled:opacity-50 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="scale-50"><Loader /></div>
              ) : (
                "Initialize Profile"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Already a member?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-green-500 hover:text-green-400 transition-colors ml-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;