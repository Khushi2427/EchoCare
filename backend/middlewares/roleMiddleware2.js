const roleMiddleware2 = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // Admin has full access
      if (req.user.role === "admin") return next();
  
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
  
      next();
    };
  };
  
  export default roleMiddleware2;
  