import ReactDOM from 'react-dom';

/**
 * MAX流
 * ModalをBackdropとOverlayに分けて、OverlayをクリックしてもeventがbubblingしてModalが閉じないようにしている。
 */
const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={(event) => event.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
