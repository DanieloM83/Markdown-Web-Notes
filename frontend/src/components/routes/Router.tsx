import { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../screens/Home.tsx"

const Router: FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	</BrowserRouter>
)

export default Router;
