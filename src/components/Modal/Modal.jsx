import React from "react";
import s from "./Modal.module.css";

const Modal = ({
  title,
  description,
  setTitle,
  setDescription,
  addNewPlace,
}) => {
  return (
    <div className={s.modal}>
      <div className={s.modalcontent}>
        <span className={s.add} onClick={addNewPlace}>
          +
        </span>
        <p>Title</p>
        <input
          value={title}
          onChange={(e) => {
            e.stopPropagation();
            setTitle(e.target.value);
          }}
          type="text"
        />
        <p>Description</p>
        <input
          value={description}
          onChange={(e) => {
            e.stopPropagation();
            setDescription(e.target.value);
          }}
          type="text"
        />
      </div>
    </div>
  );
};

export default Modal;
