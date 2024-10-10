import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Background, Button } from "../ui"
import styles from "./Home.module.css"

interface HomeProps {};

const Home: FC<HomeProps> = () => {
	const navigate = useNavigate();

	const startButtonHandler: React.MouseEvent<HTMLElement> = () => {
		navigate(`playground`);
	}
	
	return (
	<>
		<Header />
		<Background />

		<div className={`container ${styles.home_content_container}`}> 
			<h1 className={styles.title}>Markdown WebNotes</h1>
			<h2 className={styles.subtitle}>Place for you and your notes.</h2>
			<Button className={styles.start_btn} text="start now!" callback={startButtonHandler} />
		</div>
	</>
	);
};

export default Home;
