export const getProjectsByContractorType = projects => {
    return {
        "Contractor Projects": projects.filter(project => project.is_user_community === false),
        "User Committee Projects": projects.filter(project => project.is_user_community === true),
    };
};
