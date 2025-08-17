'use client';
import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect, Suspense, useCallback } from "react";
import { UserProvider, useUser } from "@/context/user-context";
import Link from "next/link";
import SuccessMessage from "@/components/success-message";

const inter = Inter({ subsets: ["latin"] });

function Header({ children }: any) {
  const { user, login } = useUser();
  
  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await axios.get('/api/users/currentuser');
      login(res.data.currentUser); 
    } catch (error) {
      // Handle error silently
    }
  }, [login]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);
  const links = [
    user === null && {label: 'Sign In', href: '/auth/signin'},
    user === null && {label: 'Sign Up', href: '/auth/signup'},
    !!user?.email && {label: 'Create Ticket', href: '/tickets/new'},
    !!user?.email && {label: 'My Orders', href: '/orders'},
    !!user?.email && {label: 'Sign Out', href: '/auth/signout'}
  ].filter(x=>!!x).map(
    ({label, href}) => {
      return <li className="nav-item" key={href}>
        <Link href={href} className="nav-link">
          {label}
        </Link>
      </li>
    }
  );

  return (
    <nav className="navbar navbar-light bg-light">
      {children}
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  )
}

export default function RootLayoutWrapper({
  children,
  server
}: any) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Header>
            {server}
          </Header>
          <Suspense fallback={null}>
            <SuccessMessage />
          </Suspense>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
