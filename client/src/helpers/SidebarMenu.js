import {
  Dashboard,
  Description,
  Business,
  CreateNewFolder,
  Payment,
  AccountBoxSharp,
  VerifiedUserSharp,
  FileCopy,
  PostAdd,
} from "@mui/icons-material";

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },
  {
    text: "Custom Application",
    icon: <Description />,
    path: "/custom-application",
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
    text: "Completed Courses",
    icon: <VerifiedUserSharp />,
    path: "/completed-courses",
  },
  {
    text: "New Course",
    icon: <PostAdd />,
    path: "/course",
  },
  {
    text: "My profile",
    icon: <AccountBoxSharp />,
    path: "/my-profile",
  },
];

export default menuItems;
