const routes = [
  {
    title: "Dashboard",
    to: "/dashboard",
    exact: true,
    isPrivate: true,
  },
  {
    title: "Landing",
    to: "/",
    exact: false,
    isPrivate: false,
  }
]


export default routes;