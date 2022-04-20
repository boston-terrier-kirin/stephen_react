const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    event.preventDefault();

    // CTRL + クリックでタブを開く挙動に対応⇒できない。。
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    // history api にpushすることでURLを変える。
    // ReactRouterの原型あり。
    window.history.pushState({}, '', href);

    // eventをemitできる。
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
