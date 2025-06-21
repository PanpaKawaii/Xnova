import './App.css'
import { useAuth } from './app/hooks/AuthContext/AuthContext'
import MainRoutes from './app/routes/MainRoutes'

export default function App() {

  const { user } = useAuth();
  console.log('-----user-----', user);

  return <MainRoutes />
  
  // if (Role == "Counselor") {
  //   return <CounselorRoutes />;
  // } else if (Role == "Customer") {
  //   return <CustomerRoutes />;
  // }
  // else if (Role == 'Admin') {
  //   return <AdminRoutes />;
  // } else return <MainRoutes />;
}


