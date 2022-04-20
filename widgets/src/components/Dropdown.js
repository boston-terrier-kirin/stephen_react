import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ selected, onSelectionChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  /**
   * event bubbling問題
   * bodyにイベントを仕込むと、event発生優先順位は、addEventListenerが高いので
   * ・doby clicked -> false
   * ・option clicked
   * ・dropdown -> true
   * になってしまい、drowpdownが閉じなくなる。
   */
  useEffect(() => {
    const onBodyClick = (event) => {
      /**
       * refはdropdown自身なので、eventの発生元がrefの場合は、setOpen(false) にしないようにする。
       * 　↓
       * dropdownのsetOpenが呼ばれて、open -> close に変わって、無事にdropdownが閉じるようになる。
       */
      if (ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      /**
       * TODO:
       * toggleを閉じたら呼ばれるのはなぜ？
       * ⇒閉じてレンダリングされなくなったタイミングでも呼ばれるみたい。
       */
      console.log('useEffect.cleanup');

      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

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
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
        <div
          onClick={() => {
            console.log('dropdown ->', !open);
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
