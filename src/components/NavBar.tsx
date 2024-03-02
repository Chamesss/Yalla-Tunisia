export default function NavBar() {
  const authenticatedNavigationItems = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/Profile" },
  ];
  const notAuthenticatedNavigationItems = [
    { name: "View all stores", href: "/stores" },
  ];
  // const navigationItems = session
  //   ? authenticatedNavigationItems
  //   : notAuthenticatedNavigationItems;

  const navigationItems = notAuthenticatedNavigationItems;

  return (
    <div className="flex flex-row p-4 justify-around bg-slate-500">
      <div>
        <p>App logo</p>
      </div>
      <div className="flex flex-row gap-5">
        <p>Home</p>
        <p>Info</p>
        <p>Services</p>
        <p>Join?</p>
        <p>Profile</p>
      </div>
    </div>
  );
}
