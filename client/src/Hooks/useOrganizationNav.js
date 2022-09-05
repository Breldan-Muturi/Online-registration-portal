import { useLocation, useParams } from "react-router-dom";

const useOrganizationNav = () => {
  const { organizationId } = useParams();
  const { pathname } = useLocation();
  const routes = [
    `/${organizationId}/applications`,
    `/${organizationId}/members`,
    `/${organizationId}/payments`,
    `/${organizationId}/settings`,
  ];

  return { routes, organizationId, pathname };
};

export default useOrganizationNav;
