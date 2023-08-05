import React from "react";

type SidebarProps = {
  // Define props for the sidebar here
};

type MainContentProps = {
  // Define props for the main content here
};

// const Sidebar: React.FC<SidebarProps> = (props) => {
//   // Implement the sidebar component here
//   return (
//     <div className="bg-gray-900 w-1/4 border rounded mr-1 lg:w-0 lg:hidden flex">
//       {/* Sidebar content */}
//       sidebar content
//     </div>
//   );
// };

export function Sidebar() {
  return (
    <div className="hidden md:w-3/5 md:flex 2xl:w-1/4 xl:w-1/3 bg-gray-950 border mr-6 px-2 py-1 rounded h-screen">
      sidebar
    </div>
  );
}

const MainContent: React.FC<MainContentProps> = (props) => {
  // Implement the main content component here
  return (
    <div className="bg-gray-700 w-3/4 border rounded lg:w-full">
      {/* Main content */}
      main content
    </div>
  );
};

const SidebarAndMainContent: React.FC = () => {
  // Implement the component that combines the sidebar and main content here
  return (
    <div className="flex mx-2">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default SidebarAndMainContent;
