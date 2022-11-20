const PrivateRoute = ({pageRoles, userRole, page}) => {
    return (
        pageRoles && pageRoles.indexOf(userRole) === -1 ?
            <>Not found</> :
            page
    )
};
export  default  PrivateRoute;
