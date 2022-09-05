import { useSelector } from "react-redux";
import { ROLES } from "../Config/roles";
import { selectOrganizationById } from "../Features/api/organizationApiSlice";
import { selectCurrentUser } from "../Features/global/authSlice";

const useIsAdmin = (organizationId) => {
  const user = useSelector(selectCurrentUser);
  const roles = user?.roles;
  const isAdmin = user && Object.values(roles).includes(ROLES.Admin);
  const organization = useSelector((state) =>
    selectOrganizationById(state, organizationId)
  );
  const isOrgAdmin =
    organization && Object.values(organization?.admins).includes(user.id);
  return { user, roles, isAdmin, isOrgAdmin };
};

export default useIsAdmin;
