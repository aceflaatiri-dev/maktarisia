import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Confirm permanent deletion of this identity?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("Identity purged.");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    // If clicking same user, cancel edit. Otherwise, open edit for new user.
    if (editableUserId === id) {
      setEditableUserId(null);
    } else {
      setEditableUserId(id);
      setEditableUserName(username);
      setEditableUserEmail(email);
    }
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      }).unwrap();
      setEditableUserId(null);
      refetch();
      toast.success("Identity re-configured.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <AdminMenu />
      
      <div className="container mx-auto px-6 py-12">
        <header className="mb-10 border-b border-gray-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">
              Identity <span className="text-gray-500">Registry</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium tracking-wide">
              Managing authenticated system personnel and users.
            </p>
          </div>
          <div className="text-[10px] font-mono text-gray-600 mb-1">
            TOTAL_RECORDS: {users?.length || 0}
          </div>
        </header>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="overflow-x-auto bg-[#1e293b]/10 border border-gray-800 rounded-[2rem] backdrop-blur-sm shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Node_ID</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Username</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Email Address</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Auth_Level</th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {users.map((user) => (
                  <tr key={user._id} className={`hover:bg-white/5 transition-colors group ${editableUserId === user._id ? 'bg-blue-500/5' : ''}`}>
                    <td className="px-6 py-4 font-mono text-[10px] text-gray-600">
                      {user._id.slice(-8).toUpperCase()}
                    </td>

                    <td className="px-6 py-4">
                      {editableUserId === user._id ? (
                        <input
                          type="text"
                          autoFocus
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="bg-[#0f172a] border border-blue-500/50 text-blue-400 text-sm p-2 rounded-lg outline-none focus:border-blue-500 w-full max-w-[150px]"
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm tracking-tight">{user.username}</span>
                          <button 
                            onClick={() => toggleEdit(user._id, user.username, user.email)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaEdit className="text-gray-600 hover:text-blue-400" />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {editableUserId === user._id ? (
                        <input
                          type="email"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="bg-[#0f172a] border border-blue-500/50 text-blue-400 text-sm p-2 rounded-lg outline-none focus:border-blue-500 w-full max-w-[200px]"
                        />
                      ) : (
                        <a href={`mailto:${user.email}`} className="text-gray-500 hover:text-blue-400 text-xs font-mono transition-colors">
                          {user.email}
                        </a>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        user.isAdmin 
                        ? "bg-green-500/5 text-green-500 border-green-500/20" 
                        : "bg-gray-500/5 text-gray-500 border-gray-500/20"
                      }`}>
                        {user.isAdmin ? "Access_Lvl_01" : "Access_Lvl_00"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {editableUserId === user._id ? (
                          <>
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                            >
                              Commit
                            </button>
                            <button
                              onClick={() => setEditableUserId(null)}
                              className="bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all"
                            >
                              Abort
                            </button>
                          </>
                        ) : (
                          !user.isAdmin && (
                            <button
                              onClick={() => deleteHandler(user._id)}
                              className="text-gray-700 hover:text-red-500 transition-colors p-2"
                              title="Purge Identity"
                            >
                              <FaTrash size={14} />
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;