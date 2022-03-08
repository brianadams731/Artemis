import styles from '../styles/Workspace.module.scss';
import { Board } from '../components/Board';

const Workspace = ():JSX.Element =>{
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>
                    Vertical Prototype
                </h1>
            </header>
            <main className={styles.workspace}>
                <Board id={1} />
                <Board id={2} />
            </main>
        </div>
    )
}

export { Workspace };