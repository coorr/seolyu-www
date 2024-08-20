import React from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import styles from "./css/AdminNavigation.module.css";

const AdminNavigation = () => {
  return (
    <Nav className={`flex-column ${styles.navMenu}`}>
      <Nav.Item className={styles.navItem}>
        <Link href="/admin/login" passHref legacyBehavior>
          <Nav.Link className={styles.link}>로그인</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item className={styles.navItem}>
        <Link href="/admin/applicant" passHref legacyBehavior>
          <Nav.Link className={styles.link}>신청 목록</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default AdminNavigation;
