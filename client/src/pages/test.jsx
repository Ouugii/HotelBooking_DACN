import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <p>Only authenticated users can see this.</p>
    </div>
  );
};

export default Dashboard;

// import React from 'react';
// import { Redirect } from 'react-router-dom';

// const withAuth = (Component) => {
//   return (props) => {
//     const isAuthenticated = // logic xác thực người dùng;

//     if (!isAuthenticated) {
//       return <Redirect to="/login" />;
//     }

//     return <Component {...props} />;
//   };
// };

// export default withAuth;

// import React from 'react';
// import withAuth from './withAuth';
// import Dashboard from './Dashboard';

// const ProtectedDashboard = withAuth(Dashboard);

// const App = () => (
//   <div>
//     <ProtectedDashboard />
//   </div>
// );

// export default App;
