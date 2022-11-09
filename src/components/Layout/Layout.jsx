import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Layout({
  isLoggedIn,
  userData,
  handleSignOut,
  onAddTask,
  onFiltred,
  visor,
  handleChangeVisor,
}) {
  let location = useLocation();
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userData={userData}
        handleSignOut={handleSignOut}
      />
      {isLoggedIn &&
        location.pathname !== "/signup" &&
        location.pathname !== "/signin" && (
      <Navigation
      isLoggedIn={isLoggedIn}
        onAddTask={onAddTask}
        onFiltred={onFiltred}
        visor={visor}
        handleChangeVisor={handleChangeVisor}
      />
      )}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
