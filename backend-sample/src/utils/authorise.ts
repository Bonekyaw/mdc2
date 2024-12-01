/*
 * Authorization
 * These two functions are same
 * authorise(true, user, "super", "manager", "editor") === authorise(false, user, "user")
 * (false, user, "user") In these parameters, user param in the middle is an instance model of the database table.
 * last "user" means a "user" role.
 * true means that his role must be one of these.
 * false means that his role must not be one of these.
 */

const authorise = (permission: boolean, user: any, ...roles: string[]) => {
  const result = roles.includes(user.role);

  if (!permission && result) {
    const err: any = new Error("This action is not allowed.");
    err.status = 403;
    throw err;
  }

  if (permission && !result) {
    const err: any = new Error("This action is not allowed.");
    err.status = 403;
    throw err;
  }
};

export default authorise;
