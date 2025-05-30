import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import styles from './layout.module.css';

export function Layout() {
   return (
      <div>
         <Header />
         <main className={styles.container}>
            <Outlet />
         </main>
      </div>
   );
}