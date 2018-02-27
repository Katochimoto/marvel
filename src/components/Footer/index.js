import style from './index.css';


export default function Footer () {
  return (
    <footer className={style.footer}>
      <ul className={style.copyright}>
        <li className={style.copyrightItem}>
          &copy; Marvel
        </li>
      </ul>
    </footer>
  );
}
