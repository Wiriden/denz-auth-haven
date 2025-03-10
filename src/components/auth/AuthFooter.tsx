
import React from "react";

const AuthFooter: React.FC = () => {
  return (
    <div className="text-center text-xs text-gray-500 mt-6 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
      <p>
        Genom att logga in godkänner du våra{" "}
        <a href="#" className="text-denz-blue hover:text-blue-400 underline">
          användarvillkor
        </a>{" "}
        och{" "}
        <a href="#" className="text-denz-blue hover:text-blue-400 underline">
          sekretesspolicy
        </a>
      </p>
    </div>
  );
};

export default AuthFooter;
