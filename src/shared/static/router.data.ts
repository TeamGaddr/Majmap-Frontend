const ROUTES = {
  // Authentication routes
  authentication: {
    login: "/auth/login",
    register: "/auth/register",
  },
  
  // Dashboard routes
  dashboard: {
    root: "/dashboard",
    workflow: "/dashboard/workflow",
    upload: "/dashboard/upload",
    generate: "/dashboard/generate",
    templates: "/dashboard/templates",
    styling: "/dashboard/styling",
    users: "/dashboard/users",
    settings: "/dashboard/settings",
    test: "/dashboard/test",
  },
  
  // Public routes
  public: {
    root: "/",
    about: "/about-us",
    posts: "/all-posts",
    test: "/test",
    reactFlow: "/react-flow",
  },
  
  // User routes
  user: {
    profile: "/user-profile", 
    dashboard:"/dashboard"
  }
};

export default ROUTES;