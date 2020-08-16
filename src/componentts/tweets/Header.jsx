import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSort, faCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.header__parent__container}>
            <div className={styles.header__left}>
                <h1 className={styles.primary__heading}>Conversations</h1>
                <p className={styles.search__icon}><FontAwesomeIcon icon={faSearch} /></p>
                <input type="text" placeholder="Quick search" />
                <a className={styles.filter__button } href="/"><FontAwesomeIcon icon={faSort} /> Filter</a>
            </div>
            <div className={styles.header__right}>
                <div className={styles.status__button}>
                    <FontAwesomeIcon className={styles.status__icon} icon={faCircle} /> 
                    <a className={styles.online__button} href="/">Online</a>
                    <FontAwesomeIcon className={styles.down__icon} icon={faCaretDown} />
                </div>
            </div>
        </div>
    )
};

export default Header;