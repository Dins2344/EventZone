import OrganizationsTable from "../../components/admin_components/organizationManagement";
import UserManagement from "../../components/admin_components/userManagement";

const UsersAndOrganization = () => {
    return <div className="min-h-screen px-4">
        <UserManagement />
        <OrganizationsTable />
  </div>;
};

export default UsersAndOrganization;
