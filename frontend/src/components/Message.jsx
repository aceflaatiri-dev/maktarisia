import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineExclamationCircle } from "react-icons/ai";

const Message = ({ variant, children }) => {
  const getStyles = () => {
    switch (variant) {
      case "success":
        return {
          container: "bg-green-500/10 border-green-500/50 text-green-400",
          icon: <AiOutlineCheckCircle className="text-xl" />
        };
      case "danger": // Changed from "error" to match your previous component calls
      case "error":
        return {
          container: "bg-red-500/10 border-red-500/50 text-red-400",
          icon: <AiOutlineExclamationCircle className="text-xl" />
        };
      default:
        return {
          container: "bg-blue-500/10 border-blue-500/50 text-blue-400",
          icon: <AiOutlineInfoCircle className="text-xl" />
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300 ${styles.container}`}>
      <div className="flex-shrink-0">
        {styles.icon}
      </div>
      <div className="text-sm font-bold tracking-wide uppercase">
        {children}
      </div>
    </div>
  );
};

export default Message;