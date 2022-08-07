import axios from "axios";

const API_URL = "/api/organizations/";

const createOrganization = async (organizationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, organizationData, config);

  return response.data;
};

const getOrganizations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete course
const deleteOrganization = async (organizationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + organizationId, config);

  return response.data;
};

const organizationService = {
  createOrganization,
  getOrganizations,
  deleteOrganization,
};

export default organizationService;
