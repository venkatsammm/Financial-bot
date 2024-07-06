import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import { useTheme } from "../../context/ThemeContext"; // Import useTheme

const Main = () => {
	const {
		onSent,
		recentPrompt,
		showResults,
		loading,
		resultData,
		setInput,
		input,
	} = useContext(Context);

	const { isDark } = useTheme(); // Get the isDark value from the theme context

	const handleCardClick = (promptText) => {
		setInput(promptText);
	};

	// Inline style for the title
	const titleStyle = {
		color: isDark ? 'lightblue' : 'inherit', // Change color to light blue in dark mode
	};

	return (
		<div className="main">
			<div className="nav">
				<p style={titleStyle}>Financial Bot</p> {/* Apply the inline style here */}
				<img src={assets.user} alt="" />
			</div>
			<div className="main-container">
				{!showResults ? (
					<>
						<div className="greet">
							<p>
								<span>Hello </span>
							</p>
							<p>How Can I Help You Today?</p>
						</div>
					</>
				) : (
					<div className="result">
						<div className="result-title">
							<img src={assets.user} alt="" />
							<p>{recentPrompt}</p>
						</div>
						<div className="result-data">
							<img src={assets.gemini_icon} alt="" />
							{loading ? (
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
							)}
						</div>
					</div>
				)}

				<div className="main-bottom">
					<div className="search-box">
						<input
							onChange={(e) => {
								setInput(e.target.value);
							}}
							value={input}
							type="text"
							placeholder="Enter the Prompt Here"
						/>
						<div>
							<img
								src={assets.send_icon}
								alt=""
								onClick={() => {
									onSent();
								}}
							/>
						</div>
					</div>
					<div className="bottom-info">
						<p>
							Financial Bot may display inaccurate info, including about people, so
							double-check its responses. Your privacy!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
