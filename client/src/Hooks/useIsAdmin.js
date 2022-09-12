import { useSelector } from "react-redux";
import { ROLES } from "../Config/roles";
import { selectOrganizationById } from "../Features/api/organizationApiSlice";

const useIsAdmin = (organizationId) => {
  const { user, token } = useSelector((state) => state.auth);
  const userId = user?.id;
  const roles = user?.roles;
  const isAdmin = user && Object.values(roles).includes(ROLES.Admin);
  const organization = useSelector((state) =>
    selectOrganizationById(state, organizationId)
  );
  const isOrgAdmin =
    organization && Object.values(organization?.admins).includes(user.id);
  return { user, token, userId, roles, isAdmin, isOrgAdmin };
};

export default useIsAdmin;
