import { useState } from 'react';

const Dropdown = ({ selected, onSelectionChange, options }) => {
  const [open, setOpen] = useState(false);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    /**
     * event bubbling問題
     * ここでoptionをクリックして、dropdownが閉じるのはなぜ？
     * ⇒event bubbleが発生して、親のonClickが呼ばれているため。
     * ⇒Appに仕込んだonClickも呼ばれる。
     */
    return (
      <div
        key={option.value}
        onClick={() => {
          console.log('option clicked');
          onSelectionChange(option);
        }}
        className="item"
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
        <div
          onClick={() => {
            console.log('open/close');
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
