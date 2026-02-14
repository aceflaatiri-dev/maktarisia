import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] px-4">
      <section className="relative w-full max-w-[400px]">
        {/* Decorative Background Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative bg-[#1e293b]/40 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Secure Terminal Access
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full p-4 bg-[#0f172a] border border-gray-700 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Access Password
              </label>
              <input
                type="password"
                required
                className="w-full p-4 bg-[#0f172a] border border-gray-700 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-[0.98] disabled:opacity-50 flex justify-center items-center"
            >
              {isLoading ? <div className="scale-50"><Loader /></div> : "Authorize"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <p className="text-gray-500 text-xs font-bold text-center uppercase tracking-widest">
              New to the platform?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-green-500 hover:text-green-400 transition-colors ml-1"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;