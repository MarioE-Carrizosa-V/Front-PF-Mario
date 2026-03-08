// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import style from "./ProfileView.module.css";
// import * as act from "../../../redux/actions";
// import countries from "./countries";

// const ProfileView = (props) => {
//   const dispatch = useDispatch();

//   const IDUser = useSelector((state) => state.user);

//   const [editingName, setEditingName] = useState(false);
//   const [editingUserName, setEditingUserName] = useState(false);
//   const [editingCountry, setEditingCountry] = useState(false);

//   const [newName, setNewName] = useState("");
//   const [newUserName, setNewUserName] = useState("");
//   const [newCountry, setNewCountry] = useState("");

//   useEffect(() => {
//     dispatch(act.postLogin());
//     return () => {
//       dispatch(act.CleanDetail());
//     };
//   }, [dispatch]);

//   const handleEditNameClick = () => {
//     setEditingName(true);
//     setEditingUserName(false);
//     setEditingCountry(false);
//   };

//   const handleEditUserNameClick = () => {
//     setEditingName(false);
//     setEditingUserName(true);
//     setEditingCountry(false);
//   };

//   const handleEditCountryClick = () => {
//     setEditingName(false);
//     setEditingUserName(false);
//     setEditingCountry(true);
//   };

//   const handleEditProfileImageClick = () => {
//     setEditingName(false);
//     setEditingUserName(false);
//     setEditingCountry(false);
//   };

//   const handleSaveClick = () => {
//     if (editingName) {
//       dispatch(act.editName(IDUser?.id, newName));
//       setEditingName(false);
//     }
//     if (editingUserName) {
//       dispatch(act.editUserName(IDUser?.id, newUserName));
//       setEditingUserName(false);
//     }
//     if (editingCountry) {
//       dispatch(act.editCountry(IDUser?.id, newCountry));
//       setEditingCountry(false);
//     }
//   };

//   const handleNameChange = (e) => {
//     setNewName(e.target.value);
//   };

//   const handleUserNameChange = (e) => {
//     setNewUserName(e.target.value);
//   };

//   const handleCountryChange = (e) => {
//     setNewCountry(e.target.value);
//   };

//   return (
//     <div className={style.container}>
//       <h1>Profile</h1>
//       <div>
//         <img className={style.image} src={IDUser?.profileImage} alt="Profile" />
//         <h2>
//           Name:{" "}
//           {editingName ? (
//             <input
//               type="text"
//               value={newName}
//               onChange={handleNameChange}
//               placeholder={IDUser?.name}
//             />
//           ) : (
//             IDUser?.name
//           )}
//         </h2>
//         <h3>
//           User name:{" "}
//           {!editingName ? (
//             editingUserName ? (
//               <input
//                 type="text"
//                 value={newUserName}
//                 onChange={handleUserNameChange}
//                 placeholder={IDUser?.user_name}
//               />
//             ) : (
//               IDUser?.user_name
//             )
//           ) : null}
//         </h3>
//         <h3>
//         Country:{" "}
//         {editingCountry ? (
//           <select value={newCountry} onChange={handleCountryChange}>
//             <option value="">Select a country</option>
//             {countries.map((country) => (
//               <option key={country} value={country}>
//                 {country}
//               </option>
//             ))}
//           </select>
//         ) : (
//           IDUser?.country
//         )}
//       </h3>
//         <button onClick={handleEditNameClick} className={style.button}>
//           {editingName ? "Cancel" : "Edit Name"}
//         </button>
//         {editingName && (
//           <button onClick={handleSaveClick} className={style.saveButton}>
//             Save
//           </button>
//         )}
//         <button onClick={handleEditUserNameClick} className={style.button}>
//           {editingUserName ? "Cancel" : "Edit User Name"}
//         </button>
//         {editingUserName && (
//           <button onClick={handleSaveClick} className={style.saveButton}>
//             Save
//           </button>
//         )}
//         <button onClick={handleEditCountryClick} className={style.button}>
//           {editingCountry ? "Cancel" : "Edit Country"}
//         </button>
//         {editingCountry && (
//           <button onClick={handleSaveClick} className={style.saveButton}>
//             Save
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileView;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import style from "./ProfileView.module.css";
// import * as act from "../../../redux/actions";
// import countries from "./countries";

// const ProfileView = (props) => {
//   const dispatch = useDispatch();

//   //const IDUser = useSelector((state) => state.userStorage);
//   const datosUser = JSON.parse(localStorage.getItem("user"));
//   const IDUser = useSelector((state) => state.user);

//   const [editingName, setEditingName] = useState(false);
//   const [editingUserName, setEditingUserName] = useState(false);
//   const [editingCountry, setEditingCountry] = useState(false);

//   const [newName, setNewName] = useState("");
//   const [newUserName, setNewUserName] = useState("");
//   const [newCountry, setNewCountry] = useState("");

//   useEffect(() => {
//     dispatch(act.getUserStorage(datosUser?.id));
//     dispatch(act.postLogin());
//     setNewName(datosUser?.name || "");
//     setNewUserName(datosUser?.user_name || "");
//     setNewCountry(datosUser?.country || "");
//     return () => {
//       dispatch(act.CleanDetail());
//     };
//   }, [dispatch]);

//   const handleEditNameClick = () => {
//     setEditingName(true);
//     setEditingUserName(false);
//     setEditingCountry(false);
//   };

//   const handleEditUserNameClick = () => {
//     setEditingName(false);
//     setEditingUserName(true);
//     setEditingCountry(false);
//   };

//   const handleEditCountryClick = () => {
//     setEditingName(false);
//     setEditingUserName(false);
//     setEditingCountry(true);
//   };

//   const handleSaveClick = () => {
//     if (editingName) {
//       dispatch(act.editName(IDUser?.id, newName));
//       setEditingName(false);
//       localStorage.setItem("user", JSON.stringify({ ...datosUser, name: newName }));
//     }
//     if (editingUserName) {
//       dispatch(act.editUserName(IDUser?.id, newUserName));
//       setEditingUserName(false);
//       localStorage.setItem("user", JSON.stringify({ ...datosUser, user_name: newUserName }));
//     }
//     if (editingCountry) {
//       dispatch(act.editCountry(IDUser?.id, newCountry));
//       setEditingCountry(false);
//       localStorage.setItem("user", JSON.stringify({ ...datosUser, country: newCountry }));
//     }
//   };

//   const handleNameChange = (e) => {
//     setNewName(e.target.value);
//   };

//   const handleUserNameChange = (e) => {
//     setNewUserName(e.target.value);
//   };

//   const handleCountryChange = (e) => {
//     setNewCountry(e.target.value);
//   };

//   return (
//     <div className={style.container}>
//       <h1>Profile</h1>
//       <div>
//         <img className={style.image} src={IDUser?.profileImage} alt="Profile" />
//         <h2>
//           Name:{" "}
//           {editingName ? (
//             <input
//               type="text"
//               value={newName}
//               onChange={handleNameChange}
//               placeholder={IDUser?.name}
//             />
//           ) : (
//             IDUser?.name
//           )}
//         </h2>
//         <h3>
//           User name:{" "}
//           {!editingName ? (
//             editingUserName ? (
//               <input
//                 type="text"
//                 value={newUserName}
//                 onChange={handleUserNameChange}
//                 placeholder={IDUser?.user_name}
//               />
//             ) : (
//               IDUser?.user_name
//             )
//           ) : null}
//         </h3>
//         <h3>
//           Country:{" "}
//           {editingCountry ? (
//             <select value={newCountry} onChange={handleCountryChange}>
//               <option value="">Select a country</option>
//               {countries.map((country) => (
//                 <option key={country} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             IDUser?.country
//           )}
//         </h3>
//         <button onClick={handleEditNameClick} className={style.button}>
//           {editingName ? "Cancel" : "Edit Name"}
//         </button>
//         {editingName && (
//           <button onClick={handleSaveClick} className={style.saveButton}>
//             Save
//           </button>
//         )}
//         <button onClick={handleEditUserNameClick} className={style.button}>
//           {editingUserName ? "Cancel" : "Edit User Name"}
//         </button>
//         {editingUserName && (
//           <button onClick={handleSaveClick} className={style.saveButton}>
//             Save
//           </button>
//         )}
//         <button onClick={handleEditCountryClick} className={style.button}>
//           {editingCountry ? "Cancel" : "Edit Country"}
//         </button>
//         {editingCountry && (
//           <button onClick={handleSaveClick} className={style.saveButton}>
//             Save
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileView;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./ProfileView.module.css";
import * as act from "../../../redux/actions";
import ShoppingView from "./ShoppingView";
import usuario from "../../../assets/usuario.png";

const ProfileView = (props) => {
  const dispatch = useDispatch();

  const datosUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (datosUser?.id) {
      dispatch(act.getUserStorage(datosUser.id));
    }
    dispatch(act.postLogin());

    return () => {
      dispatch(act.CleanDetail());
    };
  }, [dispatch, datosUser?.id]);

  return (
    <div className={style.container}>
      <h1>Profile</h1>
      <div className={style.profileCard}>
        <img
          className={style.image}
          src={datosUser?.profileImage || usuario}
          alt="Profile"
          referrerPolicy="no-referrer"
        />
        <h2>Name: {datosUser?.name || "N/A"}</h2>
        <h3>Email: {datosUser?.email || "N/A"}</h3>

        {/* We can include the ShoppingView or Subscription view here later */}
        <ShoppingView />
      </div>
    </div>
  );
};

export default ProfileView;
