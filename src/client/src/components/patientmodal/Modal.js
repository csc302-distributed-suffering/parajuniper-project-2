import './Modal.css';

export const Modal = ({ patient_info, handleClose, show,}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log(patient_info);
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal_content">
        <div className="patient-field title"> {patient_info.name} </div>
        <div className="patient-field">id: {patient_info.id} </div>
        <div className="patient-field">gender: {patient_info.gender} </div>
        <div className="patient-field">birthdate: {patient_info.birthdate} </div>
        <button className="button" type="button" onClick={handleClose}>
          Close
        </button>
        </div>
      </section>
    </div>
  );
};