import Dashboard from "@mui/icons-material/Dashboard";
import Description from "@mui/icons-material/Description";
import Business from "@mui/icons-material/Business";
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";
import Payment from "@mui/icons-material/Payment";
import AccountBoxSharp from "@mui/icons-material/AccountBoxSharp";
import VerifiedUserSharp from "@mui/icons-material/VerifiedUserSharp";
import FileCopy from "@mui/icons-material/FileCopy";
import PostAdd from "@mui/icons-material/PostAdd";

const useSidebarNav = (isAdmin) => {
  let menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/",
    },
    {
      text: "Applications",
      icon: <FileCopy />,
      path: "/applications",
    },
    {
      text: "Payments",
      icon: <Payment />,
      path: "/payments",
    },
    {
      text: "Organization",
      icon: <Business />,
      path: "/organizations",
    },
    {
      text: "New organization",
      icon: <CreateNewFolder />,
      path: "/new-organization",
    },
    {
      text: "Custom Application",
      icon: <Description />,
      path: "/custom-application",
    },
    {
      text: "Completed Courses",
      icon: <VerifiedUserSharp />,
      path: "/completed-courses",
    },
    ,
    {
      text: "My profile",
      icon: <AccountBoxSharp />,
      path: "/my-profile",
    },
  ];

  if (isAdmin) {
    menuItems
      .splice(5, 1, {
        text: "New Course",
        icon: <PostAdd />,
        path: "/course",
      })
      .filter((filteredMenu) => filteredMenu.path !== "/custom-application");
  }
  return menuItems;
};

export default useSidebarNav;
