import './Modal.css';
import { jsPDF } from "jspdf";

export const Modal = ({ patient_info, handleClose, show,}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const handleDownload = ()=>{
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  }

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
        <button onClick={handleDownload}>Download</button>
        
        </div>
      </section>
    </div>
  );
};