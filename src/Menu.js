import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Define a functional component for the Menu
const Menu = () => {
  return (
    <nav style={styles.menu}>
      <h1 style={styles.title}>Ease</h1>
      <h1 style={styles.title}>Mind</h1>
      <ul style={styles.menuList}>
        <li style={styles.menuItem}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/GoalTracker" style={styles.link}>Goal Trackers</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/community" style={styles.link}>Community</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/analyse" style={styles.link}>Analysis</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/chatapp" style={styles.link}>ChatApp</Link>
        </li>
      </ul>
    </nav>
  );
};

// Define some basic styles for the Menu component
const styles = {
  menu: {
    backgroundColor: 'rgba(64, 64, 64, 0.504)',
    padding: '10px',
    borderRadius: '5px',
    width: '250px', // Adjust width to fit your design
    height: '100vh', // Adjust height based on header height
    position: 'fixed', // Fixed position to the left
    top: '2px', // Positioned below the header
    left: 0,
    overflowY: 'auto', // Scroll if content overflows
  },
  menuList: {
    listStyleType: 'none',  
    margin: 0,
    color: 'black',
    padding: 0,
  },
  menuItem: {
    margin: '15px 0',
    padding: '20px 0',  // Added padding to each list item
    borderBottom: '2px solid white', // Blue underline border
    color: 'white',
    fontSize: '25px',
    transition: 'border-color 0.3s ease',
  },

  link: {
    textDecoration: 'none', // Remove underline
    color: 'white', // Ensure text color is correct
  },
  title:{

    fontSize: '60px',
  }
};

export default Menu;
