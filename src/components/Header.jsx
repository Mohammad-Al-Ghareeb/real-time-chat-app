import React from "react";
import { LogOut } from "react-feather";
import { useAuth } from "../utils/AuthContext";
const Header = () => {
  const { user, handleUserLogout } = useAuth();
  return (
    <div id="header--wrapper">
      {user ? (
        <>
          Welcome {user.name}
          <LogOut className="header--link" onClick={handleUserLogout} />
        </>
      ) : (
        <button>Logout</button>
      )}
    </div>
  );
};

export default Header;
