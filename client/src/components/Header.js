// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import "./Header.css";
// import Participants from "./Participants";

// function Header(props) {
//   const navLinks = props.navLinks;

//   const [activeStates, setActiveStates] = useState([true, false]);

//   const handleNavLinkClick = (index) => {
//     const updatedStates = [...activeStates];
//     for (let i = 0; i < updatedStates.length; i++) {
//       if (i === index) {
//         updatedStates[index] = !updatedStates[index];
//       } else {
//         updatedStates[i] = !updatedStates[i];
//       }
//     };
//     setActiveStates(updatedStates);
//   };

//   useEffect(() => {
//     const navLinkElements = document.querySelectorAll(".nav-link");

//     navLinkElements.forEach(navLinkElement => {
//       const liElement = navLinkElement.closest("li");
//       if (navLinkElement.classList.contains("active")) {
//         liElement.classList.add("active");
//       } else {
//         liElement.classList.remove("active");
//       }
//     });
//   }, [activeStates]);

//   // useEffect(() => {
//   //   const liElements = document.querySelectorAll(".li");

//   //   liElements.forEach((liElement, index) => {
//   //     if (activeStates[index]) {
//   //       liElement.classList.add("active");
//   //     } else {
//   //       liElement.classList.remove("active");
//   //     }
//   //   });
//   // }, [activeStates]);

//   return (
//     <header>
//       <ul>
//         {Object.entries(navLinks).map((navLink, index) => {
//           const route = navLink[0];
//           const navName = navLink[1];
//           return (
//             <li
//               key={route}
//               className={activeStates[index] ? "active" : ""}
//               onClick={() => handleNavLinkClick(index)}
//             >
//               <NavLink activeClassName="active" to={route}>
//                 {navName}
//               </NavLink>
//             </li>
//           );
//         })}
//       </ul>
//     </header>
//   );
// }

// export default Header;
